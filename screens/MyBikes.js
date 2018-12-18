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
import { width, height } from "../constants/Layout";
import SearchBar from "../components/SearchBar";
import { text, button, avatar } from "../constants/Styles";

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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
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
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={button.primary}
              onPress={() => {
                this.props.navigation.navigate("AddBike");
              }}
            >
              <Text style={text.textButton}>Ajouter un vélo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  welcomeContainer: {
    margin: 10
  },
  contentContainer: {
    width: width,
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "space-between"
  },

  flatCard: {
    marginLeft: 10,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10
  },

  buttonSection: {
    width: width,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center"
  }
});
