import { AppRegistry } from "react-native";
import App from "./App";
import codePush from "react-native-code-push";

if (__DEV__) {
  // Pretty-prints ImmutableJS data structures in the chrome console

  // Disable spammy error messages when you're developing on a device
  // and the computer's clock is out of sync.
  // https://github.com/facebook/react-native/issues/1598
  const installDevTools = require("immutable-devtools");
  const Immutable = require("immutable");
  installDevTools(Immutable);
  console.ignoredYellowBox = ["jsSchedulingOverhead"];

  // Keep a reference to React handy in the console to experiment with
  // component APIs.
  window.React = require("react-native");
  window.Lodash = require("lodash");
}

AppRegistry.registerComponent("Boilerplate", () => codePush({})(App));
