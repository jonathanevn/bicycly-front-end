import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { text, button } from "../constants/Styles";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import Colors from "../constants/Colors";

const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

class BikeCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.photoPrice}>
            <View style={styles.photo} />
            <View style={styles.priceAvatar}>
              <Text style={text.fullPrice}>30€</Text>
              <Text style={text.pricePerDay}>
                {this.props.pricePerDay}€ /jour
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.bikeBrandModel}>
              <Text numberOfLines={1} style={text.h3}>
                {this.props.brand} {""}
              </Text>
              <Text numberOfLines={1} style={text.h3}>
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
                <Text style={text.localisation}>300m</Text>
              </View>
            </View>
          </View>
        </View>
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
  card: {
    backgroundColor: "white",
    alignItems: "flex-start",
    height: 180,
    width: 350,
    borderRadius: 12,
    shadowColor: "rgba(93, 93, 93, 0.25)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    /*   marginHorizontal: 8, */
    elevation: 4,
    overflow: "hidden",
    marginHorizontal: 10
  },

  content: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    width: 350,
    marginTop: 5,
    marginLeft: 15
  },

  photo: {
    width: 350,
    height: 130,
    backgroundColor: "grey",
    justifyContent: "flex-start",
    position: "relative"
  },

  priceAvatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    position: "absolute",
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    bottom: -35,
    right: 8
  },

  bikeBrandModel: {
    flexDirection: "row",
    paddingBottom: 2
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
