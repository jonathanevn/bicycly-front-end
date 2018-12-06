import React from "react";
import { Font } from "expo";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";

import Colors from "../constants/Colors";
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={this.props.size}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    );
  }
}
