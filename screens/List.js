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
                    bikeId: item._id
                  });
                }}
              >
                <BikeItem
                  brand={item.bikeBrand}
                  model={item.bikeModel}
                  picture={item.photos[0]}
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
              this.props.navigation.navigate("", {
                region: this.state.region,
                bikes: this.state.bikes
              });
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
    alignItems: "flex-start",
    position: "relative",
    borderRadius: 80 / 2
  },

  listItems: {
    marginTop: 50,
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
