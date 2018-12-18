import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { width, height } from "../constants/Layout";
const accessoriesToChoose = [
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
  /* state = {
    accessories: accessoriesToChoose.map(element => ({
      name: element,
      checked: false
    }))
  }; */

  state = {
    accessories: []
  };

  toggleAccessory(item) {
    const accessories = [...this.state.accessories];
    if (accessories.indexOf(item) > -1) {
      accessories.splice(accessories.indexOf(item), 1);
    } else {
      accessories.push(item);
    }
    this.setState({ accessories }, () => {
      this.props.handleAccessories(this.state.accessories);
    });
  }

  render() {
    return (
      <View style={styles.containerAccessories}>
        {accessoriesToChoose.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.container,
                this.state.accessories.indexOf(item) > -1 && {
                  backgroundColor: "#ffc200"
                }
              ]}
              onPress={
                () => this.toggleAccessory(item)
                /* () => {
                const newAccessories = [...this.state.accessories];
                newAccessories[index] = { name, checked: !checked };
                console.log(
                  "newAccessories[index]",
                  newAccessories[index].name
                );
                this.setState(
                  {
                    accessories: newAccessories
                  },
                  () =>
                    this.props.accessoriesSelected(newAccessories[index].name)
                );
              } */
              }
            >
              <Text style={styles.textButton}>{item}</Text>
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
    marginBottom: 8,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: "white",
    paddingHorizontal: 5
  },

  containerAccessories: {
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
    flexWrap: "wrap"
  },

  textButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontFamily: "Karla-Regular",
    fontSize: 14,
    color: "#262626"
  },
  iconButton: {
    paddingRight: 10
  }
});
