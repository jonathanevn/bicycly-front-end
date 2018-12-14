import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import { button, text, avatar } from "../constants/Styles";
import { width, height } from "../constants/Layout";
import UploadPhoto from "../components/UploadPhoto";
import { TextInput, ScrollView } from "react-native-gesture-handler";

class MyAccountInfo extends React.Component {
  static navigationOptions = {
    title: "Mes informations",
    headerLeftBackTitle: null,
    headerTintColor: "black",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 18,
      color: "#262626"
    }

    // headerStyle: {
    //   backgroundColor: "#f8f8f8",
    //   borderBottomColor: "#f8f8f8"
    // }
  };

  state = {
    photos: [],
    email: this.props.navigation.state.params.email,
    phone: this.props.navigation.state.params.account.phone
  };

  handleImagePick = photoBase64 => {
    const updatedPhotos = [...this.state.photos];
    updatedPhotos.push(photoBase64);
    this.setState({
      photos: updatedPhotos
    });
  };

  renderImage() {
    console.log("ici", this.props.navigation.state.params);
    if (this.props.navigation.state.params.account.photos[0]) {
      //   console.log(this.props.navigation.state.params.account.photos);
      return (
        <View>
          <Image
            onPress={() => {
              const updatedPhotos = [...this.state.photos];
              updatedPhotos.splice(0, 1);
              this.setState({ photos: updatedPhotos });
            }}
            style={[avatar.medium, (backgroundColor = "red")]}
            source={{
              uri: this.props.navigation.state.params.account.photos[0]
                .secure_url
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.image}>
          <UploadPhoto
            size={avatar.medium}
            handleImagePick={this.handleImagePick}
            photos={this.state.photos}
          />
        </View>
      );
    }
  }

  onPress = () => {
    const { params } = this.props.navigation.state;
    console.log("Mes params", params);
    axios
      .post(
        "http://localhost:3100/api/user/update",

        {
          email: this.state.email,
          phone: this.state.phone,
          photos: this.state.photos
        },
        {
          headers: {
            Authorization: "Bearer " + params.token
          }
        }
      )
      .then(response => {
        console.log(response.data);
        this.props.navigation.navigate("AccountScreen");
      })
      .catch(err => console.log("wtf", err));
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.image}>{this.renderImage()}</View>
            <TextInput
              style={[styles.textInput, text.p2, { borderBottomWidth: 0 }]}
              value={this.props.navigation.state.params.firstName}
            />
            <TextInput
              style={[styles.textInput, text.p2, { marginBottom: 20 }]}
              value={this.props.navigation.state.params.lastName}
            />
            <TextInput
              style={[styles.textInput, text.p2, { marginBottom: 20 }]}
              value={this.state.email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={value => {
                this.setState({ email: value });
              }}
            />
            <TextInput
              style={[styles.textInput, text.p2, { marginBottom: 20 }]}
              placeholder="Téléphone"
              keyboardType="number-pad"
              value={this.state.phone}
              onChangeText={value => {
                this.setState({ phone: value });
              }}
            />
            <TouchableOpacity
              style={[styles.textInput, { marginBottom: 50 }]}
              onPress={() => {
                this.props.navigation.navigate("MyBikes");
              }}
            >
              <Text style={[text.p2]}>Voir mes vélos</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={text.p2} onPress={this.onPress}>
                Enregistrer les modifications
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#f8f8f8",
    width: width,
    height: height
  },
  image: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    borderWidth: 1,
    width: width,
    height: 50,
    paddingLeft: 15,
    justifyContent: "center",
    borderColor: "#f1f1f1",
    backgroundColor: "#FFFFFF"
  }
});

export default MyAccountInfo;
