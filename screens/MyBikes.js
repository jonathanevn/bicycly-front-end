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

import SearchBar from "../components/SearchBar";
import { text, button, avatar } from "../constants/Styles";
import { width, height } from "../constants/Layout";

export default class MyBikesScreen extends React.Component {
  static navigationOptions = {
    title: "Mes vélos",
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
        .get(
          "https://bicycly.herokuapp.com/api/user/myBikesList/" + this.state.id,
          {
            headers: { Authorization: "Bearer " + this.state.token }
          }
        )
        .then(response => {
          this.setState({ bikes: response.data[0].account.bikes });
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
            <Text style={text.h1}>Mes Vélos</Text>
            <FlatList
              data={this.state.bikes}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <View style={styles.flatCard}>
                  <BikeViewHistory
                    picture={item.photos[0].secure_url}
                    brand={item.bikeBrand}
                    mod={item.bikeModel}
                    price={item.pricePerDay}
                  />
                </View>
              )}
            />

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AddBike");
              }}
            >
              <Text>Ajouter un vélo</Text>
            </TouchableOpacity>
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
