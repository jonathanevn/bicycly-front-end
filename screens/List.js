import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class List extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the List screen</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("BikeDetails");
          }}
        >
          <Text>Voir un vélo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        >
          <Text>Retour au format carte</Text>
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

export default List;
