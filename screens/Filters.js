import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class Filters extends React.Component {
  static navigationOptions = {
    title: "Filtrer parmis les vélos"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Filters screen</Text>
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

export default Filters;
