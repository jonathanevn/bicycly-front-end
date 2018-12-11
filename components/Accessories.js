import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Constants } from "expo";
import { width, height } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";

export default class Accessories extends Component {
  state = {
    checked: false,
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
    item9: false,
    item10: false,
    item11: false,
    item12: false
  };

  render() {
    return (
      <View style={styles.containerAccessories}>
        <View style={styles.containerAccessoriesRow}>
          <View style={styles.container1}>
            <TouchableOpacity
              checked={this.state.checked}
              onPress={() => this.setState({ item1: !this.state.item1 })}
            >
              <Text style={styles.textButton}>Antivol</Text>
              {this.state.item1 === true ? <Ionicons name="check" /> : <Text />}
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              checked={this.state.checked}
              onPress={() => this.setState({ item2: !this.state.item2 })}
            >
              <Text style={styles.textButton}>Lumières</Text>
              {this.state.item2 === true ? <Ionicons name="check" /> : <Text />}
            </TouchableOpacity>
          </View>
          <View style={styles.container1}>
            <TouchableOpacity
              checked={this.state.checked}
              onPress={() => this.setState({ item3: !this.state.item3 })}
            >
              <Text style={styles.textButton}>Casque</Text>
              {this.state.item3 === true ? <Ionicons name="check" /> : <Text />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerAccessoriesRow}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => this.setState({ item4: !this.state.item4 })}
            >
              <Text style={styles.textButton}>Sonnette</Text>
              {this.state.item4 === true ? <Ionicons name="check" /> : <Text />}
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => this.setState({ item5: !this.state.item5 })}
            >
              <Text style={styles.textButton}>Porte Bagage</Text>
              {this.state.item5 === true ? <Ionicons name="check" /> : <Text />}
            </TouchableOpacity>
          </View>
          <View style={styles.container1}>
            <TouchableOpacity
              onPress={() => this.setState({ item6: !this.state.item6 })}
            >
              <Text style={styles.textButton}>Sangle</Text>
              {this.state.item6 === true ? <Ionicons name="check" /> : <Text />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerAccessoriesRow}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => this.setState({ item7: !this.state.item7 })}
            >
              <Text style={styles.textButton}>Sacoches</Text>
              {this.state.item7 === true ? <Ionicons name="check" /> : <Text />}
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => this.setState({ item8: !this.state.item8 })}
            >
              <Text style={styles.textButton}>Siège enfant</Text>
              {this.state.item8 === true ? <Ionicons name="check" /> : <Text />}
            </TouchableOpacity>
          </View>
          <View style={styles.container1}>
            <TouchableOpacity
              onPress={() => this.setState({ item9: !this.state.item9 })}
            >
              <Text style={styles.textButton}>Pompe </Text>
              {this.state.item9 === true ? <Ionicons name="check" /> : <Text />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerAccessoriesRow}>
          <View style={styles.container1}>
            <TouchableOpacity
              onPress={() => this.setState({ item10: !this.state.item10 })}
            >
              <Text style={styles.textButton}>Housse </Text>
              {this.state.item10 === true ? (
                <Ionicons name="check" />
              ) : (
                <Text />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => this.setState({ item11: !this.state.item11 })}
            >
              <Text style={styles.textButton}>Rustines</Text>
              {this.state.item11 === true ? (
                <Ionicons name="check" />
              ) : (
                <Text />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => this.setState({ item12: !this.state.item12 })}
            >
              <Text style={styles.textButton}>Gilet jaune</Text>
              {this.state.item12 === true ? (
                <Ionicons style={styles.iconButton} name="check" />
              ) : (
                <Text />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 40,
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 10,
    borderRadius: 12,
    backgroundColor: "#ffc200"
  },
  container1: {
    marginLeft: 10,
    width: 80,
    height: 40,
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#ffc200"
  },
  containerAccessories: {
    marginVertical: 10,
    flexDirection: "column"
  },
  containerAccessoriesRow: {
    flexDirection: "row"
  },
  textButton: {
    paddingTop: 10,
    paddingVertical: 10,
    fontFamily: "Karla-Regular",
    fontSize: 16,
    color: "#262626"
  },
  iconButton: {
    paddingRight: 10
  }
});
