import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

module.export = {
  width,
  height,
  isSmallDevice: width < 375
};
