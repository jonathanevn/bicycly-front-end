import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Modal,
  TouchableOpacity
} from "react-native";

import { text } from "../constants/Styles";
import apiKey from "../apiKey";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import window from "../constants/Layout";
import Calendar from "./Calendar";

import { width, height } from "../constants/Layout";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class SearchBar extends React.Component {
  state = {
    modalAddressVisible: false,
    modalDateVisible: false,
    latitudeSelected: null,
    longitudeSelected: null,
    latDeltaSelected: LATITUDE_DELTA,
    longDeltaSelected: LONGITUDE_DELTA,
    addressSelected: null,
    citySelected: null
  };

  setModalAddressVisible(visible) {
    this.setState({ modalAddressVisible: visible });
  }

  setModalDateVisible(visible) {
    this.setState({ modalDateVisible: visible });
  }

  GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder="Où ?"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          this.setState(
            /* console.log("latDeltaSelected", LATITUDE_DELTA), */
            {
              addressSelected: details.name,
              citySelected: details.vicinity
            },
            () => {
              this.props.onLocationChange({
                region: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: this.state.latDeltaSelected,
                  longitudeDelta: this.state.longDeltaSelected
                }
              });
            }
          );
          // console.log(
          //   "data",
          //   data,
          //   "details",
          //   details,
          //   "latitudeDelta",
          //   this.state.latDeltaSelected,
          //   "longitudeDelta",
          //   this.state.longDeltaSelected,
          //   "latitude",
          //   this.state.latitudeSelected
          // );
          this.setModalAddressVisible(!this.state.modalAddressVisible);
          // 'details' is provided when fetchDetails = true
        }}
        getDefaultValue={() => ""}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyChBhCJi-Dg_aDGRuBFO3zDKlhx918kPuQ",
          language: "fr", // language of the results
          types: ["(address)", "(regions)", "geocode"] // default: 'geocode'
        }}
        styles={{
          textInputContainer: {
            width: "100%",
            backgroundColor: "white",
            borderTopWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: Colors.midGrey,
            height: 50
          },
          textInput: {
            fontFamily: "Karla-Bold",
            color: "#262626",
            fontSize: 20
          },
          description: {
            fontFamily: "Karla-Bold",
            color: "#262626",
            fontSize: 11
          },
          predefinedPlacesDescription: {
            color: "#262626",
            fontFamily: "Karla-Bold",
            fontSize: 15
          }
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",
          types: "food"
        }}
        filterReverseGeocodingByTypes={[
          "address",
          "locality",
          "administrative_area_level_3"
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[homePlace, workPlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  };

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalAddressVisible}
        >
          <View style={styles.containerAddressModal}>
            <TouchableOpacity
              onPress={() => {
                this.setModalAddressVisible(!this.state.modalAddressVisible);
              }}
            >
              <Ionicons
                size={30}
                color={Colors.darkGrey}
                name={Platform.OS === "ios" ? "ios-close" : "md-close"}
              />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>{this.GooglePlacesInput()}</View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalDateVisible}
          onBackdropPress={() =>
            this.setModalDateVisible(!this.state.modalDateVisible)
          }
        >
          <View style={styles.containerDateModal}>
            <TouchableOpacity
              onPress={() => {
                this.setModalDateVisible(!this.state.modalDateVisible);
              }}
            >
              <Ionicons
                size={30}
                color={Colors.darkGrey}
                name={Platform.OS === "ios" ? "ios-close" : "md-close"}
              />
            </TouchableOpacity>
            {/* <Text>Choisir une date</Text> */}
            <Calendar />
          </View>
        </Modal>

        <View style={styles.searchBar}>
          <View style={styles.searchAddressSection}>
            <MaterialCommunityIcons
              size={20}
              color={Colors.darkGrey}
              name={"map-marker"}
            />
            <TouchableOpacity
              onPress={() => {
                this.setModalAddressVisible(true);
              }}
            >
              <View style={styles.searchAddress}>
                {this.state.addressSelected === null ? (
                  <Text style={text.h3}>Position actuelle</Text>
                ) : (
                  <Text numberOfLines={1} style={text.h3}>
                    {this.state.addressSelected}
                  </Text>
                )}
                {this.state.citySelected === null ? (
                  <Text style={text.pricePerDay}>Paris</Text>
                ) : (
                  <Text style={text.pricePerDay}>
                    {this.state.citySelected}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.setModalDateVisible(true);
            }}
          >
            <View style={styles.searchDateSection}>
              <View style={styles.searchDate}>
                <Ionicons
                  size={16}
                  style={styles.iconCalendar}
                  color={Colors.darkGrey}
                  name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
                />
                <Text style={text.h3}>Quand ?</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    height: 60,
    width: 340,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 50,
    shadowColor: "rgba(93, 93, 93, 0.18)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 1
  },

  searchAddressSection: {
    flexDirection: "row",
    alignItems: "center"
  },

  searchAddress: {
    paddingLeft: 10,
    width: 160
  },

  searchDateSection: {
    borderLeftWidth: 0.5,
    borderLeftColor: "#c2c2c2",
    paddingLeft: 15,
    height: 30,
    justifyContent: "center"
  },

  searchDate: {
    flexDirection: "row",
    alignItems: "center"
  },

  iconCalendar: {
    paddingRight: 10
  },

  containerAddressModal: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 50,
    marginHorizontal: 20
  },

  placeholder: {
    fontFamily: "Karla-Bold",
    fontSize: 28,
    marginTop: 15
  },

  containerDateModal: {
    backgroundColor: "white",
    // padding: 22,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 300,
    flex: 1
  }
});

export default SearchBar;
