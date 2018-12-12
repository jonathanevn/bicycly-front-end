import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image
} from "react-native";

import axios from "axios";

import { button, text, avatar } from "../constants/Styles";
import { width, height } from "../constants/Layout";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: "Mon compte",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 18,
      color: "#262626"
    }
    // headerStyle: {
    //   backgroundColor: "#f8f8f8",
    //   borderBottomColor: "#f8f8f8"
    // }
  };

  state = {
    token: "",
    id: "",
    firstName: "",
    lastName: "",
    account: "",
    ratingValue: "",
    reviews: "",
    email: ""
  };

  componentDidMount() {
    // const { id } = this.props.match.params;
    // const AuthStr = "Bearer".concat(this.state.token);

    AsyncStorage.multiGet(["token", "id"]).then(value => {
      this.setState({ token: value[0][1], id: value[1][1] });
      //   console.log("getItem", value);
      //   console.log(this.state.token);
      axios
        .get("https://bicycly.herokuapp.com/api/user/" + this.state.id, {
          headers: { Authorization: "Bearer " + this.state.token }
        })
        .then(response => {
          this.setState({
            account: response.data.account,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            reviews: response.data.reviews,
            email: response.data.email
          });
          console.log("cdm", response.data);
        })
        .catch(err => ("wtf", err));
    });
  }

  renderImage() {
    if (this.state.account.profilePicture[0]) {
      return (
        <View>
          <Image
            style={[avatar.medium]}
            source={{ uri: this.state.account.profilePicture[0] }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.image}>
          <Icon name="cyclist" size={45} color="#ffc200" />
        </View>
        //   style={[
        //     avatar.medium,
        //     {
        //       backgroundColor: "lightgrey"
        //     }
        //   ]}
      );
    }
  }

  render() {
    const { firstName, lastName, email, phone, account } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.profil}>
          <View style={styles.picture}>{this.renderImage()}</View>
          <View>
            <Text style={text.h3}>
              {this.state.firstName} {this.state.lastName[0] + "."}
            </Text>
            <View style={styles.rating}>
              <Text>{this.state.ratingValue}</Text>
              <Text style={text.rate}>{this.state.reviews} avis</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.textInput, { marginVertical: 20 }]}
          onPress={() => {
            this.props.navigation.navigate("MyAccountInfo", {
              firstName,
              lastName,
              email,
              phone,
              account
            });
          }}
        >
          <Text style={[text.placeholder]}>Mes infos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.textInput, { borderBottomWidth: 0 }]}>
          <Text style={[text.placeholder]}>Mes paiements</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.textInput, { marginBottom: 20 }]}
          onPress={() => {
            this.props.navigation.navigate("PaymentMethods");
          }}
        >
          <Text style={[text.placeholder]}>Moyens de paiement enregistrés</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.textInput, { borderBottomWidth: 0 }]}>
          <Text style={[text.placeholder]}>Aide</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.textInput, { borderBottomWidth: 0 }]}>
          <Text style={[text.placeholder]}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.textInput, { marginBottom: 30 }]}>
          <Text style={[text.placeholder]}>A propos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.multiRemove(["token", "id"]).then(() => {
              this.props.navigation.navigate("AuthLoadingScreen");
            });
          }}
        >
          <Text style={[text.p2, styles.deconnexion]}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#f8f8f8",
    height: height,
    width: width
  },
  profil: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: width
  },
  image: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 66,
    width: 66,
    alignItems: "center",
    justifyContent: "center"
  },
  picture: {
    marginLeft: 20,
    marginRight: 20
  },
  rating: {
    flexDirection: "row",
    marginTop: 5
  },
  textInput: {
    borderWidth: 1,
    width: width,
    height: 50,
    paddingLeft: 15,
    justifyContent: "center",
    borderColor: "#f1f1f1",
    backgroundColor: "#FFFFFF"
  },
  deconnexion: {
    marginTop: 20,
    color: "red",
    alignItems: "center",
    justifyContent: "center"
  }
});
