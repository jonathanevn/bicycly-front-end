import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { ExpoConfigView } from "@expo/samples";

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: "Mon compte"
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text>This is the Account screen with the map</Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("MyAccountInfo");
              }}
            >
              <Text>Mes infos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("PaymentMethods");
              }}
            >
              <Text>Moyens de paiement enregistrés</Text>
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
    paddingTop: 15
  }
});
