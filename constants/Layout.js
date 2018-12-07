import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

module.exports = {
  width,
  height,
  isSmallDevice: width < 375
};
