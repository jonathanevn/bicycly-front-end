import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class LogIn extends React.Component {
  static navigationOptions = {
    title: "Se connecter"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the LogIn screen</Text>
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
    justifyContent: "center"
  }
});

export default LogIn;
