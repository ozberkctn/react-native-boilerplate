/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import { Sentry } from "react-native-sentry";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";
import Router from "./router/router";
import OneSignal from "react-native-onesignal";
import SplashScreen from "react-native-splash-screen";

export const store = configureStore();

const sentryDsn = Platform.select({
  ios:
    "https://fe4d1f5f23eb43b3a615f862bd9ddd46:04b9125b78cc4811856b806cca9bcb72@sentry.io/302103",
  android:
    "https://fe4d1f5f23eb43b3a615f862bd9ddd46:04b9125b78cc4811856b806cca9bcb72@sentry.io/302103"
});
Sentry.config(sentryDsn).install();

export const Tracker = new GoogleAnalyticsTracker("UA-41790788-3");

type Props = {};
export default class App extends Component<Props> {
  componentWillMount() {
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }

  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Router />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
