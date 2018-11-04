import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
  AsyncStorage
} from "react-native";
import { colors } from "../common/variables";
import { Actions } from "react-native-router-flux";
import {
  responsiveFontSize,
  responsiveHeight
} from "react-native-responsive-dimensions";

const menus = [
  {
    name: "Ana Sayfa",
    iconPath: require("../images/white_home.png"),
    screenPath: "HomePage"
  },
  {
    name: "Gayrimenkullerim",
    iconPath: require("../images/white_real_estates.png"),
    screenPath: "RealEstates"
  },
  {
    name: "Sözleşmeler",
    iconPath: require("../images/drawer_aggrements_icon.png"),
    screenPath: "AggrementsMenu"
  },
  {
    name: "Para Hareketleri",
    iconPath: require("../images/drawer_para_hareketleri_icon.png"),
    screenPath: "TransactionsReport"
  },

  {
    name: "Vergi Hesaplama",
    iconPath: require("../images/drawer_vergi_hesaplama_icon.png"),
    screenPath: "TaxCalculate"
  },
  {
    name: "Satışlar",
    iconPath: require("../images/white_para_hareketleri.png"),
    screenPath: "EstatesForSale"
  },
  {
    name: "Tadilat- Tamirat",
    iconPath: require("../images/drawer_sikayetler_icon.png"),
    screenPath: "Sikayetler"
  },
  {
    name: "İletişim",
    iconPath: require("../images/drawer_contact_icon.png"),
    screenPath: "Contact"
  }
];
class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      user: { name, last_name, email }
    } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={require("../images/userpic.png")} />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: "white", fontSize: responsiveFontSize(2.2) }}>
              {name} {last_name}
            </Text>
            <Text style={{ color: "white", fontSize: responsiveFontSize(1.8) }}>
              {email}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: 1,
            marginLeft: 10,
            marginTop: responsiveHeight(3),
            opacity: 0.3
          }}
        />
        {menus.map(menu => {
          return (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => {
                Actions[menu.screenPath].call();
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: responsiveHeight(2)
                  }}
                >
                  <View style={{ width: 50, alignItems: "center" }}>
                    <Image source={menu.iconPath} />
                  </View>
                  <Text
                    style={{
                      color: "white",
                      marginLeft: 20,
                      fontSize: responsiveFontSize(2)
                    }}
                  >
                    {menu.name}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "white",
                    marginTop: responsiveHeight(2),
                    height: 1,
                    marginLeft: 10,
                    opacity: 0.3
                  }}
                />
              </View>
            </TouchableHighlight>
          );
        })}
        <TouchableHighlight
          style={{
            bottom: 0,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 10
          }}
          underlayColor="transparent"
          onPress={async () => {
            await AsyncStorage.setItem("username", "");
            await AsyncStorage.setItem("password", "");
            Actions.Login();
          }}
        >
          <Image source={require("../images/logout.png")} />
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingLeft: responsiveHeight(2),
    paddingTop: responsiveHeight(4),
    paddingRight: 0
  }
});

function mapStateToProps(state) {
  return { user: state.api.user };
}

export default connect(mapStateToProps)(DrawerContent);
