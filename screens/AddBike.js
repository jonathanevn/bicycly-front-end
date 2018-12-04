import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class AddBike extends React.Component {
  static navigationOptions = {
    title: "Nom du vélo"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the AddBike screen</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("BikeDetails");
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

export default AddBike;
