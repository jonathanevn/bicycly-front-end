import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
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
    }
  };
  state = {
    bikeBrand: "",
    bikeModel: "",
    condition: "",
    bikeCategory: "",
    description: "",
    photos: [],
    pricePerDay: ""
  };

  // handleChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      CateVelo: undefined,
      bikeCategory: [
        {
          label: "VTT",
          value: "VTT"
        },
        {
          label: "Vélo ville",
          value: "Vélo ville"
        },
        {
          label: "VTC",
          value: "VTC"
        },
        {
          label: "BMX",
          value: "BMX"
        },
        {
          label: "Tandem",
          value: "Tandem"
        },
        {
          label: "Course",
          value: "Course"
        },
        {
          label: "Hollandais",
          value: "Hollandais"
        },
        {
          label: "Electrique",
          value: "Electrique"
        },
        {
          label: "Fixie/SP",
          value: "Fixie/SP"
        },
        {
          label: "Cargo",
          value: "Cargo"
        },
        {
          label: "Enfants",
          value: "Enfants"
        },
        {
          label: "Autres",
          value: "Autres"
        }
      ],
      etatVelo: undefined,
      condition: [
        {
          label: "Neuf",
          value: "Neuf"
        },
        {
          label: "Bon",
          value: "Bon"
        },
        {
          label: "Moyen",
          value: "Moyen"
        },
        {
          label: "Fonctionne",
          value: "Fonctionne"
        }
      ]
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        CateVelo: "VTT",
        bikeCategory: this.state.bikeCategory.concat([
          { value: "VTT", label: "VTT" }
        ])
      });
    }, 1000);

    setTimeout(() => {
      this.setState({
        bikeCategory: this.state.bikeCategory.concat([
          { value: "VTT", label: "VTT" }
        ])
      });
    }, 2500);
  }

  onPress = () => {
    const {
      bikeBrand,
      bikeModel,
      condition,
      bikeCategory,
      description,
      photos,
      pricePerDay
    } = this.state;
    console.log("fais voir les states", this.state);
    axios
      .post("https://bicycly.herokuapp.com/api/bike/publish", {
        bikeBrand: bikeBrand,
        bikeModel: bikeModel,
        condition: condition,
        bikeCategory: bikeCategory,
        description: description,
        photos: photos,
        pricePerDay: pricePerDay
      })
      .then(response => {
        if (response.data.token) {
          AsyncStorage.multiSet([
            ["token", response.data.token],
            ["id", response.data._id]
          ]).then(() => {
            this.props.navigation.navigate("BikeDetails", {
              bikeId: response.data.id
            });
          });
        }
        this.props.navigation.navigate("BikeDetails");
      });
    console.log("fais voir les states 2", this.state);
  };

  render() {
    return (
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <View style={styles.sectionPhoto}>
              <UploadPhoto
              //  handleImagePick={}
              />
            </View>

            <Text>Mon Vélo</Text>
            <TextInput
              style={[styles.textInput, { borderTopWidth: 0.5 }]}
              style={[styles.textInput, { borderBottomWidth: 0 }]}
              placeholder="Marque"
              name="bikeBrand"
              // value={this.state.bikeBrand}
              onChangeText={value => {
                this.setState({ bikeBrand: value });
              }}
            />
            <TextInput
              style={[styles.textInput, { borderTopWidth: 0.5 }]}
              style={[styles.textInput, { borderBottomWidth: 0.5 }]}
              placeholder="Modèle"
              name="bikeModel"
              // value={this.state.bikeModel}
              onChangeText={value => {
                this.setState({ bikeModel: value });
              }}
            />
            <View style={styles.container}>
              <View style={{ paddingVertical: 5 }} />

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

              <View style={{ paddingVertical: 5 }} />

              <Text>Etat du vélo</Text>
              <RNPickerSelect
                placeholder={{
                  label: "Etat du vélo",
                  color: "black",
                  value: null,
                  color: "#9EA0A4"
                }}
                items={this.state.condition}
                onValueChange={value => {
                  this.setState({
                    etatVelo: value
                  });
                }}
                onUpArrow={() => {
                  this.inputRefs.picker.togglePicker();
                }}
                onDownArrow={() => {
                  this.inputRefs.company.focus();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.etatVelo}
                ref={el => {
                  this.inputRefs.picker2 = el;
                }}
                useNativeAndroidPickerStyle={false}
              />

              <View style={{ paddingVertical: 5 }} />
            </View>

            <Text>Accessoires</Text>
            <Accessories />
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
                // onChangeText={text => this.setState({ text })}
                // value={this.state.text}
              />
            </View>

            <View>
              <Text>Tarification</Text>
              <TextInput
                style={[styles.textInput, { borderTopWidth: 0.5 }]}
                style={[styles.textInput, { borderBottomWidth: 0 }]}
                placeholder="Prix par jour €"
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
    // flex: 1
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
