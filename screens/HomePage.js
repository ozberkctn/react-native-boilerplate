import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from "react-native";
import CardView from "react-native-cardview";
import { colors } from "../common/variables";
import { Actions } from "react-native-router-flux";
import PieChart from "../components/PieChart";
import { getCharts } from "../redux/actions/apiActions";
import isEmpty from "lodash/isEmpty";
import Carousel from "react-native-carousel";
import { currency } from "../common/constants";
const screenWidth = Dimensions.get("window").width;

const leftMenus = [
  {
    name: "Gayrimenkullerim",
    iconPath: require("../images/gayrimenkullerim_icon.png"),
    screenPath: "RealEstates"
  },
  {
    name: "Para Hareketleri",
    iconPath: require("../images/para_hareketleri_icon.png"),
    screenPath: "TransactionsReport"
  },
  {
    name: "Borçlar",
    iconPath: require("../images/borclar_icon.png"),
    screenPath: "Borclar"
  },
  {
    name: "Tadilat- Tamirat",
    iconPath: require("../images/tadilat_tamirat_icon.png"),
    screenPath: "Sikayetler"
  }
];

const rightMenus = [
  {
    name: "Sözleşmeler",
    iconPath: require("../images/sozlesmeler_icon.png"),
    screenPath: "AggrementsMenu"
  },

  {
    name: "Vergi Hesaplama",
    iconPath: require("../images/vergi_hesaplama_icon.png"),
    screenPath: "TaxCalculate"
  },
  {
    name: "Satışlar",
    iconPath: require("../images/satislar_icon.png"),
    screenPath: "EstatesForSale"
  },
  {
    name: "İletişim",
    iconPath: require("../images/iletisim_icon.png"),
    screenPath: "Contact"
  }
];

class HomePage extends Component {
  componentDidMount() {
    const { token, charts } = this.props;
    this.props.getCharts(token);
  }

  calculateParaGirisCikis(paraArr) {
    let totalParaGiris = 0;
    let totalParaCikis = 0;
    paraArr.map(value => {
      if (value.giris != undefined && value.giris != null) {
        totalParaGiris += Number(value.giris);
      }
      if (value.cikis != undefined && value.cikis != null) {
        totalParaCikis += Number(value.cikis);
      }
    });

    const percentage =
      totalParaGiris == 0
        ? 0
        : ((totalParaGiris + totalParaCikis) / totalParaGiris) * 100;
    return percentage;
  }

  calculateTotalDepozito(depozitoArr) {
    let totalDepozito = 0;
    depozitoArr.map(value => {
      if (value.toplam != undefined && value.toplam != null) {
        totalDepozito += Number(value.toplam);
      }
    });
    return `${totalDepozito}`;
  }
  render() {
    const { charts } = this.props;
    const paraGirisCikis = this.calculateParaGirisCikis(
      charts.para_giris_cikis
    );

    return (
      <ScrollView style={styles.container}>
        <View style={{ backgroundColor: "white", height: 395 }}>
          <Carousel
            width={screenWidth}
            animate={false}
            indicatorColor="#00BFFF"
            indicatorSize={40}
            indicatorAtBottom={false}
            indicatorOffset={350}
          >
            <View
              style={{
                width: screenWidth,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  marginTop: 10,
                  fontSize: 18,
                  fontFamily: "Roboto-Medium"
                }}
              >
                Gayrimenkul Doluluk Oranı
              </Text>
              <Image
                resizeMode="contain"
                style={{ height: 300, marginTop: 20 }}
                source={require("../images/gayrimenkul_sayisi_grafik.png")}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 73,
                  right: 124,
                  fontSize: 26,
                  fontFamily: "Roboto-Bold"
                }}
              >
                {charts.gayrimenkul_doluluk}
              </Text>
            </View>
            <View
              style={{
                width: screenWidth,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  marginTop: 10,
                  fontSize: 18,
                  fontFamily: "Roboto-Medium"
                }}
              >
                Kira Ödeme Oranı
              </Text>
              <Image
                resizeMode="contain"
                style={{ height: 300, marginTop: 20 }}
                source={require("../images/kira_odeme_orani_chart.png")}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 75,
                  right: 192,
                  fontSize: 24,
                  fontFamily: "Roboto-Bold"
                }}
              >
                {charts.kira_yuzde}
              </Text>
            </View>
            <View style={styles.chartContainer}>
              {paraGirisCikis == 0 ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%"
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      marginTop: 10,
                      fontSize: 18,
                      fontFamily: "Roboto-Medium"
                    }}
                  >
                    Henüz Para Giriş Çıkış Bilgisi Yok
                  </Text>
                </View>
              ) : (
                <PieChart
                  onClickFilledArea={() => {
                    console.log("asdads");
                  }}
                  title="Para Giriş Çıkış"
                  percentage={100 - paraGirisCikis}
                />
              )}
            </View>
            <View style={styles.despositContainer}>
              <Image
                resizeMode="contain"
                style={{ height: 70 }}
                source={require("../images/deposit_icon.png")}
              />
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 24,
                  fontFamily: "Roboto-Medium",
                  color: colors.primary
                }}
              >
                Toplam Depozito
              </Text>
              <Text
                style={{
                  opacity: 0.88,
                  fontSize: 28,
                  fontFamily: "Roboto-Regular",
                  marginTop: 20
                }}
              >
                {this.calculateTotalDepozito(charts.toplam_depozito).replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  "."
                ) + currency[charts.toplam_depozito[0].parabirimi]}
              </Text>
            </View>
          </Carousel>
        </View>
        <View style={{ marginTop: 3, flexDirection: "row", marginBottom: 5 }}>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            {leftMenus.map(menu => {
              return (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => {
                    Actions[menu.screenPath].call();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                      paddingLeft: 10,
                      paddingBottom: 10,
                      height: 120
                    }}
                  >
                    <Image resizeMode="center" source={menu.iconPath} />
                    <Text
                      style={{
                        marginTop: 10,
                        color: colors.primary,
                        fontFamily: "Roboto-Medium"
                      }}
                    >
                      {menu.name}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
          <View style={{ flex: 1, paddingLeft: 8, paddingRight: 10 }}>
            {rightMenus.map(menu => {
              return (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => {
                    Actions[menu.screenPath].call();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                      padding: 10,
                      height: 120
                    }}
                  >
                    <Image resizeMode="center" source={menu.iconPath} />
                    <Text
                      style={{
                        marginTop: 10,
                        color: colors.primary,
                        fontFamily: "Roboto-Medium"
                      }}
                    >
                      {menu.name}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor
  },
  chartContainer: {
    width: screenWidth,
    backgroundColor: "white"
  },
  despositContainer: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(state) {
  return { charts: state.api.charts, token: state.api.token };
}

export default connect(
  mapStateToProps,
  { getCharts }
)(HomePage);
