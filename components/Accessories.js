import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

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
            <View>
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
                  checked && { backgroundColor: "white" }
                ]}
              >
                <Text style={styles.textButton}>{name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 10,
    borderRadius: 12,
    backgroundColor: "#ffc200",
    paddingHorizontal: 5,
    width: 110
  },

  containerAccessories: {
    marginVertical: 10,
    flexDirection: "column"
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
