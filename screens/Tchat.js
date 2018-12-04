import React from "react";
import { StyleSheet, Text, View } from "react-native";

class Tchat extends React.Component {
  static navigationOptions = {
    title: "Message au propriétaire"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Tchat screen</Text>
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

export default Tchat;
