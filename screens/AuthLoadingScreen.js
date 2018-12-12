import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import Header from "../components/Header";

import { button, text } from "../constants/Styles";
import { width, height } from "../constants/Layout";

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    title: "Se connecter ou s'inscrire",
    headerBackTitle: null
  };

  state = {
    isAuthenticated: false
  };

  render() {
    if (this.state.isAuthenticated === true) {
      return this.props.navigation.navigate("Home");
    }
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

  //   this.state.navigate.params.token
  componentDidMount() {
    AsyncStorage.multiGet(["token", "id"]).then(value => {
      //   console.log("ici", value[1][1]);

      if (value[0][1]) {
        // [[token: null]] pour accéder à 'null' ou au token
        this.setState({
          isAuthenticated: true
        });
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    width: width,
    height: height
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
