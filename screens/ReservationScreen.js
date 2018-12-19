import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from "react-native";
import axios from "axios";
import BikeViewHistory from "../components/BikeViewHistory";

import { text } from "../constants/Styles";
import CardTchat from "../components/CardTchat";

export default class ReservationScreen extends React.Component {
  static navigationOptions = {
    title: "Mes reservations",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 18,
      color: "#262626"
    },
    headerStyle: {
      backgroundColor: "#f8f8f8",
      borderBottomColor: "#f8f8f8"
    }
  };

  state = {
    token: "",
    id: "",
    myBikes: [],
    otherBikes: []
  };

  componentDidMount() {
    const myBikes = [];
    const otherBikes = [];
    AsyncStorage.multiGet(["token", "id"]).then(value => {
      this.setState({ token: value[0][1], id: value[1][1] });

      axios
        .get(
          "https://bicycly.herokuapp.com/api/user/anyThread/" + this.state.id,
          {
            headers: { Authorization: "Bearer " + this.state.token }
          }
        )
        .then(response => {
          // axios renvoie toutes les threads où le user est référencé, avec  pour chaque thread un "populate" sur le vélo, le user et le owner
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].owner._id === this.state.id) {
              // si le user est référencé en tant que propriétaire
              myBikes.push(response.data[i]);
            } else {
              // si le user est référencé en tant que locataire
              otherBikes.push(response.data[i]);
            }
          }
          this.setState({ myBikes: myBikes, otherBikes: otherBikes });
        })
        .catch(err => err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text style={text.h1}>Propriétaire</Text>
            <FlatList
              data={this.state.myBikes}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <View style={styles.flatCard}>
                  <BikeViewHistory
                    picture={item.bike.photos[0].secure_url}
                    brand={item.bike.bikeBrand}
                    mod={item.bike.bikeModel}
                    price={item.bike.pricePerDay}
                    ownerOrUser={"Loué à "}
                    ownerOrUserName={
                      item.user.firstName + " " + item.user.lastName
                    }
                    contact={true} // propriété faisant apparaître le bouton contact, les 4 props qui suivent sont alors utiles pour le "navigate" du bouton "Contacter"
                    bikeId={item.bike._id}
                    threadId={item._id}
                    userId={this.state.id}
                    propId={item.owner._id}
                  />
                </View>
              )}
            />
            <Text style={text.h1}>Locataire</Text>
            <FlatList
              data={this.state.otherBikes}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <View style={styles.flatCard}>
                  <BikeViewHistory
                    picture={item.bike.photos[0].secure_url}
                    brand={item.bike.bikeBrand}
                    mod={item.bike.bikeModel}
                    price={item.bike.pricePerDay}
                    ownerOrUser={"Loué par "}
                    ownerOrUserName={
                      item.owner.firstName + " " + item.owner.lastName
                    }
                    contact={true} // propriété faisant apparaître le bouton contact, les 4 props qui suivent sont alors utiles pour le "navigate" du bouton "Contacter"
                    bikeId={item.bike._id}
                    threadId={item._id}
                    userId={this.state.id}
                    propId={item.owner._id}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeContainer: {
    margin: 10
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#f8f8f8"
  },

  flatCard: {
    marginLeft: 10,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10
  }
});
