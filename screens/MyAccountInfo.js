import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { button, text, avatar } from "../constants/Styles";
import { width, height } from "../constants/Layout";

class MyAccountInfo extends React.Component {
  static navigationOptions = {
    title: "Mes informations",
    headerBackTitle: null,
    headerTintColor: "black",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 18,
      color: "#262626"
    }

    // headerStyle: {
    //   backgroundColor: "#f8f8f8",
    //   borderBottomColor: "#f8f8f8"
    // }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image style={[avatar.medium, { backgroundColor: "lightgray" }]} />
        </View>
        <TouchableOpacity style={[styles.textInput, { borderBottomWidth: 0 }]}>
          <Text style={[text.placeholder]}>Prénom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.textInput, { marginBottom: 20 }]}
          onPress={() => {
            this.props.navigation.navigate("PaymentMethods");
          }}
        >
          <Text style={[text.placeholder]}>Nom</Text>
        </TouchableOpacity>
        <Text>This is the MyAccountInfo screen</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("MyBikes");
          }}
        >
          <Text>Voir mes vélos</Text>
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
  },
  textInput: {
    borderWidth: 1,
    width: width,
    height: 50,
    paddingLeft: 15,
    justifyContent: "center",
    borderColor: "#f1f1f1",
    backgroundColor: "#FFFFFF"
  }
});

export default MyAccountInfo;
