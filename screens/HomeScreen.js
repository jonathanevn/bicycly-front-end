import React from "react";
import SearchBar from "../components/SearchBar";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { MapView, Permissions } from "expo";
import { height, width } from "../constants/Layout";
import { text, button } from "../constants/Styles";

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    error: null
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION);
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  onRegionChange = region => {
    this.setState({ region });
  };

  render() {
    if (this.state.latitude === null) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            }}
            /* onRegionChange={region => this.setState({ region })}
            onRegionChangeComplete={region => this.setState({ region })} */
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.region.latitudeDelta,
                longitude: this.state.region.longitudeDelta
              }}
              title={"Le Reacteur"}
              description={"La formation des champions !"}
            />
          </MapView>
          <View style={styles.content}>
            <SearchBar onLocationChange={this.onRegionChange} />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Filters");
              }}
            >
              <Text>Filtre</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("List");
              }}
            >
              <Text>Voir liste</Text>
            </TouchableOpacity>
          </View>
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
  },
  content: {
    position: "absolute",
    top: 60
  }
});
