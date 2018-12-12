import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { text } from "../constants/Styles";

class Filters extends React.Component {
  static navigationOptions = {
    title: "Filtres",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 18,
      color: "#262626"
    },
    headerStyle: {
      backgroundColor: "#f8f8f8",
      borderBottomColor: "#f8f8f8"
    }
  };

  state = {
    selected: false
  };

  render() {
    const categories = [
      "VTT",
      "Vélo Ville",
      "VTC",
      "BMX",
      "Tandem",
      "Course",
      "Hollandais",
      "Electrique",
      "Fixie/SP",
      "Cargo",
      "Enfants",
      "Autres"
    ];

    return (
      <ScrollView style={styles.contentContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity style={styles.categoriesSelect}>
            <Text style={text.p}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8"
  },
  categoriesSelect: {
    height: 80,
    width: 80,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Filters;
