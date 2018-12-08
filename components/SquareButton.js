import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createIconSetFromIcoMoon, SimpleLineIcons } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import Colors from "../constants/Colors";

const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

class ListButton extends React.Component {
  render() {
    return (
      <View style={styles.button}>
        <Icon
          name={this.props.name}
          color={Colors.darkGrey}
          size={this.props.size}
        />
        <Text style={styles.textButton}>{this.props.label}</Text>
      </View>
    );
  }
}

class FilterButton extends React.Component {
  render() {
    return (
      <View style={styles.button}>
        <SimpleLineIcons
          name={this.props.name}
          color={Colors.darkGrey}
          size={this.props.size}
          style={styles.filterIcon}
        />
        <Text style={styles.textButton}>{this.props.label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 200,
    height: 52,
    width: 52,
    backgroundColor: "#ffc200",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(93, 93, 93, 0.2)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 8
  },
  textButton: {
    fontFamily: "Karla-Bold",
    fontSize: 11,
    color: "#262626",
    marginTop: 1
  },
  filterIcon: {
    transform: [{ rotate: "90deg" }]
  }
});

module.exports = {
  FilterButton: FilterButton,
  ListButton: ListButton
};
