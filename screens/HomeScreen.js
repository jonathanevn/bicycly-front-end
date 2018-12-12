import React from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import Carousel from "react-native-snap-carousel";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  FlatList,
  Image
} from "react-native";
import { MapView, Permissions } from "expo";
import { height, width } from "../constants/Layout";
import { text, button } from "../constants/Styles";
import { ListButton, FilterButton } from "../components/SquareButton";
import BikeCard from "../components/BikeCard";
import Colors from "../constants/Colors";

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CARD_HEIGHT = 180;
const CARD_WIDTH = width - 20;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    region: {
      longitude: LONGITUDE,
      latitude: LATITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    error: null,
    bikes: [],
    selectedDate: {
      startDate: null,
      endDate: null
    },
    markerSelected: null
  };

  componentDidMount() {
    console.log("did mount");
    Permissions.askAsync(Permissions.LOCATION);

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            region: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              longitudeDelta: LONGITUDE_DELTA,
              latitudeDelta: LATITUDE_DELTA
            }
          },
          () => {
            axios
              .get("https://bicycly.herokuapp.com/api/bike/around", {
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
                console.log("ERROR", error);
              });
          }
        );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  onChangeDate = ({ startDate, endDate }) => {
    this.setState({
      selectedDate: {
        startDate:
          startDate !== undefined
            ? startDate
            : this.state.selectedDate.startDate,
        endDate:
          endDate !== undefined ? endDate : this.state.selectedDate.endDate
      }
    });
  };

  onLocationChange = region => {
    console.log("onLocationChange");
    this.setState(region, () =>
      axios
        .get("https://bicycly.herokuapp.com/api/bike/around", {
          params: {
            longitude: this.state.region.longitude,
            latitude: this.state.region.latitude
          }
        })
        .then(response => {
          if (response.data) {
            this.setState({
              bikes: response.data
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
    );
  };

  pickLocationHandler = (event, index) => {
    console.log("event", event, "index", index);
    const coords = event.coordinate;
    console.log("index", index);
    this._carousel.snapToItem(index);

    this.map.animateToRegion(
      {
        ...this.state.region,
        longitude: coords.longitude,
        latitude: coords.latitude
      },
      250
    );
    this.setState(prevState => {
      return {
        region: {
          ...prevState.region,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        markerSelected: index
      };
    });
  };

  centerMapOnMarker(slideIndex) {
    console.log("slideIndex", slideIndex);
    const markerData = this.state.bikes[slideIndex];
    console.log("markerData", markerData);
    /*  const mapRef = this._mapView;

    if (!markerData || !mapRef) {
      return;
    }*/
    this.map.animateToRegion({
      longitude: markerData.loc[0],
      latitude: markerData.loc[1],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    });
    this.setState(prevState => {
      return {
        region: {
          ...prevState.region,
          longitude: markerData.loc[0],
          latitude: markerData.loc[1]
        },
        markerSelected: slideIndex
      };
    });
  }

  render() {
    console.log("render");
    /* console.log("carousel", this._carousel); */
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          provider={MapView.PROVIDER_GOOGLE}
          zoomEnabled={true}
          customMapStyle={generatedMapStyle}
          showsUserLocation={true}
          ref={map => (this.map = map)}
        >
          {this.state.bikes.map((bikes, i) => {
            return (
              <MapView.Marker
                key={i}
                coordinate={{
                  longitude: bikes.loc[0],
                  latitude: bikes.loc[1]
                }}
                onPress={e => this.pickLocationHandler(e.nativeEvent, i)}
              >
                {this.state.markerSelected === i ? (
                  <View style={styles.marker} />
                ) : (
                  <View style={styles.marker2} />
                )}
              </MapView.Marker>
            );
          })}
        </MapView>

        <Carousel
          layout={"stack"}
          layoutCardOffset={18}
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.bikes}
          loop={true}
          containerCustomStyle={styles.scrollView}
          sliderWidth={width}
          lockScrollWhileSnapping
          inactiveSlideScale={0.7}
          itemWidth={width - 40}
          inactiveSlideOpacity={0.3}
          onSnapToItem={slideIndex => this.centerMapOnMarker(slideIndex)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("BikeDetails", {
                  bikeId: item._id,
                  bikeBrand: item.bikeBrand,
                  bikeModel: item.bikeModel
                });
              }}
            >
              <BikeCard
                brand={item.bikeBrand}
                model={item.bikeModel}
                picture={item.photos[0]}
                category={item.bikeCategory}
                pricePerDay={item.pricePerDay}
              />
            </TouchableOpacity>
          )}
        />

        {/* <FlatList
          data={this.state.bikes}
          horizontal={true}
          scrollEventThrottle={1}
          getItemLayout={this.getItemLayout}
          showsHorizontalScrollIndicator={false}
          ref={ref => {
            this.flatListRef = ref;
          }}
          snapToInterval={CARD_WIDTH}
          keyExtractor={(item, index) => item._id}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: this.animation
                }
              }
            }
          ])}
          style={styles.scrollView}
          contentContainerStyle={styles.startEndPadding}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("BikeDetails", {
                  bikeId: item._id,
                  bikeBrand: item.bikeBrand,
                  bikeModel: item.bikeModel
                });
              }}
            >
              <BikeCard
                brand={item.bikeBrand}
                model={item.bikeModel}
                picture={item.photos[0]}
                category={item.bikeCategory}
                pricePerDay={item.pricePerDay}
              />
            </TouchableOpacity>
          )}
        /> */}

        <View style={styles.searchBar}>
          <SearchBar
            onLocationChange={this.onLocationChange}
            onChangeDate={this.onChangeDate}
            startDate={this.state.selectedDate.startDate}
            endDate={this.state.selectedDate.endDate}
          />
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
              this.props.navigation.navigate("List", {
                region: this.state.region,
                bikes: this.state.bikes
              });
            }}
          >
            <ListButton name="list" size={25} label="Liste" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
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
    /*     margin: "auto", */
    paddingVertical: 3
  },

  startEndPadding: {
    paddingLeft: 10,
    paddingRight: width - CARD_WIDTH
  },

  /*  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50
  },

  ring: {
    height: 14,
    width: 14,
    borderRadius: 14 / 2,
    backgroundColor: "rgba(255,194,0,0.3)",
    borderWidth: 1,
    borderColor: "rgba(255,194,0,0.5)",
    position: "relative"
  }, */

  marker: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10 / 2,
    position: "absolute",
    backgroundColor: "rgb(255,194,0)"
  },

  marker2: {
    height: 8,
    width: 8,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8 / 2,
    position: "absolute",
    backgroundColor: Colors.midGrey
  },

  searchBar: {
    position: "absolute",
    top: 60
  },

  filterButton: {
    position: "absolute",
    top: height / 4.5,
    right: 70
  },

  listButton: {
    position: "absolute",
    top: height / 3.2,
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
