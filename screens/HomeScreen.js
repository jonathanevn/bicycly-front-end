import React from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image
} from "react-native";
import { MapView, Permissions } from "expo";
/* import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps"; */
import { height, width } from "../constants/Layout";
import { text, button } from "../constants/Styles";
import { ListButton, FilterButton } from "../components/SquareButton";
import BikeCard from "../components/BikeCard";

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CARD_HEIGHT = 180;
const CARD_WIDTH = width - 20;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    error: null,
    bikes: []
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION);
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }
          },
          () => {
            axios
              .get("http://192.168.86.249:3100/api/bike/around", {
                params: {
                  longitude: this.state.region.longitude,
                  latitude: this.state.region.latitude
                }
              })
              .then(response => {
                if (response.data) {
                  this.setState({ bikes: response.data });
                }
              })
              .catch(error => {
                console.log(error.response);
              });
          }
        );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.bikes.length) {
        index = this.state.bikes.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { loc } = this.state.bikes[index];
          this.map.animateToRegion(
            {
              ...loc,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }

  onLocationChange = region => {
    this.setState(region, () =>
      axios
        .get("http://192.168.86.249:3100/api/bike/around", {
          params: {
            longitude: this.state.region.longitude,
            latitude: this.state.region.latitude
          }
        })
        .then(response => {
          if (response.data) {
            this.setState({
              isLoading: false,
              bikes: response.data
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
    );
  };

  render() {
    const interpolations = this.state.bikes.map((bikes, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp"
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: "clamp"
      });
      return { scale, opacity };
    });

    /* console.log("this.state.bikes", this.state.bikes); */
    if (this.state.latitude === null) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.region}
            provider={MapView.PROVIDER_GOOGLE}
            zoomEnabled={true}
            customMapStyle={generatedMapStyle}
            ref={map => (this.map = map)}
            onRegionChange={region => this.setState({ region })}
          >
            {this.state.bikes.map((bikes, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale
                  }
                ]
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity
              };

              return (
                <MapView.Marker
                  key={index}
                  coordinate={{
                    latitude: bikes.loc.lat,
                    longitude: bikes.loc.lon
                  }}
                >
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    <View style={styles.marker} />
                  </Animated.View>
                </MapView.Marker>
              );
            })}
          </MapView>

          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation
                    }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
            style={styles.scrollView}
            contentContainerStyle={styles.startEndPadding}
          >
            {this.state.bikes.map((bikes, index) => (
              <View style={styles.card} key={index}>
                <BikeCard
                  brand={bikes.bikeBrand}
                  model={bikes.bikeModel}
                  picture={bikes.photos[0]}
                  category={bikes.bikeCategory}
                  pricePerDay={bikes.pricePerDay}
                />
              </View>
            ))}
          </Animated.ScrollView>

          <View style={styles.searchBar}>
            <SearchBar onLocationChange={this.onLocationChange} />
          </View>
          <View style={styles.filterButton}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Filters");
              }}
            >
              <FilterButton name="equalizer" size={20} label="Filtres" />
            </TouchableOpacity>
          </View>
          <View style={styles.listButton}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("List");
              }}
            >
              <ListButton name="list" size={25} label="Liste" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    flex: 1,
    width: width
  },

  scrollView: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    margin: "auto",
    paddingVertical: 3
  },

  startEndPadding: {
    paddingLeft: 10,
    paddingRight: width - CARD_WIDTH
  },

  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },

  ring: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,194,0,0.3)",
    borderWidth: 1,
    borderColor: "rgba(255,194,0,0.5)",
    position: "absolute"
  },

  marker: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10 / 2,
    backgroundColor: "rgb(255,194,0)"
  },

  searchBar: {
    position: "absolute",
    top: 60
  },

  filterButton: {
    position: "absolute",
    top: 200,
    right: 70
  },

  listButton: {
    position: "absolute",
    top: 270,
    right: 70
  }
});

const generatedMapStyle = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#585858"
      },
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified"
      },
      {
        gamma: "3.04"
      },
      {
        lightness: "-27"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2"
      },
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified"
      },
      {
        saturation: "-65"
      },
      {
        lightness: "45"
      },
      {
        gamma: "1.78"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#83efda"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 45
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        saturation: "-33"
      },
      {
        lightness: "22"
      },
      {
        gamma: "2.08"
      }
    ]
  },
  {
    featureType: "transit.station.airport",
    elementType: "geometry",
    stylers: [
      {
        gamma: "2.08"
      },
      {
        hue: "#ffa200"
      }
    ]
  },
  {
    featureType: "transit.station.airport",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.station.bus",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.station.rail",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.station.rail",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.station.rail",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      },
      {
        saturation: "-55"
      },
      {
        lightness: "-2"
      },
      {
        gamma: "1.88"
      },
      {
        hue: "#ffab00"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#ace3f9"
      },
      {
        visibility: "simplified"
      }
    ]
  }
];
