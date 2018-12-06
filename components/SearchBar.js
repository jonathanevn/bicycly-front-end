import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Modal,
  DatePickerIOS,
  TouchableOpacity
} from "react-native";
import { text } from "../constants/Styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import window from "../constants/Layout";

class SearchBar extends React.Component {
  state = {
    modalAddressVisible: false,
    modalDateVisible: false
  };

  setModalAddressVisible(visible) {
    this.setState({ modalAddressVisible: visible });
  }

  setModalDateVisible(visible) {
    this.setState({ modalDateVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalAddressVisible}

          /*           onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }} */
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

            <TextInput
              style={styles.placeholder}
              placeholder="Ou?"
              placeholderTextColor={Colors.lightGrey}
            />
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

            <Text>Choisir une date</Text>
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
                <Text style={text.h3}>Position actuelle</Text>
                <Text style={text.pricePerDay}>Paris</Text>
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
    paddingLeft: 10
  },

  searchDateSection: {
    borderLeftWidth: 0.3,
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
    marginLeft: 20
  },

  placeholder: {
    fontFamily: "Karla-Bold",
    fontSize: 28,
    marginTop: 15
  },

  containerDateModal: {
    backgroundColor: "white",
    padding: 22,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 300,
    flex: 1
  }
});

export default SearchBar;
