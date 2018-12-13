import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { text, button, avatar } from "../constants/Styles";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import Colors from "../constants/Colors";
import axios from "axios";
import StarRating from "react-native-star-rating";
import { height, width } from "../constants/Layout";
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

class BikeDetails extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      navigation.state.params.bikeBrand +
      " " +
      navigation.state.params.bikeModel,
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
    user: [],
    isLoading: false
  };

  componentDidMount() {
    console.log(
      "bikeID on details ===>",
      this.props.navigation.state.params.bikeId
    );
    axios
      .get(
        "http://localhost:3100/api/bike/" +
          this.props.navigation.state.params.bikeId
      )
      .then(response => {
        if (response.data) {
          /*           console.log("response.data", response.data); */
          this.setState({ bike: response.data, isLoading: true });
        }
      })
      .catch(error => {
        console.log("ERROR", error.response);
      });
  }

  render() {
    const { bike } = this.state;
    if (this.state.isLoading === false) {
      return <Text>isLoading...</Text>;
    } else {
      return (
        <ScrollView style={styles.contentContainer}>
          <View style={styles.photoPrice}>
            <Image source={{ uri: bike.photos[0] }} style={styles.photo} />
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
              <Image
                source={{ uri: bike.user.photo[0] }}
                style={avatar.medium}
              />
              <View style={styles.profileUserInfo}>
                <View style={styles.username}>
                  <Text style={styles.firstname}>{bike.user.firstName}</Text>
                  <Text style={styles.lastname}>
                    {" "}
                    {""}
                    {bike.user.lastName}
                  </Text>
                </View>
                <View style={styles.ratingReview}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    starSize={13}
                    fullStarColor="#ffc200"
                    emptyStarColor="#ffc200"
                    rating={bike.user.ratingValue}
                  />
                  <Text style={text.rate}>
                    {" "}
                    {"  "}
                    {bike.user.reviews} avis
                  </Text>
                </View>
                <Text style={styles.acceptation}>Taux d'acceptation : bon</Text>
              </View>
            </View>

            <Text style={[text.h2, styles.accessoriesSection]}>
              Accessoires
            </Text>
            <View>
              {bike.accessories.map((item, index) => (
                <View key={index}>
                  <Text style={text.p}>{item}</Text>
                </View>
              ))}
            </View>

            <Text style={[text.h2, styles.descriptionSection]}>
              Description
            </Text>

            <Text style={text.p}>{this.state.bike.description}</Text>
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={button.primary}
              onPress={() => {
                this.props.navigation.navigate("Tchat", {
                  bikeId: this.props.navigation.state.params.bikeId
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
    paddingBottom: 8
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
    flexDirection: "row",
    marginTop: 30,
    paddingVertical: 15,
    borderBottomColor: Colors.lightGrey,
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    width: width - 40
  },

  profileUserInfo: {
    marginLeft: 15
  },

  username: {
    flexDirection: "row"
  },

  firstname: {
    fontFamily: "Karla-Bold",
    fontSize: 16,
    color: "#585858"
  },

  lastname: {
    fontFamily: "Karla-Bold",
    fontSize: 16,
    color: "#585858"
  },

  ratingReview: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center"
  },

  acceptation: {
    fontFamily: "Karla-Italic",
    fontSize: 14,
    color: "#585858"
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
