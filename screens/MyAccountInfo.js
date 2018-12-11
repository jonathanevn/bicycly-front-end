import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

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
  }
});

export default MyAccountInfo;
