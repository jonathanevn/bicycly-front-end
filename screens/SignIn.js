import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class SignIn extends React.Component {
  static navigationOptions = {
    title: "S'incrire"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the SignIn screen</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        >
          <Text>Valider</Text>
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

export default SignIn;
