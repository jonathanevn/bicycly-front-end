import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import BikeItem from "../components/BikeItem";
import SearchBar from "../components/SearchBar";
import { ListButton } from "../components/SquareButton";
import { width, height } from "../constants/Layout";

class List extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.yellowBackground} />
          <View style={styles.searchBar}>
            <SearchBar onLocationChange={this.onLocationChange} />
          </View>
          <FlatList
            style={styles.listItems}
            data={params.bikes}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("BikeDetails", {
                    bikeId: item._id,
                    bikeBrand: item.bikeBrand,
                    bikeModel: item.bikeModel
                  });
                }}
              >
                <BikeItem
                  brand={item.bikeBrand}
                  model={item.bikeModel}
                  picture={item.photos[0].secure_url}
                  category={item.bikeCategory}
                  pricePerDay={item.pricePerDay}
                />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        <View style={styles.mapButton}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.popToTop();
            }}
          >
            <ListButton name="map" size={25} label="Carte" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center"
  },

  yellowBackground: {
    backgroundColor: "#ffc200",
    width: width,
    height: 100,
    top: -20,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },

  listItems: {
    marginTop: 40,
    position: "relative"
  },

  searchBar: {
    top: 60,
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
    left: "50%",
    right: "50%"
  },

  mapButton: {
    position: "absolute",
    top: 270,
    right: 70
  }
});

export default List;
