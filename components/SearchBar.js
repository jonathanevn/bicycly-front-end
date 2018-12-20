import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Modal,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { text, button } from "../constants/Styles";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons, createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import Colors from "../constants/Colors";
import { width, height } from "../constants/Layout";
import Calendar from "./Calendar";

import moment from "moment/min/moment-with-locales";

const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

/* const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
}; */

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
          console.log("long", details.geometry.location.lng);
          console.log("latitude", details.geometry.location.lat);
          this.setState(
            {
              addressSelected: details.name,
              citySelected: details.vicinity
            },
            () => {
              this.props.onLocationChange({
                region: {
                  longitude: details.geometry.location.lng,
                  latitude: details.geometry.location.lat,
                  latitudeDelta: this.state.latDeltaSelected,
                  longitudeDelta: this.state.longDeltaSelected
                },
                myLoc: {
                  longitude: details.geometry.location.lng,
                  latitude: details.geometry.location.lat,
                  latitudeDelta: this.state.latDeltaSelected,
                  longitudeDelta: this.state.longDeltaSelected
                }
              });
            }
          );

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
            width: width - 30,
            backgroundColor: "white",
            borderTopWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: Colors.midGrey,
            height: 60
          },
          textInput: {
            fontFamily: "Karla-Bold",
            color: "#262626",
            fontSize: 20,
            height: 40
          },
          description: {
            fontFamily: "Karla-Bold",
            color: "#262626",
            fontSize: 11
          },
          predefinedPlacesDescription: {
            color: Colors.darkGrey,
            fontFamily: "Karla-Bold",
            fontSize: 15
          }
        }}
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        /*  currentLocationLabel="Current location" */
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
        /* predefinedPlaces={[homePlace, workPlace]} */
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  };

  render() {
    const startDate = this.props.startDate ? this.props.startDate : "";
    const endDate = this.props.endDate ? this.props.endDate : "";

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalAddressVisible}
          onRequestClose={() => {
            this.setModalAddressVisible(false);
          }}
        >
          <SafeAreaView style={styles.containerAddressModal}>
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
          </SafeAreaView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalDateVisible}
          onRequestClose={() => {
            this.setModalDateVisible(false);
          }}
        >
          <TouchableOpacity
            style={styles.containerDateModal}
            onPress={() => {
              this.setModalDateVisible(false);
            }}
          >
            <View style={styles.halfDateModal}>
              <Calendar
                onChangeDate={this.props.onChangeDate}
                startDate={this.props.startDate}
                endDate={this.props.endDate}
              />
              <View style={styles.confirmed}>
                <TouchableOpacity style={button.primary}>
                  <Text
                    style={text.textButton}
                    onPress={() => {
                      this.setModalDateVisible(!this.state.modalDateVisible);
                    }}
                  >
                    Confirmer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <View style={styles.searchBar}>
          <View style={styles.searchAddressSection}>
            <Icon size={18} color={Colors.darkGrey} name={"location"} />
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
                {!this.props.startDate && !this.props.endDate ? (
                  <Text style={text.h3}>Quand ?</Text>
                ) : (
                  <View>
                    <Text style={text.h3}>
                      {moment(startDate)
                        .locale("fr")
                        .format("ll")}
                    </Text>
                    <Text style={text.h3}>
                      {!this.props.endDate
                        ? ""
                        : moment(endDate)
                            .locale("fr")
                            .format("ll")}
                    </Text>
                  </View>
                )}
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
    width: width - 30,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 12,
    shadowColor: "rgba(93, 93, 93, 0.25)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 2
  },

  searchAddressSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
    paddingHorizontal: 15
  },

  searchAddress: {
    paddingLeft: 10
  },

  searchDateSection: {
    /*    borderLeftWidth: 0.5,
    borderLeftColor: "#c2c2c2", */
    paddingHorizontal: 15,
    height: 30,
    justifyContent: "center",
    flex: 2
  },

  searchDate: {
    flexDirection: "row",
    borderLeftWidth: 0.5,
    borderLeftColor: "#c2c2c2",
    alignItems: "center",
    marginRight: 5,
    height: 30,
    paddingLeft: 15
  },

  iconCalendar: {
    paddingRight: 14
  },

  containerAddressModal: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
    marginHorizontal: 20
  },

  placeholder: {
    fontFamily: "Karla-Bold",
    fontSize: 28,
    marginTop: 15
  },

  containerDateModal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    width: width,
    backgroundColor: "rgba(88, 88, 88, 0.7)"
  },

  halfDateModal: {
    height: height / 2,
    backgroundColor: "white",
    width: width,
    alignItems: "flex-end"
  },

  confirmed: {
    alignItems: "center",
    paddingBottom: 30,
    backgroundColor: "white",
    width: width
  }
});

export default SearchBar;
