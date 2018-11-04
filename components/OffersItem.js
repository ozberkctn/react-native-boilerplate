import React, { PureComponent } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { colors } from "../common/variables";
import { currency } from "../common/constants";
import moment from "moment";
import { Actions } from "react-native-router-flux";

class OffersItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item } = this.props;
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => {
          Actions.OfferDetail({ item });
        }}
      >
        <View
          style={{
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: colors.seperatorColor,
            alignItems: "center",
            flex: 1,
            minHeight: 45
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                textAlign: "center",
                fontFamily: "Roboto-Regular"
              }}
            >
              {item.portfoyno._ozellikler.kapino}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                textAlign: "center",
                fontFamily: "Roboto-Regular"
              }}
            >
              {Number(item.tutar).toLocaleString("it-IT", {
                style: "currency",
                currency: "TRY",
                minimumFractionDigits: 2
              })}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              {Number(item.diptutar).toLocaleString("it-IT", {
                style: "currency",
                currency: "TRY",
                minimumFractionDigits: 2
              })}
            </Text>
          </View>
          <Image
            resizeMode="center"
            source={require("../images/blue_down_arrow.png")}
            style={{
              position: "absolute",
              right: 0,
              transform: [{ rotate: "-90deg" }],
              paddingRight: 25
            }}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

export default OffersItem;
