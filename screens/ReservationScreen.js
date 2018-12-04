import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { ExpoLinksView } from "@expo/samples";

export default class ReservationScreen extends React.Component {
  static navigationOptions = {
    title: "Mes reservations"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.welcomeContainer}>
              <Text>This is the Reservation screen with the map</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("StartRent");
                }}
              >
                <Text>Demarrer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("EndRent");
                }}
              >
                <Text>Terminer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("BikeDetails");
                }}
              >
                <Text>Détails</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});
