import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { button, text, background } from "../constants/Styles";

class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[text.company, styles.firstLine]}>bicycly</Text>
        <Text numberOfLines={2} style={[text.accroche, styles.secondLine]}>
          Louez votre vélo entre particuliers
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  firstLine: {
    marginTop: 20,
    marginBottom: 30
  },
  secondLine: {
    marginLeft: 100,
    marginRight: 100,
    textAlign: "center"
  }
});

export default Header;
