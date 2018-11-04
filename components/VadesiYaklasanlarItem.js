import React, { PureComponent } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import CardView from "react-native-cardview";
import { colors } from "../common/variables";
import moment from "moment";
import { currency } from "../common/constants";
class VadesiYaklasanlarItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      item: { tarih, tutar, tur, aciklama, parabirimi }
    } = this.props;
    const createdDay = moment(tarih, "YYYY-MM-DD").format("DD");
    const createdMonthAndYear = moment(tarih, "YYYY-MM-DD").format("MMM YYYY");

    const aciklamaArray = aciklama.split("|");
    const address =
      aciklamaArray[2].trim() + " " + aciklamaArray[3].trim().split(" ")[0];
    const daire = aciklamaArray[3].split(" ")[1];
    const name = aciklamaArray[1].trim();

    return (
      <View
        style={{
          backgroundColor: colors.bgColor,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.seperatorColor
        }}
      >
        <View style={{ alignItems: "center", flex: 1 }}>
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
              fontSize: 18,
              color: colors.primary,
              fontFamily: "Roboto-Regular"
            }}
          >
            {tur}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.brown,
              textAlign: "left",
              fontFamily: "Roboto-Regular"
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.brown,
              fontFamily: "Roboto-Regular"
            }}
          >
            {address}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 10,
            flex: 1.3,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
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
        </View>
      </View>
    );
  }
}

export default VadesiYaklasanlarItem;
