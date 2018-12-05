/* import React from "react";
import { StyleSheet, Text, Image } from "react-native";
import { Svg, Path } from "expo";
const json = require("../assets/images/cyclist.svg.json");

class CyclistIcon extends React.Component {
  render() {
    return (
      <Svg height={20} width={20} fadeDuration={0}>
        <Path d={json["path"]} />
      </Svg>
    );
  }
}

/* const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  }
}); */

/* export default CyclistIcon;
 */

import React from "react";
import { Image, StyleSheet } from "react-native";

class CyclistIcon extends React.Component {
  render() {
    return (
      <Image
        fadeDuration={0}
        style={styles.icon}
        source={require("../assets/images/cyclist.png")}
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 21
  }
});

export default CyclistIcon;
