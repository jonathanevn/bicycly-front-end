import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class Address extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Address screen</Text>
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

export default Address;
