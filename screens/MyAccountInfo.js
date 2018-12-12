import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from "react-native";

import { button, text, avatar } from "../constants/Styles";
import { width, height } from "../constants/Layout";
import UploadPhoto from "../components/UploadPhoto";
import { TextInput } from "react-native-gesture-handler";

class MyAccountInfo extends React.Component {
  static navigationOptions = {
    title: "Mes informations",
    headerBackTitle: null,
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
    phone: ""
  };

  renderImage() {
    if (this.props.navigation.state.params.account.profilePicture[0]) {
      console.log(this.props.navigation.state.params.account.profilePicture);
      return (
        <View>
          <Image
            style={[avatar.medium, (backgroundColor = "red")]}
            source={{
              uri: this.props.navigation.state.params.account.profilePicture[0]
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.image}>
          {/* <Text>Coucou</Text> */}
          <UploadPhoto size={avatar.medium} />
        </View>
      );
      console.log("hello");
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={styles.image}>
            {this.renderImage()}
            {/* {this.props.navigation.state.params.account.profilPicture[0]}
            <UploadPhoto size={avatar.medium} /> */}
          </View>
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
            value={this.props.navigation.state.params.email}
            // onChangeText={value => {
            //     this.setState({ email: value });
            // }}
          />
          <TextInput
            style={[styles.textInput, text.p2, { marginBottom: 20 }]}
            placeholder="Téléphone"
            keyboardType="number-pad"
            value={this.props.navigation.state.params.phone}
            onChangeText={value => {
              this.setState({ phone: value });
            }}
          />
          <TouchableOpacity
            style={[styles.textInput, { marginBottom: 20 }]}
            onPress={() => {
              this.props.navigation.navigate("MyBikes");
            }}
          >
            <Text style={[text.p2]}>Voir mes vélos</Text>
          </TouchableOpacity>
        </View>
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
