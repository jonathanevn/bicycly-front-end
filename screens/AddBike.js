import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { button, text } from "../constants/Styles";
import { width, height } from "../constants/Layout";
import RNPickerSelect from "react-native-picker-select";
import { Constants } from "expo";
import axios from "axios";
import Accessories from "../components/Accessories";
import UploadPhoto from "../components/UploadPhoto";
class AddBike extends React.Component {
  static navigationOptions = {
    title: "Nom du vélo",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 18,
      color: "#262626"
    },
    headerStyle: {
      backgroundColor: "#f8f8f8",
      borderBottomColor: "#f8f8f8"
    },
    headerTintColor: "black"
  };

  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      CateVelo: undefined,
      bikeCategory: [
        {
          label: "VTT",
          value: "vtt"
        },
        {
          label: "Vélo ville",
          value: "ville"
        },
        {
          label: "VTC",
          value: "vtc"
        },
        {
          label: "BMX",
          value: "bmx"
        },
        {
          label: "Tandem",
          value: "tandem"
        },
        {
          label: "Course",
          value: "course"
        },
        {
          label: "Hollandais",
          value: "hollandais"
        },
        {
          label: "Electrique",
          value: "electrique"
        },
        {
          label: "Fixie/SP",
          value: "fixie/SP"
        },
        {
          label: "Cargo",
          value: "cargo"
        },
        {
          label: "Enfants",
          value: "enfants"
        },
        {
          label: "Autres",
          value: "autres"
        }
      ],

      bikeBrand: "",
      bikeModel: "",
      description: "",
      accessories: [],
      photos: [],
      pricePerDay: "",
      token: ""
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("token").then(token => {
      this.setState({ token });
    });
  }

  handleImagePick = photoBase64 => {
    const newPhotos = [...this.state.photos];
    newPhotos.push(photoBase64);
    this.setState({
      photos: newPhotos
    });
  };
  onPress = () => {
    const {
      bikeBrand,
      bikeModel,
      accessories,
      CateVelo,
      description,
      photos,
      pricePerDay
    } = this.state;

    axios
      .post(
        "https://bicycly.herokuapp.com/api/bike/publish",
        {
          bikeBrand: bikeBrand,
          bikeModel: bikeModel,
          accessories: accessories,
          bikeCategory: CateVelo,
          description: description,
          photos: photos,
          pricePerDay: pricePerDay
        },
        { headers: { Authorization: this.state.token } }
      )

      .then(response => {
        console.log(
          "​AddBike -> onPress -> response.data.photos.map(photo => photo.secure_url)",
          response.data.photos.map(photo => photo.secure_url)
        );
        this.props.navigation.navigate("BikeDetails", {
          bikeId: response.data._id,
          bikeBrand: response.data.bikeBrand,
          bikeModel: response.data.bikeModel,
          accessories: response.data.accessories,
          bikeCategory: response.data.bikeCategory,
          description: response.data.description,
          photos: response.data.photos.map(photo => photo.secure_url), // [{ secure_url: 'https://...' }, {}]
          pricePerDay: response.data.pricePerDay
        });
      });
  };
  handleAccessories = accessories => {
    this.setState({ accessories: accessories });
  };

  render() {
    return (
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <View style={styles.sectionPhoto}>
              <UploadPhoto
                handleImagePick={this.handleImagePick}
                photos={this.state.photos}
              />
            </View>

            <Text>Mon Vélo</Text>
            <TextInput
              style={[styles.textInput, { borderTopWidth: 0.5 }]}
              style={[styles.textInput, { borderBottomWidth: 0 }]}
              placeholder="Marque"
              name="bikeBrand"
              value={this.state.bikeBrand}
              onChangeText={value => {
                this.setState({ bikeBrand: value });
              }}
            />
            <TextInput
              style={[styles.textInput, { borderTopWidth: 0.5 }]}
              style={[styles.textInput, { borderBottomWidth: 0.5 }]}
              placeholder="Modèle"
              name="bikeModel"
              value={this.state.bikeModel}
              onChangeText={value => {
                this.setState({ bikeModel: value });
              }}
            />
            <View style={styles.container}>
              <Text> Catégorie du vélo</Text>
              <RNPickerSelect
                placeholder={{
                  label: "Select a Category...",
                  value: null,
                  color: "#9EA0A4"
                }}
                items={this.state.bikeCategory}
                onValueChange={value => {
                  this.setState({
                    CateVelo: value
                  });
                }}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker2.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.CateVelo}
                ref={el => {
                  this.inputRefs.picker = el;
                }}
              />
            </View>

            <Text>Accessoires</Text>
            <Accessories handleAccessories={this.handleAccessories} />
            <View style={styles.sectionDescription}>
              <Text>Description</Text>
              <TextInput
                style={[styles.textInput, { borderTopWidth: 0.5 }]}
                style={[styles.textInput, { borderBottomWidth: 0.5 }]}
                value={this.state.description}
                onChangeText={value => {
                  this.setState({ description: value });
                }}
                name="description"
                multiline={true}
                placeholder="Dites pourquoi votre vélo est le plus beau des vélos!"
              />
            </View>

            <View>
              <Text>Tarification</Text>
              <TextInput
                style={[styles.textInput, { borderTopWidth: 0.5 }]}
                style={[styles.textInput, { borderBottomWidth: 0 }]}
                placeholder="Prix par jour €"
                value={this.state.pricePerDay}
                onChangeText={value => {
                  this.setState({ pricePerDay: value });
                }}
              />
            </View>
            <View style={styles.buttonSection}>
              <TouchableOpacity style={button.primary} onPress={this.onPress}>
                <Text>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingLeft: 15,
    marginRight: 50,
    borderWidth: 0.5,
    width: 350,
    height: 50,
    borderColor: "#f1f1f1",
    backgroundColor: "white",
    color: "black"
  }
});
const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  sectionPhoto: {
    justifyContent: "center"
  },
  containerCheckBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff"
  },
  sectionDescription: {
    marginVertical: 10
  },
  textInput: {
    borderWidth: 0.5,
    width: 350,
    height: 50,
    paddingLeft: 15,
    borderColor: "#f1f1f1",
    backgroundColor: "white"
  },
  buttonSection: {
    marginVertical: 20,
    width: width,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AddBike;
