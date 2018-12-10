import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Header from "../components/Header";

import { button, text, background } from "../constants/Styles";

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    title: "Se connecter ou s'inscrire",
    headerBackTitle: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          {/* <Text style={text.brand}>bicycly</Text>
          <Text numberOfLines={2} style={text.h3}>
            Louez votre vélo entre particuliers
          </Text> */}
          <Header />
        </View>
        <View style={styles.clickButton}>
          <TouchableOpacity
            style={[button.primary, styles.connect]}
            onPress={() => {
              this.props.navigation.navigate("LogIn");
            }}
          >
            <Text style={text.textButton}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={button.secondary}
            onPress={() => {
              this.props.navigation.navigate("SignIn");
            }}
          >
            <Text style={text.textButton}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#f9f9f9"
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  clickButton: {
    flex: 1,
    justifyContent: "center"
  },
  connect: {
    marginBottom: 40

  }
});

export default AuthLoadingScreen;
