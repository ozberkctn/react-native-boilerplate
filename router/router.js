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
  Image,
  TouchableOpacity,
  View
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
import HomePage from "../screens/HomePage";
import LoginScreen from "../screens/LoginScreen";
import RealEstates from "../screens/RealEstates";
import EstateDetail from "../screens/EstateDetail";
import PersonalDetails from "../screens/PersonalDetails";
import HirePaymentInformation from "../screens/HirePaymentInformation";
import AggrementsDetail from "../screens/AggrementsDetail";
import EstatesForSale from "../screens/EstatesForSale";
import Reports from "../screens/Reports";
import TransactionsReport from "../screens/TransactionsReport";
import AggrementsMenu from "../screens/AggrementsMenu";
import Aggrements from "../screens/Aggrements";
import VadesiYaklasanlar from "../screens/VadesiYaklasanlar";
import EstateProperties from "../screens/EstateProperties";
import Sikayetler from "../screens/Sikayetler";
import ContactUs from "../screens/ContactUs";
import TaxCalculate from "../screens/TaxCalculate";
import OfferDetail from "../screens/OfferDetail";
import ForgotPassword from "../screens/ForgotPassword";
import Borclar from "../screens/Borclar";

const DrawerMenuButton = props => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <TouchableOpacity
        onPress={() => Actions.drawerOpen()}
        style={{
          marginLeft: 5,
          paddingLeft: 10,
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        <Image resizeMode="center" source={require("../images/menu.png")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Actions.pop()} style={{ padding: 10 }}>
        <Image
          style={{ width: 20, height: 20 }}
          resizeMode="contain"
          source={require("../images/tale_back.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const App = () => (
  <Router>
    <Stack
      key="root"
      navigationBarStyle={{ backgroundColor: colors.primary }}
      titleStyle={{ color: "white", alignSelf: "center" }}
    >
      <Drawer
        hideNavBar
        key="drawer"
        contentComponent={DrawerContent}
        drawerIcon={() => (
          <Image resizeMode="center" source={require("../images/menu.png")} />
        )}
        drawerWidth={300}
      >
        {/*
                Wrapper Scene needed to fix a bug where the tabs would
                reload as a modal ontop of itself
              */}
        <Scene hideNavBar panHandlers={null}>
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
            <Scene
              panHandlers={null}
              hideNavBar
              key="Login"
              component={LoginScreen}
              title="Üye Girişi"
            />
            <Scene key="HomePage" component={HomePage} title="Anasayfa" />
            <Scene
              key="RealEstates"
              component={RealEstates}
              title="Gayrimenkuller"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="Borclar"
              component={Borclar}
              title="Borçlar"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="EstateDetail"
              component={EstateDetail}
              title="Gayrimenkul Detay"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="PersonalDetails"
              component={PersonalDetails}
              title="Kişisel Bilgiler"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="HirePaymentInformation"
              component={HirePaymentInformation}
              title="Kira Ödeme Bilgileri"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="AggrementsDetail"
              component={AggrementsDetail}
              title="Kiracı Sözleşme Detay"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="EstatesForSale"
              component={EstatesForSale}
              title="Satılık Gayrimenkuller"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="Reports"
              component={Reports}
              title="Raporlar"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="TransactionsReport"
              component={TransactionsReport}
              title="Para Hareketleri"
              renderLeftButton={<DrawerMenuButton />}
              // back
              // backButtonTintColor={colors.white}
            />
            <Scene
              key="AggrementsMenu"
              component={AggrementsMenu}
              title="Sözleşmeler"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="Aggrements"
              component={Aggrements}
              title="Sözleşmeler"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="VadesiYaklasanlar"
              component={VadesiYaklasanlar}
              title="Vadesi Yaklaşan Sözleşmeler"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="EstateProperties"
              component={EstateProperties}
              title="Daire Özellikleri"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="Sikayetler"
              component={Sikayetler}
              title="Tadilat - Tamirat"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="Contact"
              component={ContactUs}
              title="İletişim"
              renderLeftButton={<DrawerMenuButton />}
            />

            <Scene
              key="TaxCalculate"
              component={TaxCalculate}
              title="Vergi Hesapla"
              renderLeftButton={<DrawerMenuButton />}
            />
            <Scene
              key="OfferDetail"
              component={OfferDetail}
              title="Teklif Detayları"
              renderLeftButton={<DrawerMenuButton />}
            />
          </Stack>
        </Scene>
      </Drawer>
      <Scene
        key="SingleContact"
        component={ContactUs}
        title="İletişim"
        back
        backButtonTintColor={colors.white}
      />
      <Scene
        key="ForgotPassword"
        component={ForgotPassword}
        title="Şifremi Unuttum"
        back
        backButtonTintColor={colors.white}
      />
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
