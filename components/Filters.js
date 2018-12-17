import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Modal,
  SafeAreaView,
  FlatList
} from "react-native";
import { text, button } from "../constants/Styles";
import { ListButton, FilterButton } from "../components/SquareButton";
import { Ionicons, createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import { height, width } from "../constants/Layout";
import Colors from "../constants/Colors";
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

const categories = [
  { category: "vtt", name: "VTT", iconName: "VTT", size: 23 },
  { category: "ville", name: "Vélo Ville", iconName: "Ville", size: 25 },
  { category: "vtc", name: "VTC", iconName: "bike_VTC", size: 39 },
  { category: "bmx", name: "BMX", iconName: "bmx", size: 25 },
  { category: "tandem", name: "Tandem", iconName: "tandem-bicycle", size: 44 },
  { category: "course", name: "Course", iconName: "Course", size: 30 },
  {
    category: "hollandais",
    name: "Hollandais",
    iconName: "Hollandais",
    size: 30
  },
  {
    category: "electrique",
    name: "Electrique",
    iconName: "Electrique",
    size: 22
  },
  { category: "fixie", name: "Fixie/SP", iconName: "Fixie", size: 22 },
  { category: "cargo", name: "Cargo", iconName: "bicycle_clean", size: 40 },
  { category: "enfants", name: "Enfants", iconName: "Enfants", size: 22 },
  { category: "autres", name: "Autres", iconName: "Autres", size: 22 }
];

const categoriesSelected = [];

class Filters extends React.Component {
  state = {
    modalFilterVisible: false,
    categoriesFilter: [],
    categoriesRange: categories.map(item => ({
      category: item.category,
      name: item.name,
      iconName: item.iconName,
      size: item.size,
      selected: false
    }))
  };

  setModalFilterVisible(visible) {
    this.setState({ modalFilterVisible: visible });
  }

  renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.noSelected, item.selected && styles.selected]}
      onPress={() => this.onPressItem(index)}
    >
      <View style={styles.icon}>
        <Icon name={item.iconName} size={item.size} color="#262626" />
      </View>
      <View style={styles.category}>
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  onPressItem = index => {
    const newCategorySelected = [...this.state.categoriesRange];
    newCategorySelected[index] = {
      ...newCategorySelected[index],
      selected: !newCategorySelected[index].selected
    };

    this.setState({
      categoriesRange: newCategorySelected
    });
  };

  handleSubmit = () => {
    const categoriesSelected = [...this.state.categoriesFilter];
    for (let i = 0; i < this.state.categoriesRange.length; i++) {
      if (this.state.categoriesRange[i].selected === true) {
        this.state.categoriesFilter.push(
          this.state.categoriesRange[i].category
        );
        categoriesSelected.push(this.state.categoriesRange[i].category);
      }
    }
    this.setState({ categoriesFilter: categoriesSelected }, () =>
      this.props.categoriesSelected(this.state.categoriesFilter)
    );
    this.setModalFilterVisible(!this.state.modalFilterVisible);
  };

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            this.setModalFilterVisible(false);
          }}
          visible={this.state.modalFilterVisible}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.closeButton}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalFilterVisible(!this.state.modalFilterVisible);
                }}
              >
                <Ionicons
                  size={30}
                  color={Colors.darkGrey}
                  name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.title}>
              <Text style={text.h1}>Catégories</Text>
            </View>
            <View style={styles.container}>
              <FlatList
                data={this.state.categoriesRange}
                style={styles.body}
                numColumns={3}
                keyExtractor={(item, index) => item.category}
                renderItem={this.renderItem}
              />
              <View style={styles.buttonSection}>
                <TouchableOpacity
                  style={button.primary}
                  onPress={() => {
                    this.handleSubmit();
                  }}
                >
                  <Text style={text.textButton}>Confirmer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Modal>

        <View style={styles.filterButton}>
          <TouchableOpacity
            onPress={() => {
              this.setModalFilterVisible(true);
            }}
          >
            <FilterButton name="equalizer" size={20} label="Filtres" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    marginTop: 10
  },

  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8f8f8"
  },

  body: {
    flexDirection: "column",
    flex: 1,
    height: "100%",
    paddingTop: 10
  },

  selected: {
    height: 90,
    width: 90,
    backgroundColor: "#ffc200",
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
    backgroundColor: "white",
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
  },

  buttonSection: {
    marginBottom: 30
  },

  closeButton: {
    marginLeft: 35
  },

  title: {
    marginLeft: 35,
    marginTop: 15
  }
});

export default Filters;
