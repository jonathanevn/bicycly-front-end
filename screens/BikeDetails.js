import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { text, button } from "../constants/Styles";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import Colors from "../constants/Colors";
import axios from "axios";
import { height, width } from "../constants/Layout";
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

class BikeDetails extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      navigation.state.params.bikeBrand + navigation.state.params.bikeModel,
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
  });

  state = {
    bike: [],
    user: []
  };

  componentDidMount() {
    axios
      .get(
        "http://192.168.86.249:3100/api/bike/" +
          this.props.navigation.state.params.bikeId
      )
      .then(response => {
        if (response.data) {
          console.log("response.data", response.data);
          this.setState({ bike: response.data });
        }
      })
      .catch(error => {
        console.log("ERROR", error.response);
      });
  }

  render() {
    const { bike } = this.state;

    return (
      <ScrollView style={styles.contentContainer}>
        <View style={styles.photoPrice}>
          {/*  <Image source={{ uri: bike.photos[0] }} style={styles.photo} /> */}
          <View style={styles.priceAvatar}>
            <Text style={text.fullPrice}>30€</Text>
            <Text style={text.pricePerDay}>{bike.pricePerDay}€ /jour</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.bikeBrandModel}>
            <Text numberOfLines={1} style={text.h1}>
              {bike.bikeBrand} {""}
            </Text>
            <Text numberOfLines={1} style={text.h1}>
              {bike.bikeModel}
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
              <Text style={text.bikeCategory}>{bike.bikeCategory}</Text>
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

          <View style={styles.profileUser}>
            {/* <Image
              source={{ uri: bike.user.photo[0] }}
              style={styles.photoUser}
            /> */}
            <Text>{bike.user.firstName}</Text>
            <Text>{bike.user.lastName}</Text>
            <Text>{bike.user.ratingValue}</Text>
            <Text>{bike.user.reviews} avis</Text>
          </View>

          <Text style={[text.h2, styles.accessoriesSection]}>Accessoires</Text>
          <View>
            {bike.accessories.map((item, index) => (
              <View key={index}>
                <Text style={text.p}>{item}</Text>
              </View>
            ))}
          </View>

          <Text style={[text.h2, styles.descriptionSection]}>Description</Text>

          <Text style={text.p}>{this.state.bike.description}</Text>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={button.primary}
            onPress={() => {
              this.props.navigation.navigate("Tchat", {
                // bikeId: this.state.params.navigate.bikeId
              });
            }}
          >
            <Text style={text.textButton}>Demande de location</Text>
          </TouchableOpacity>
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

  content: {
    alignItems: "flex-start",
    marginTop: 20,
    marginHorizontal: 20
  },

  photo: {
    width: width,
    height: 220
  },

  priceAvatar: {
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    position: "absolute",
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
  },

  profileUser: {
    backgroundColor: "red",
    width: width
  },

  photoUser: {
    height: 30,
    width: 30
  },

  accessoriesSection: {
    marginTop: 30,
    marginBottom: 10
  },

  descriptionSection: {
    marginTop: 30,
    marginBottom: 10
  },

  buttonSection: {
    justifyContent: "center",
    width: width,
    alignItems: "center",
    marginVertical: 30
  }
});

export default BikeDetails;
