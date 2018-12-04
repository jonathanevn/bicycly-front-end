import React from "react";
import { StyleSheet, Text, View } from "react-native";

class LogInOrSignIn extends React.Component {
  static navigationOptions = {
    title: "Se connecter ou s'inscrire"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the LogInOrSignIn screen</Text>
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

export default LogInOrSignIn;
