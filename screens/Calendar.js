import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class Calendar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Calendar screen</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        >
          <Text>Confirmer</Text>
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

export default Calendar;
