import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from "react-native";
import axios from "axios";
import BikeViewHistory from "../components/BikeViewHistory";

//import { ListButton } from "../components/SquareButton";
import SearchBar from "../components/SearchBar";
import { text, button, avatar } from "../constants/Styles";
import { width, height } from "../constants/Layout";

export default class MyBikesScreen extends React.Component {
  static navigationOptions = {
    title: "Mes vélos",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 18,
      color: "#262626"
    },
    headerStyle: {
      backgroundColor: "#f8f8f8",
      borderBottomColor: "#f8f8f8"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text>This is the My Bikes screen with the map</Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AddBike");
              }}
            >
              <Text>Ajouter un vélo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("EndRent");
              }}
            >
              <Text>Terminer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#f8f8f8"
  },

  flatCard: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10
  }
});
