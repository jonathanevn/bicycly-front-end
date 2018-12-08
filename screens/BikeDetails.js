import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class BikeDetails extends React.Component {
  static navigationOptions = {
    title: "Nom du vélo",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 18,
      color: "#262626"
    },
    headerStyle: {
      backgroundColor: "#f8f8f8",
      borderBottomColor: "#f8f8f8"
    },
    headerTintColor: "#262626"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the BikeDetails screen</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("UserProfile");
          }}
        >
          <Text>Voir le profil du locataire</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Tchat");
          }}
        >
          <Text>Demande de location</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8"
  }
});

export default BikeDetails;
