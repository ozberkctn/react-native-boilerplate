/**
 * @flow
 */

import React from "react";
import { Platform, ScrollView, StatusBar, Text } from "react-native";
import {
  StackNavigator,
  createDrawerNavigator,
  SafeAreaView,
  DrawerNavigator
} from "react-navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Button from "apsl-react-native-button";
import SideMenu from "../components/SideMenu";
import Icon from "react-native-vector-icons/FontAwesome";

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text>{banner}</Text>
      <Button
        style={{ backgroundColor: "red" }}
        textStyle={{ fontSize: 18 }}
        onPress={() => navigation.navigate("DrawerOpen")}
      >
        Open drawer
      </Button>
      <Button onPress={() => navigation.navigate("Email")}>
        Open other screen
      </Button>
      <Button onPress={() => navigation.goBack(null)}>Go back</Button>
    </SafeAreaView>
    <StatusBar barStyle="default" />
  </ScrollView>
);

const InboxScreen = ({ navigation }) => (
  <MyNavScreen banner={"Inbox Screen"} navigation={navigation} />
);
InboxScreen.navigationOptions = {
  headerTitle: "Inbox"
};

const EmailScreen = ({ navigation }) => (
  <MyNavScreen banner={"Email Screen"} navigation={navigation} />
);

const DraftsScreen = ({ navigation }) => (
  <MyNavScreen banner={"Drafts Screen"} navigation={navigation} />
);
DraftsScreen.navigationOptions = {
  headerTitle: "Drafts"
};

const InboxStack = StackNavigator({
  Inbox: { screen: InboxScreen },
  Email: { screen: EmailScreen }
});

InboxStack.navigationOptions = {
  drawerLabel: "Inbox",
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons
      name="move-to-inbox"
      size={24}
      style={{ color: tintColor }}
    />
  )
};

const DraftsStack = StackNavigator({
  Drafts: { screen: DraftsScreen },
  Email: { screen: EmailScreen }
});

DraftsStack.navigationOptions = {
  drawerLabel: "Drafts",
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  )
};

const DrawerExample = DrawerNavigator(
  {
    Inbox: {
      path: "/",
      screen: InboxStack
    },
    Drafts: {
      path: "/sent",
      screen: DraftsStack
    }
  },
  {
    contentComponent: SideMenu,
    drawerWidth: 300
  }
);

export default DrawerExample;
