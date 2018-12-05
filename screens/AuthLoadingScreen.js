import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    title: "Se connecter ou s'inscrire"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the AuthLoadingScreen screen</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("LogIn");
          }}
        >
          <Text>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("SignIn");
          }}
        >
          <Text>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AuthLoadingScreen;
