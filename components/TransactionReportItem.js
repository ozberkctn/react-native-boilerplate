import React, { PureComponent } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import CardView from "react-native-cardview";
import { colors } from "../common/variables";
import moment from "moment";
import { currency } from "../common/constants";
class TransactionReportItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("Transaction Report Item");
    const {
      item: {
        tarih,
        updated,
        tur,
        tutar,
        dekont,
        aciklama,
        tahsilatsekli,
        parabirimi
      }
    } = this.props;
    const arr = aciklama.split("|");
    if (!arr[1]) {
    }
    if (!arr[2]) {
    }
    if (!arr[3]) {
    }
    let name,
      address,
      daire = "";

    if (arr[1]) name = arr[1].trim();
    if (arr[2]) address = arr[2].trim();
    if (arr[3]) daire = arr[3].trim().split(" ")[0];

    const updatedDate = moment(updated, "YYYY-MM-DD").format("DD MMM YY");
    const createdDay = moment(tarih, "YYYY-MM-DD").format("DD");
    const createdMonthAndYear = moment(tarih, "YYYY-MM-DD").format("MMM YYYY");

    return (
      <View
        style={{
          backgroundColor: colors.bgColor,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 10
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
            {address} {daire}
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
          <Text
            style={{
              fontSize: 14,
              color: colors.brown,
              fontFamily: "Roboto-Regular"
            }}
          >
            {tahsilatsekli}
          </Text>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              this.props.receiptPress(dekont);
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                style={{ width: 20, height: 20, marginTop: 5 }}
                source={require("../images/receipt.png")}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default TransactionReportItem;
