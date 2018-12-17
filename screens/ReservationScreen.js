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
    bikes: []
  };

  componentDidMount() {
    AsyncStorage.multiGet(["token", "id"]).then(value => {
      this.setState({ token: value[0][1], id: value[1][1] });

      axios
        .get("http://localhost:3100/api/user/anyThread/" + this.state.id, {
          headers: { Authorization: "Bearer " + this.state.token }
        })
        .then(response => {
          console.log("on a bien les vélos ? ====> ", response.data);
          this.setState({ bikes: response.data });
        })
        .catch(err => err);
    });
  }

  render() {
    console.log("Les states de la page ====>", this.state);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text style={text.h1}>Locations à venir</Text>

            <FlatList
              data={this.state.bikes}
              keyExtractor={item => item._id}
              renderItem={({ item }) => {
                if (item.owner._id === this.state.id) {
                  return (
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
                      />
                    </View>
                  );
                } else {
                  return (
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
                        bikeId={item.bike._id}
                        threadId={item._id}
                        userId={this.state.id}
                        propId={item.owner._id}
                      />
                    </View>
                  );
                }
              }}
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
