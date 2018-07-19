import _EventEmitter from "EventEmitter";
import { Dimensions } from "react-native";

export const EventEmitter = new _EventEmitter();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export function getPxForWidth(dp) {
  return (dp / 640) * screenWidth;
}

export function getPxForHeight(dp) {
  const height = screenHeight === 812 ? 736 : screenHeight;
  return (dp / 1136) * height;
}
