import React, { PureComponent } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import CardView from "react-native-cardview";
import { colors } from "../common/variables";
import moment from "moment";
import { sikayetTipleri, currency } from "../common/constants";
class SikayetListesiItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      item: {
        tipi,
        proje: { info },
        kiraci: { first_name, last_name },
        sikayet,
        tarih,
        durum,
        tutar,
        parabirimi,
        aciklama,
        foto,
        portfoyno: {
          _ozellikler: { kapino }
        }
      }
    } = this.props;

    const createdDay = moment(tarih, "YYYY-MM-DD").format("DD");
    const createdMonthAndYear = moment(tarih, "YYYY-MM-DD").format("MMM YYYY");

    // const aciklamaArray = aciklama.split("|");
    // const address = aciklamaArray[2].trim();
    // const daire = aciklamaArray[3].split(" ")[1];
    // const name = aciklamaArray[1].trim();

    return (
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.seperatorColor
        }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text
            style={{
              fontSize: 24,
              color: colors.primary,
              fontFamily: "Roboto-Regular"
            }}
          >
            {createdDay}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: colors.primary,
              fontFamily: "Roboto-Regular"
            }}
          >
            {createdMonthAndYear}
          </Text>
        </View>
        <View style={{ marginLeft: 10, flex: 3 }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              color: colors.brown,
              textAlign: "left",
              fontFamily: "Roboto-Regular"
            }}
          >
            <Text style={{ color: colors.primary }}>Tipi: </Text>
            {sikayetTipleri[tipi]}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              color: colors.brown,
              textAlign: "left",
              fontFamily: "Roboto-Regular"
            }}
          >
            <Text style={{ color: colors.primary }}>Kiracı :</Text> {first_name}{" "}
            {last_name}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              color: colors.brown,
              fontFamily: "Roboto-Regular"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.primary,
                fontFamily: "Roboto-Regular"
              }}
            >
              Şikayet:
            </Text>{" "}
            {sikayet}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 10,
            flex: 1.3,
            justifyContent: "space-between"
          }}
        >
          <View />
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: colors.primary,
              fontFamily: "Roboto-Regular"
            }}
          >
            {Number(tutar).toLocaleString("it-IT", {
              style: "currency",
              currency: "TRY",
              minimumFractionDigits: 2
            })}
          </Text>
          {foto ? (
            <TouchableHighlight
              onPress={() => this.props.onPressImage(foto)}
              underlayColor="transparent"
            >
              <Image
                resizeMode="contain"
                style={{ width: 30, height: 30, alignSelf: "center" }}
                source={require("../images/gallery.png")}
              />
            </TouchableHighlight>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}

export default SikayetListesiItem;
