import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { MapView } from "expo";
import { height, width } from "../constants/Layout";
/* import AppNavigation from "../navigation/AppNavigation"; */
import { text, button } from "../constants/Styles";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    if (this.state.latitude === null) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude
              }}
              title={"Le Reacteur"}
              description={"La formation des champions !"}
            />
          </MapView>

          {/* <TouchableOpacity
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
        </TouchableOpacity> */}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    flex: 1,
    width: "100%"
  }
});
