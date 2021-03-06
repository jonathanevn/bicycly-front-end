import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";

import axios from "axios";

import { button, text } from "../constants/Styles";
import { width, height } from "../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";

class LogIn extends React.Component {
  static navigationOptions = {
    title: "Se connecter",
    headerBackTitle: null,
    headerTintColor: "black",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      color: "#262626",
      fontSize: 18
    }
  };

  state = {
    email: "",
    password: "",
    _id: ""
  };

  onPress = () => {
    const { email, password } = this.state;
    axios

      .post("https://bicycly.herokuapp.com/api/user/log_in", {
        email: email,
        password: password
      })
      .then(response => {
        console.log(response.data);

        if (response.data.token) {
          AsyncStorage.multiSet([
            ["token", response.data.token],
            ["id", response.data._id]
          ]).then(() => {
            this.props.navigation.navigate("Home", {
              token: response.data.token,
              id: response.data._id
            });
          });
        }
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView>
          <View style={styles.container}>
            <Text style={[text.company, styles.title]}>bicycly</Text>
            <View style={{ marginBottom: 40 }}>
              <TextInput
                style={[
                  styles.textInput,
                  //   text.placeholder,
                  { borderBottomWidth: 0.5 }
                ]}
                placeholder="Adresse email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={value => {
                  this.setState({ email: value });
                }}
              />
              <TextInput
                style={[
                  styles.textInput,
                  //   text.placeholder,
                  { borderTopWidth: 0.5 }
                ]}
                secureTextEntry={true}
                placeholder="Mot de passe"
                // placeholderTextColor="#c2c2c2"
                value={this.state.password}
                onChangeText={value => {
                  this.setState({ password: value });
                }}
              />
            </View>
            <TouchableOpacity style={button.primary} onPress={this.onPress}>
              <Text style={text.textButton}>Connexion</Text>
            </TouchableOpacity>
            <Text style={[text.p2, { marginTop: 30 }]}>
              Mot de passe oublié ?
            </Text>
            <View style={styles.footer}>
              <Text style={text.p2}>Pas encore de compte sur bicycly ?</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("SignIn");
                }}
              >
                <Text
                  style={[
                    text.p2,
                    { marginTop: 10, textDecorationLine: "underline" }
                  ]}
                >
                  Inscription
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#f8f8f8",
    height: height,
    width: width
  },
  title: {
    marginTop: 60,
    marginBottom: 220
  },
  input: {
    marginTop: 20,
    marginBottom: 20
  },
  textInput: {
    borderWidth: 1,
    width: 350,
    height: 50,
    paddingLeft: 15,
    borderColor: "#f1f1f1",
    backgroundColor: "#FFFFFF"
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  }
});

export default LogIn;
