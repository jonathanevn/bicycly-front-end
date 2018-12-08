import React from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { MapView, Permissions } from "expo";
/* import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps"; */
import { height, width } from "../constants/Layout";
import { text, button } from "../constants/Styles";
import { ListButton, FilterButton } from "../components/SquareButton";

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
  }

  onRegionChange = region => {
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

  getMarkers(bikes) {
    const bikesMarkers = [];
    bikes.map(item => {
      bikesMarkers.push(
        <MapView.Marker
          coordinate={{ latitude: item.loc.lat, longitude: item.loc.lon }}
          title={"Le Reacteur"}
          description={"La formation des champions !"}
        >
          <View style={styles.radius}>
            <View style={styles.marker} />
          </View>
        </MapView.Marker>
      );
    });
    return bikesMarkers;
  }

  render() {
    console.log("this.state.bikes", this.state.bikes);
    if (this.state.latitude === null) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.region}
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={generatedMapStyle}
            onRegionChange={region => this.setState({ region })}
          >
            {this.getMarkers(this.state.bikes)}
          </MapView>

          <View style={styles.searchBar}>
            <SearchBar onLocationChange={this.onRegionChange} />
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
    width: "100%"
  },
  radius: {
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255,194,0,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,194,0,0.3)",
    alignItems: "center",
    justifyContent: "center"
  },

  marker: {
    height: 6,
    width: 6,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6 / 2,
    overflow: "hidden",
    backgroundColor: "rgb(255,194,0)"
  },

  searchBar: {
    position: "absolute",
    top: 60
  },

  filterButton: {
    position: "absolute",
    top: height / 2.1,
    right: 70
  },

  listButton: {
    position: "absolute",
    top: height / 1.8,
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
