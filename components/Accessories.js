import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { width, height } from "../constants/Layout";
const accessories = [
  "Antivol",
  "Lumières",
  "Casque",
  "Sonnette",
  "Porte Bagage",
  "Sangle",
  "Sacoches",
  "Siège enfant",
  "Pompe",
  "Housse",
  "Rustines",
  "Gilet jaune"
];

export default class Accessories extends Component {
  state = {
    accessoriesChecked: accessories.map(element => ({
      name: element,
      checked: false
    }))
    // [{name: 'Antivol', checked: false}, etc.]
  };

  render() {
    return (
      <View style={styles.containerAccessories}>
        {this.state.accessoriesChecked.map(({ name, checked }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                const newAccessoriesChecked = [
                  ...this.state.accessoriesChecked
                ];
                newAccessoriesChecked[index] = { name, checked: !checked };

                this.setState(state => ({
                  accessoriesChecked: newAccessoriesChecked
                }));
              }}
              style={[
                styles.container,
                checked && { backgroundColor: "#ffc200" }
              ]}
            >
              <Text style={styles.textButton}>{name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 5,
    marginRight: 10,
    borderRadius: 12,
    // borderColor: "#ffc200",
    // borderWidth: 1,
    backgroundColor: "white",
    paddingHorizontal: 5,
    width: 110
  },

  containerAccessories: {
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
    flexWrap: "wrap",
    width: width
  },

  textButton: {
    paddingTop: 10,
    paddingVertical: 5,
    fontFamily: "Karla-Regular",
    fontSize: 16,
    color: "#262626"
  },
  iconButton: {
    paddingRight: 10
  }
});
