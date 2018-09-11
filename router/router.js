/**
 * @flow
 */

import React from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  Image
} from "react-native";
import {
  Scene,
  Router,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
  Actions
} from "react-native-router-flux";
import DrawerContent from "../screens/DrawerContent";
import { Icon } from "react-native-elements";
import TabView from "../screens/TabView";
import { colors } from "../common/variables";

const App = () => (
  <Router>
    <Stack key="root">
      <Drawer
        hideNavBar
        key="drawer"
        contentComponent={DrawerContent}
        drawerIcon={() => <Image source={require("../images/menu.png")} />}
        drawerWidth={300}
      >
        {/*
                Wrapper Scene needed to fix a bug where the tabs would
                reload as a modal ontop of itself
              */}
        <Scene hideNavBar panHandlers={null}>
          <Tabs
            key="tabbar"
            routeName="tabbar"
            backToInitial
            swipeEnabled
            showLabel={false}
            tabBarStyle={styles.tabBarStyle}
            activeBackgroundColor={colors.secondary}
            inactiveBackgroundColor={colors.primary}
          >
            <Stack
              key="tab_1"
              title="Tab #1"
              tabBarLabel="TAB #1"
              inactiveBackgroundColor="#FFF"
              activeBackgroundColor="#DDD"
              icon={() => <Image source={require("../images/Tab1.png")} />}
              navigationBarStyle={{ backgroundColor: colors.primary }}
              titleStyle={{ color: "white", alignSelf: "center" }}
              initial
            >
              <Scene key="tab_1_1" component={TabView} title="Tab #1_1" />

              <Scene
                key="tab_1_2"
                component={TabView}
                title="Tab #1_2"
                titleStyle={{ color: "black", alignSelf: "center" }}
              />
            </Stack>

            <Stack
              key="tab_2"
              title="Tab #2"
              icon={() => <Image source={require("../images/Tab2.png")} />}
              navigationBarStyle={{ backgroundColor: colors.primary }}
            >
              <Scene key="tab_2_1" component={TabView} title="Tab #2_1" />
              <Scene key="tab_2_2" component={TabView} title="Tab #2_2" />
            </Stack>

            <Stack
              key="tab_3"
              icon={() => <Image source={require("../images/Tab3.png")} />}
              title="Tab #3"
              navigationBarStyle={{ backgroundColor: colors.primary }}
            >
              <Scene key="tab_3_1" component={TabView} />
            </Stack>
            <Scene
              key="tab_4_1"
              component={TabView}
              title="Tab #4"
              icon={() => <Image source={require("../images/Tab4.png")} />}
            />
            <Stack
              key="tab_5"
              icon={() => <Image source={require("../images/Tab5.png")} />}
              title="Tab #5"
              navigationBarStyle={{ backgroundColor: colors.primary }}
            >
              <Scene key="tab_5_1" component={TabView} />
            </Stack>
          </Tabs>
        </Scene>
      </Drawer>
    </Stack>
  </Router>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  tabBarStyle: {
    backgroundColor: "#eee"
  },
  tabBarSelectedItemStyle: {
    backgroundColor: "#ddd"
  }
});

export default App;
