import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class Filters extends React.Component {
  static navigationOptions = {
    title: "Filtrer parmis les vélos",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 18,
      color: "#262626"
    },
    headerStyle: {
      backgroundColor: "#f8f8f8",
      borderBottomColor: "#f8f8f8"
    }
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
