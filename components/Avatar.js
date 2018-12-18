import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { button, text, avatar } from "../constants/Styles";
import { width, height } from "../constants/Layout";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

class Avatar extends React.Component {
  renderImage() {
    if (this.props.photos) {
      return (
        <View>
          <Image
            style={[avatar.medium]}
            source={{
              uri: this.props.photos.secure_url
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.image}>
          <Icon name="cyclist" size={45} color="#ffc200" />
        </View>
      );
    }
  }

  render() {
    return <View style={styles.container}>{this.renderImage()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Avatar;
