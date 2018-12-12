import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { text } from "../constants/Styles";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import { height, width } from "../constants/Layout";

const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

const categories = [
  { category: "VTT", name: "VTT", size: 23 },
  { category: "Vélo Ville", name: "Ville", size: 25 },
  { category: "VTC", name: "bike_VTC", size: 39 },
  { category: "BMX", name: "bmx", size: 25 },
  { category: "Tandem", name: "tandem-bicycle", size: 44 },
  { category: "Course", name: "Course", size: 30 },
  { category: "Hollandais", name: "Hollandais", size: 30 },
  { category: "Electrique", name: "Electrique", size: 22 },
  { category: "Fixie/SP", name: "Fixie", size: 22 },
  { category: "Cargo", name: "bicycle_clean", size: 40 },
  { category: "Enfants", name: "Enfants", size: 22 },
  { category: "Autres", name: "Autres", size: 22 }
];

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
    },
    headerTintColor: "#262626"
  };

  state = {
    selectedCategory: categories.map(item => ({
      categoryName: item,
      selected: false
    }))
  };

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        <View style={styles.body}>
          {this.state.selectedCategory.map(
            ({ categoryName, selected }, index) => {
              return (
                <View>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      const newCategorySelected = [
                        ...this.state.selectedCategory
                      ];
                      newCategorySelected[index] = {
                        categoryName,
                        selected: !selected
                      };
                      this.setState(state => ({
                        selectedCategory: newCategorySelected
                      }));
                    }}
                    style={[styles.selected, selected && styles.noSelected]}
                  >
                    <View style={styles.icon}>
                      <Icon
                        name={categoryName.name}
                        size={categoryName.size}
                        color="#262626"
                      />
                    </View>
                    <View style={styles.category}>
                      <Text style={styles.categoryText}>
                        {categoryName.category}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8"
  },

  body: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: height,
    paddingTop: 30
  },

  selected: {
    height: 90,
    width: 90,
    backgroundColor: "white",
    borderWidth: 0.1,
    borderColor: "#c2c2c2",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end"
  },

  noSelected: {
    height: 90,
    width: 90,
    backgroundColor: "#ffc200",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end"
  },

  category: {
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: 15
  },

  icon: {
    flex: 1,
    paddingTop: 20
  },

  categoryText: {
    fontFamily: "Karla-Bold",
    fontSize: 12,
    color: "#262626"
  }
});

export default Filters;
