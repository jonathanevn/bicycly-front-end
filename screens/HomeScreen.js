import React from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import Carousel from "react-native-snap-carousel";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableNativeFeedback
} from "react-native";
import { MapView, Permissions } from "expo";
import { height, width } from "../constants/Layout";

import { ListButton, FilterButton } from "../components/SquareButton";
import BikeCard from "../components/BikeCard";
import Colors from "../constants/Colors";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import Filters from "../components/Filters";

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CARD_HEIGHT = 180;
const CARD_WIDTH = width - 20;

const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

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
    markerSelected: null,
    categoriesSelected: "",
    modalFilterVisible: false
  };

  componentDidMount() {
    // console.log("did mount");
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
                  latitude: this.state.region.latitude,
                  category: this.state.categoriesSelected
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
    this.setState(region, () =>
      axios
        .get("https://bicycly.herokuapp.com/api/bike/around", {
          params: {
            longitude: this.state.region.longitude,
            latitude: this.state.region.latitude,
            category: this.state.categoriesSelected
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

  handleFilters = categories => {
    const categoriesSplitted = categories.join(" ");
    this.setState({ categorieSelected: categoriesSplitted }, () => {
      console.log("categorieeees", this.state.categorieSelected);
    });
    this.onLocationChange();
  };

  pickLocationHandler = (event, index) => {
    const coords = event.coordinate;

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
    // console.log("slideIndex", slideIndex);
    const markerData = this.state.bikes[slideIndex];
    // console.log("markerData", markerData);
    /*  const mapRef = this._mapView;

    if (!markerData || !mapRef) {
      return;
    }*/
    this.map.animateToRegion(
      {
        longitude: markerData.loc[0],
        latitude: markerData.loc[1],
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      200
    );
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
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          // provider={MapView.PROVIDER_GOOGLE}
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
                  <Icon name="bike" size={23} style={styles.selectedIcon} />
                ) : (
                  <Icon name="bike" size={10} color={Colors.midGrey} />
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
          inactiveSlideOpacity={0.5}
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

        <View style={styles.searchBar}>
          <SearchBar
            onLocationChange={this.onLocationChange}
            onChangeDate={this.onChangeDate}
            startDate={this.state.selectedDate.startDate}
            endDate={this.state.selectedDate.endDate}
          />
        </View>
        <View style={styles.filterButton}>
          <Filters categoriesSelected={this.handleFilters} />
        </View>

        <TouchableOpacity
          style={styles.listButton}
          onPress={() => {
            console.log("ça clic!");
            this.props.navigation.navigate("List", {
              region: this.state.region,
              bikes: this.state.bikes
            });
          }}
        >
          <View /* style={styles.listButtonContainer} */>
            <ListButton name="list" size={25} label="Liste" />
          </View>
        </TouchableOpacity>
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
    paddingVertical: 3
  },

  startEndPadding: {
    paddingLeft: 10,
    paddingRight: width - CARD_WIDTH
  },

  markerWrap: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },

  /*   marker: {
    height: 16,
    width: 16,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16 / 2,
    position: "absolute",
    backgroundColor: "rgb(255,194,0)",
    shadowColor: "#585858",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  },

  marker2: {
    height: 10,
    width: 10,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10 / 2,
    position: "absolute",
    backgroundColor: Colors.midGrey
  }, */

  selectedIcon: {
    color: "#ffc200"
  },

  searchBar: {
    position: "absolute",
    top: 60
  },

  filterButton: {
    position: "absolute",
    top: height / 2.5,
    right: 15
  },

  listButton: {
    position: "absolute",
    top: height / 2,
    right: 15,
    height: 52,
    width: 52
  }

  /*  listButtonContainer: {
    height: 52,
    width: 52,
    position: "absolute",
    top: 150,
    right: 70
  } */
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
