import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  AsyncStorage
} from "react-native";
import axios from "axios";

import { button, text } from "../constants/Styles";
import { width, height } from "../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";

class SignIn extends React.Component {
  static navigationOptions = {
    title: "S'inscrire",
    headerBackTitle: null,
    headerTintColor: "black",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      color: "#262626",
      fontSize: 18
    }
  };
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  onPress = () => {
    const { firstName, lastName, email, password } = this.state;
    axios
      .post("http://localhost:3100/api/user/sign_up", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
      .then(response => {
        console.log(response.data);
        if (response.data.token) {
          AsyncStorage.setItem("token", response.data.token).then(() => {
            this.props.navigation.navigate("Home", {
              token: response.data.token
            });
          });
        }
        this.props.navigation.navigate("Home");
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView>
          <View style={styles.container}>
            <Text style={[text.company, styles.title]}>bicycly</Text>
            <View style={styles.input}>
              <TextInput
                style={[styles.textInput, { borderBottomWidth: 0 }]}
                placeholder="Prénom"
                value={this.state.firstName}
                onChangeText={value => {
                  this.setState({ firstName: value });
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Nom"
                value={this.state.lastName}
                onChangeText={value => {
                  this.setState({ lastName: value });
                }}
              />
            </View>
            <View style={{ marginBottom: 40 }}>
              <TextInput
                style={[styles.textInput, { borderBottomWidth: 0.5 }]}
                placeholder="Adresse email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={value => {
                  this.setState({ email: value });
                }}
              />
              <TextInput
                style={[styles.textInput, { borderTopWidth: 0.5 }]}
                secureTextEntry={true}
                placeholder="Mot de passe"
                value={this.state.password}
                onChangeText={value => {
                  this.setState({ password: value });
                }}
              />
            </View>

            <Text numberOfLines={3} style={[text.cgvText, styles.cgv]}>
              En vous inscrivant, vous acceptez nos conditions générales
              d’utilisation et notre politique de confidentialité.
            </Text>
            <TouchableOpacity style={button.primary} onPress={this.onPress}>
              <Text style={text.textButton}>Inscription</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={text.p2}>Déjà un compte sur bicycly ?</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("LogIn");
                }}
              >
                <Text style={[text.p2, { marginTop: 10 }]}>Connexion</Text>
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
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    width: width,
    height: height
  },
  title: {
    // marginTop: 30,
    marginBottom: 30
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
  cgv: {
    marginLeft: 50,
    marginRight: 50,
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 20
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 50
  }
});

export default SignIn;
