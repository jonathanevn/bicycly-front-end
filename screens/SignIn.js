import React from "react";
import { StyleSheet, Text, View } from "react-native";

class SignIn extends React.Component {
  static navigationOptions = {
    title: "S'incrire"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the SignIn screen</Text>
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

export default SignIn;
