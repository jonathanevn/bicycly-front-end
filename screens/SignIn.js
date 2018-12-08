import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import { button, text } from "../constants/Styles";
import { width, height } from "../constants/Layout";
import { TextInput, ScrollView } from "react-native-gesture-handler";

class SignIn extends React.Component {
  static navigationOptions = {
    title: "S'incrire",
    headerTintColor: "black"
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
              />
              <TextInput style={styles.textInput} placeholder="Nom" />
            </View>
            <View style={{ marginBottom: 40 }}>
              <TextInput
                style={[styles.textInput, { borderBottomWidth: 0 }]}
                placeholder="Adresse email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Mot de passe"
              />
            </View>

            <Text numberOfLines={3} style={[text.cgvText, styles.cgv]}>
              En vous inscrivant, vous acceptez nos conditions générales
              d’utilisation et notre politique de confidentialité.
            </Text>
            <TouchableOpacity
              style={button.primary}
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
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
    marginTop: 30
  }
});

export default SignIn;
