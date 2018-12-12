import React from "react";
import { Button, Image, View } from "react-native";
import { ImagePicker, Permissions } from "expo";

export default class UploadPhoto extends React.Component {
  state = {
    image: null
  };

  render() {
    let { image } = this.state;

    return (
      <View>
        <Button title="Ajouter une photo" onPress={this.useLibraryHandler} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    );
  }
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    this.setState({ image: result.uri });
    // Pour le formulaire: this.props.handleImagePick(result.uri)
  };
}
