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

//import { ListButton } from "../components/SquareButton";
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
    console.log(this.state);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text>This is the My Bikes screen with the map</Text>

            <FlatList
              data={this.state.bikes}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <View>
                  <BikeViewHistory
                    picture={item.bike.photos[0].secure_url}
                    brand={item.bike.bikeBrand}
                    cat={item.bike.bikeCategory}
                  />
                  <View style={styles.confirmButton}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("StartRent");
                      }}
                    >
                      <Text>Demarrer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("Tchat");
                      }}
                    >
                      <Text>Contacter</Text>
                    </TouchableOpacity>
                  </View>
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
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("EndRent");
              }}
            >
              <Text>Terminer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#f8f8f8"
  },
  confirmButton: {
    flexDirection: "row"
  }
});
