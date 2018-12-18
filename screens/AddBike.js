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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { width, height } from "../constants/Layout";
import RNPickerSelect from "react-native-picker-select";
import { Constants } from "expo";
import axios from "axios";
import Accessories from "../components/Accessories";
import UploadPhoto from "../components/UploadPhoto";
import Colors from "../constants/Colors";

class AddBike extends React.Component {
  static navigationOptions = {
    title: "Ajouter un vélo",
    headerBackTitle: null,
    headerTintColor: "#262626",
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
      token: "",
      loc: []
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
      pricePerDay,
      loc
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
          pricePerDay: pricePerDay,
          loc: loc
        },
        { headers: { Authorization: this.state.token } }
      )

      .then(response => {
        /*  console.log(
          "​AddBike -> onPress -> response.data.photos.map(photo => photo.secure_url)",
          response.data.photos.map(photo => photo.secure_url)
        ); */
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View>
            <View style={styles.sectionPhoto}>
              <UploadPhoto
                handleImagePick={this.handleImagePick}
                photos={this.state.photos}
              />
            </View>

            <Text style={[text.h2, styles.title]}>Mon Vélo</Text>
            <TextInput
              style={[
                styles.textInput,
                { borderTopWidth: 0.5 },
                { borderBottomWidth: 0 }
              ]}
              placeholder="Marque"
              placeholderTextColor={Colors.lightGrey}
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
              placeholderTextColor={Colors.lightGrey}
              name="bikeModel"
              value={this.state.bikeModel}
              onChangeText={value => {
                this.setState({ bikeModel: value });
              }}
            />
            <View>
              <Text style={[text.h2, styles.title]}>Catégorie</Text>
              <RNPickerSelect
                placeholder={{
                  label: "Choisir une catégorie...",
                  value: null
                }}
                placeholderTextColor="#c2c2c2"
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

            <Text style={[text.h2, styles.title]}>Adresse</Text>
            <GooglePlacesAutocomplete
              placeholder="Ajouter une adresse "
              placeholderTextColor={Colors.lightGrey}
              minLength={2}
              autoFocus={false}
              returnKeyType={"search"}
              fetchDetails={true}
              renderDescription={row => row.description}
              onPress={(data, details = null) => {
                const location = [];
                location.push(Number(details.geometry.location.lng)),
                  location.push(Number(details.geometry.location.lat)),
                  this.setState({
                    loc: location
                  });
              }}
              query={{
                key: "AIzaSyChBhCJi-Dg_aDGRuBFO3zDKlhx918kPuQ",
                language: "fr", // language of the results
                types: ["(address)", "(regions)", "geocode"] // default: 'geocode'
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: "rgba(0,0,0,0)",
                  color: "#c2c2c2",
                  borderTopWidth: 0,
                  borderBottomWidth: 0
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  height: 50,
                  color: "#c2c2c2",
                  fontSize: 15,
                  fontFamily: "Karla-Regular",
                  paddingVertical: 15
                },
                description: {
                  fontFamily: "Karla-Bold",
                  color: "#262626",
                  fontSize: 11
                },
                predefinedPlacesDescription: {
                  color: Colors.darkGrey,
                  fontFamily: "Karla-Bold",
                  fontSize: 15
                }
              }}
              currentLocation={false}
              filterReverseGeocodingByTypes={[
                "address",
                "locality",
                "administrative_area_level_3"
              ]}
              debounce={200}
            />

            <Text style={[text.h2, styles.title]}>Accessoires</Text>
            <Accessories handleAccessories={this.handleAccessories} />

            <View style={styles.sectionDescription}>
              <Text style={[text.h2, styles.title]}>Description</Text>
              <TextInput
                style={styles.textInputDesc}
                editable={true}
                value={this.state.description}
                onChangeText={value => {
                  this.setState({ description: value });
                }}
                name="description"
                multiline={true}
                placeholder="Dites nous pourquoi votre vélo est le plus beau des vélos !"
              />
            </View>

            <Text style={[text.h2, styles.title]}>Tarification</Text>
            <View style={styles.priceSection}>
              <TextInput
                style={styles.numberInput}
                placeholder="Prix"
                value={this.state.pricePerDay}
                onChangeText={value => {
                  this.setState({ pricePerDay: value });
                }}
              />
              <Text style={[text.p, styles.pricePerDay]}>€ par jour</Text>
            </View>

            <View style={styles.buttonSection}>
              <TouchableOpacity style={button.primary} onPress={this.onPress}>
                <Text style={text.textButton}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingLeft: 15,
    borderWidth: 0.5,
    width: "100%",
    height: 50,
    borderColor: "#f1f1f1",
    backgroundColor: "white",
    color: "#262626",
    fontFamily: "Karla-Regular",
    borderRadius: 5
  }
});
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#f8f8f8",
    justifyContent: "center"
  },

  container: {
    marginHorizontal: 15
  },

  sectionPhoto: {
    justifyContent: "center"
  },

  title: {
    marginTop: 30,
    marginBottom: 8
  },

  textInput: {
    borderWidth: 0.5,
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderColor: "#f1f1f1",
    backgroundColor: "white",
    borderRadius: 5,
    fontFamily: "Karla-Regular",
    color: Colors.darkGrey,
    fontSize: 15
  },

  textInputDesc: {
    borderWidth: 0.5,
    width: "100%",
    height: 100,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderColor: "#f1f1f1",
    backgroundColor: "white",
    borderRadius: 5,
    fontFamily: "Karla-Regular",
    color: Colors.darkGrey,
    fontSize: 15
  },

  numberInput: {
    borderWidth: 0.5,
    width: 80,
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderColor: "#f1f1f1",
    backgroundColor: "white",
    borderRadius: 5,
    fontFamily: "Karla-Regular",
    textAlign: "right"
  },

  priceSection: {
    alignItems: "center",
    flexDirection: "row"
  },

  pricePerDay: {
    marginLeft: 10
  },

  buttonSection: {
    marginVertical: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AddBike;
