import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { text } from "../constants/Styles";
import { withNavigation } from "react-navigation";

class BikeViewHistory extends React.Component {
  renderingButton = () => {
    if (this.props.contact) {
      return (
        <View style={styles.confirmButton}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Tchat", {
                bikeId: this.props.bikeId,
                threadId: this.props.threadId,
                userId: this.props.userId,
                userRent: this.props.ownerOrUserName,
                propId: this.props.propId
              });
            }}
          >
            <Text style={text.p}>Contacter</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftPart}>
          <Image
            style={styles.bikePictureHistory}
            source={{ uri: this.props.picture }}
          />
        </View>
        <View style={styles.rightPart}>
          <View style={styles.container}>
            <Text style={[styles.label, text.h2]}>{this.props.brand}</Text>
            <Text style={[styles.label, text.h2]}>{" " + this.props.mod}</Text>
          </View>

          <Text style={text.p}>{this.props.price}€ / jour</Text>
          <View style={styles.container}>
            <Text style={text.p}>{this.props.ownerOrUser}</Text>
            <Text style={styles.name}>{this.props.ownerOrUserName}</Text>
          </View>
          {this.renderingButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10
  },
  leftPart: {
    marginRight: 20,
    flex: 3
  },
  rightPart: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flex: 5
  },
  bikePictureHistory: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 10
  },
  confirmButton: {
    flexDirection: "row",
    marginTop: 30,
    alignSelf: "center",
    height: 30,
    width: 120,
    backgroundColor: "#ffc200",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  color: {
    color: "black",
    fontSize: 14
  },
  label: {
    fontSize: 16,
    fontWeight: "bold"
  },
  name: {
    color: "#ffc200",
    fontFamily: "Karla-Regular",
    fontSize: 14,
    lineHeight: 18
  }
});
export default withNavigation(BikeViewHistory);
