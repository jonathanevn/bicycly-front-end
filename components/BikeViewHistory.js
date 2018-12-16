import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

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
  }
});

export default BikeViewHistory;
