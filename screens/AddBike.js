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
    switchValue: true
  };

  _handleToggleSwitch = () =>
    this.setState(state => ({
      switchValue: !state.switchValue
    }));
  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      CateVelo: undefined,
      items: [
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
      etatVelo: undefined,
      items2: [
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
        CateVelo: "VTT"
      });
    }, 1000);

    setTimeout(() => {
      this.setState({
        items: this.state.items.concat([{ value: "VTT", label: "VTT" }])
      });
    }, 2500);
  }

  render() {
    return (
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <View>
              <UploadPhoto
              // handleImagePick={}
              />
            </View>

            <Text>Mon Vélo</Text>
            <TextInput
              style={[styles.textInput, { borderTopWidth: 0.5 }]}
              style={[styles.textInput, { borderBottomWidth: 0 }]}
              placeholder="Marque"
            />
            <TextInput
              style={[styles.textInput, { borderTopWidth: 0.5 }]}
              style={[styles.textInput, { borderBottomWidth: 0.5 }]}
              placeholder="Modèle"
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
                items={this.state.items}
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
                items={this.state.items2}
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
            <View>
              <Text>Description</Text>
              <TextInput
                style={[styles.textInput, { borderTopWidth: 0.5 }]}
                style={[styles.textInput, { borderBottomWidth: 0.5 }]}
                multiline={true}
                numberOfLines={4}
                placeholder="Dites pourquoi votre vélo est le plus beau des vélos!"
                // onChangeText={text => this.setState({ text })}
                // value={this.state.text}
              />
            </View>
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={button.primary}
                onPress={() => {
                  this.props.navigation.navigate("BikeDetails");
                }}
              >
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
    // paddingBottom: 12,
    borderWidth: 0.5,
    width: 350,
    height: 50,
    borderColor: "#f1f1f1",
    // borderRadius: 4,
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
  containerCheckBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff"
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
    width: width,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AddBike;
