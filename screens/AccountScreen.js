import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { button, text } from "../constants/Styles";
import { width, height } from "../constants/Layout";

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: "Mon compte",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 18,
      color: "#262626"
    }
    // headerStyle: {
    //   backgroundColor: "#f8f8f8",
    //   borderBottomColor: "#f8f8f8"
    // }
  };

  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Account screen with the map</Text>

        <TouchableOpacity
          style={[styles.textInput, { marginVertical: 20 }]}
          onPress={() => {
            this.props.navigation.navigate("MyAccountInfo");
          }}
        >
          <Text style={[text.placeholder]}>Mes infos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.textInput, { borderBottomWidth: 0 }]}>
          <Text style={[text.placeholder]}>Mes paiements</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.textInput, { marginBottom: 20 }]}
          onPress={() => {
            this.props.navigation.navigate("PaymentMethods");
          }}
        >
          <Text style={[text.placeholder]}>Moyens de paiement enregistrés</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.textInput, { borderBottomWidth: 0 }]}>
          <Text style={[text.placeholder]}>Aide</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.textInput, { borderBottomWidth: 0 }]}>
          <Text style={[text.placeholder]}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.textInput, { marginBottom: 30 }]}>
          <Text style={[text.placeholder]}>A propos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem("token").then(() => {
              this.props.navigation.navigate("AuthLoadingScreen");
            });
          }}
        >
          <Text style={[text.p2, styles.deconnexion]}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#f8f8f8"
  },
  textInput: {
    borderWidth: 1,
    width: width,
    height: 50,
    paddingLeft: 15,
    justifyContent: "center",
    borderColor: "#f1f1f1",
    backgroundColor: "#FFFFFF"
  },
  deconnexion: {
    color: "red",
    alignItems: "center",
    justifyContent: "center"
  }
});
