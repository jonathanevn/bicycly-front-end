import React from "react";
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import { button, text } from "../constants/Styles";
export default class UploadPhoto extends React.Component {
  render() {
    const { photos } = this.props;

    return (
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={button.secondary}
          onPress={this.useLibraryHandler}
        >
          <Text>Ajouter une photo</Text>
        </TouchableOpacity>
        {/* {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
        <View>
          {photos.map(imageBase64 => {
            console.log("​UploadPhoto -> render -> imageBase64", imageBase64);
            return (
              //
              <Image
                source={{ uri: "data:image/jpeg;base64," + imageBase64 }}
                style={{ width: 200, height: 200 }}
              />
            );
          })}
        </View>
      </View>
    );
  }
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0
    });
    this.props.handleImagePick(result.base64);

    // Pour le formulaire: this.props.handleImagePick(result.uri)
  };
}
const styles = StyleSheet.create({
  buttonSection: {
    justifyContent: "center",
    marginVertical: 20,

    alignItems: "center"
  }
});
