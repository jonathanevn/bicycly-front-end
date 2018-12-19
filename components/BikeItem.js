import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { text, button } from "../constants/Styles";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import Colors from "../constants/Colors";
import { height, width } from "../constants/Layout";
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

class BikeCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.photoPrice}>
          <Image
            source={{ uri: this.props.picture }}
            style={styles.photo}
            resizeMode="cover"
          />
          <View style={styles.priceAvatar}>
            <Text style={text.fullPrice}>{this.props.pricePerDay}€</Text>
            <Text style={text.pricePerDay}>
              {this.props.pricePerDay}€ /jour
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.bikeBrandModel}>
            <Text numberOfLines={1} style={text.h2}>
              {this.props.brand} {""}
            </Text>
            <Text numberOfLines={1} style={text.h2}>
              {this.props.model}
            </Text>
          </View>

          <View style={styles.bikeCategoryLoc}>
            <View style={styles.categoryTextIcon}>
              <Icon
                name="bike"
                size={12}
                color={Colors.yellow}
                style={{ paddingRight: 8 }}
              />
              <Text style={text.bikeCategory}>{this.props.category}</Text>
            </View>
            <View style={styles.locTextIcon}>
              <Icon
                name="location"
                size={12}
                color={Colors.lightGrey}
                style={{ paddingRight: 8, paddingLeft: 20 }}
              />
              <Text style={text.localisation}>{this.props.distance} m</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "flex-start",
    height: 240,
    width: width - 30,
    borderRadius: 10,
    shadowColor: "rgba(93, 93, 93, 0.25)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    /*   marginHorizontal: 8, */
    /*  elevation: 3, */
    overflow: "hidden",
    marginHorizontal: 10,
    marginBottom: 15
  },

  content: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    width: 120,
    marginLeft: 20,
    marginTop: 12
  },

  photo: {
    width: width - 30,
    height: 170
  },

  priceAvatar: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "white",
    height: 66,
    width: 66,
    borderRadius: 66 / 2,
    bottom: -35,
    right: 20
  },

  bikeBrandModel: {
    flexDirection: "row",
    paddingBottom: 5
  },
  bikeCategoryLoc: {
    flexDirection: "row"
  },
  locTextIcon: {
    flexDirection: "row",
    alignItems: "center"
  },
  categoryTextIcon: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default BikeCard;
