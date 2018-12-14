import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";

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

  /* 
  componentDidMount() {
 

    AsyncStorage.multiGet(["token", "id"]).then(value => {
      this.setState({ token: value[0][1], id: value[1][1] });

      axios
        .get("https://bicycly.herokuapp.com/api/user/" + this.state.id, {
          headers: { Authorization: "Bearer " + this.state.token }
        })
        .then(response => {
          this.setState({
            account: response.data.account,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            reviews: response.data.reviews
          });
          console.log("cdm", response.data);
        })
        .catch(err => ("wtf", err));
    });
  } */

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text>This is the My Bikes screen with the map</Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("StartRent");
              }}
            >
              <Text>Demarrer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("EndRent");
              }}
            >
              <Text>Terminer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AddBike");
              }}
            >
              <Text>Ajouter un vélo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Tchat");
              }}
            >
              <Text>Contacter</Text>
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
  }
});
