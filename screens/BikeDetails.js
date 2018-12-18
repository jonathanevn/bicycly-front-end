import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import { text, button, avatar } from "../constants/Styles";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import Colors from "../constants/Colors";
import axios from "axios";
import StarRating from "react-native-star-rating";
import { height, width } from "../constants/Layout";
import Avatar from "../components/Avatar";
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
    bikeId: this.props.navigation.state.params.bikeId,
    userId: "",
    propId: "",

    bike: {},
    thread: {},
    user: {},
    numberOfDays: this.props.navigation.state.params.numberOfDays,

    isLoading: false
  };

  componentDidMount() {
    AsyncStorage.multiGet(["token", "id"]).then(value => {
      this.setState({ token: value[0][1], userId: value[1][1] }, () => {
        axios
          .get(
            "https://bicycly.herokuapp.com/api/bike/" +
              // "https://bicycly.herokuapp.com/api/bike/"
              this.props.navigation.state.params.bikeId,
            { headers: { Authorization: "Bearer " + this.state.token } }
          )
          .then(response => {
            /*   console.log(response.data); */

            if (response.data) {
              this.setState({
                bike: response.data.bike,
                thread: response.data.thread,
                isLoading: true
              });
            }
          })
          .catch(error => {
            console.log("ERROR3", error.response);
          });
      });
    });
  }

  renderRentButton() {
    if (this.state.userId !== this.state.bike.user._id) {
      return (
        <TouchableOpacity
          style={button.primary}
          onPress={() => {
            if (this.state.thread) {
              this.props.navigation.navigate("Tchat", {
                bikeId: this.props.navigation.state.params.bikeId,
                threadId: this.state.thread._id,
                userId: this.state.userId,
                propId: this.state.propId
              });
            } else {
              axios
                .get(
                  `https://bicycly.herokuapp.com/api/tchat/message/${
                    this.props.navigation.state.params.bikeId
                  }/${this.state.userId}`
                )
                .then(response => {
                  if (response.data._id) {
                    this.props.navigation.navigate("Tchat", {
                      bikeId: this.props.navigation.state.params.bikeId,
                      threadId: response.data._id,
                      userId: this.state.userId,
                      propId: this.state.propId
                    });
                  } else {
                    alert("Une erreur est survenue");
                  }
                })
                .catch(error => {
                  console.log("ERROR1", error);
                });
            }
          }}
        >
          <Text style={text.textButton}>Demande de location</Text>
        </TouchableOpacity>
      );
    }
    // Le code suivant devra être remplacé par `return null`
    return (
      <TouchableOpacity
        style={button.primary}
        onPress={() => {
          if (this.state.thread) {
            this.props.navigation.navigate("Tchat", {
              bikeId: this.props.navigation.state.params.bikeId,
              threadId: this.state.thread,
              userId: this.state.userId,
              propId: this.state.propId
            });
          }
        }}
      >
        <Text style={text.textButton}>
          (TEST) Accéder à un chat avec l'utilisateur Farid
        </Text>
      </TouchableOpacity>
    );
  }

  renderImage() {
    if (this.state.bike.user.account.photos[0]) {
      return (
        <View>
          <Image
            style={[avatar.medium]}
            source={{
              uri: this.state.bike.user.account.photos[0].secure_url
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.image}>
          <Icon name="cyclist" size={45} color="#ffc200" />
        </View>
      );
    }
  }

  render() {
    const { bike, numberOfDays } = this.state;
    if (this.state.isLoading === false) {
      return <Text>isLoading...</Text>;
      // } else if (this.state.bike.photos === undefined) {
      //   return null;
    } else {
      return (
        <ScrollView style={styles.contentContainer}>
          <View style={styles.photoPrice}>
            <Image
              source={{
                uri: this.state.bike.photos[0].secure_url
              }}
              style={styles.photo}
            />
            <View style={styles.priceAvatar}>
              <Text style={text.fullPrice}>
                {isNaN(numberOfDays)
                  ? bike.pricePerDay
                  : bike.pricePerDay * numberOfDays}
                €
              </Text>
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
              {this.state.bike.user.account.photos === undefined ? null : (
                <View style={styles.picture}>{this.renderImage()}</View>
              )}
              <View style={styles.profileUserInfo}>
                <View style={styles.username}>
                  <Text style={styles.firstname}>
                    {bike.user.firstName} {bike.user.lastName[0] + "."}
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
                    {bike.user.reviews} 2 avis
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
          <View style={styles.buttonSection}>{this.renderRentButton()}</View>
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
