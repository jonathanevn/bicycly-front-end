import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

class BikeViewHistory extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.bikePictureHistory}
            source={{ uri: this.props.picture }}
          />
        </View>
        <View>
          <Text>{this.props.brand}</Text>
          <Text>{this.props.cat}</Text>
          <Text>{this.props.price}€ / jour</Text>
          <Text>Loué à : {this.props.otherUser}</Text>
          <View style={styles.confirmButton}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Tchat");
              }}
            >
              <Text>Contacter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("StartRent");
              }}
            >
              <Text>Demarrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  bikePictureHistory: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  confirmButton: {
    flexDirection: "row"
  }
});

export default BikeViewHistory;
