import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
/* import AppNavigation from "../navigation/AppNavigation"; */
import { text, button } from "../constants/Styles";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text style={text.h1}>This is the Home screen with the map</Text>
            <Text style={text.h2}>This is the Home screen with the map</Text>
            <Text style={text.h3}>This is the Home screen with the map</Text>
            <Text style={text.p}>This is the Home screen with the map</Text>
            <TouchableOpacity style={button.primary}>
              <Text style={text.textButton}>button primary</Text>
            </TouchableOpacity>

            <TouchableOpacity style={button.secondary}>
              <Text style={text.textButton}>button secondary</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Filters");
              }}
            >
              <Text>Filtre</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Calendar");
              }}
            >
              <Text>Calendrier</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("List");
              }}
            >
              <Text>Voir liste</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 30
  },

  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  }
});
