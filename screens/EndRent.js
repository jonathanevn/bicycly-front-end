import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class EndRent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the EndRent screen</Text>
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

export default EndRent;
