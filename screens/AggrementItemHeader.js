import React, { PureComponent } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { colors } from "../common/variables";
class AggrementItemHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          height: 45,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: colors.seperatorColor,
          alignItems: "center",
          backgroundColor: "white",
          paddingLeft: 20
        }}
      >
        <View style={{ flex: 2, flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 14,
              fontFamily: "Roboto-Medium"
            }}
          >
            Adres
          </Text>
          <Image
            resizeMode="center"
            source={require("../images/blue_down_arrow.png")}
            style={{
              paddingRight: 25,
              opacity: 0.5
            }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 14,
              fontFamily: "Roboto-Medium"
            }}
          >
            Kiracı
          </Text>
          <Image
            resizeMode="center"
            source={require("../images/blue_down_arrow.png")}
            style={{
              paddingRight: 25,
              opacity: 0.5
            }}
          />
        </View>
      </View>
    );
  }
}

export default AggrementItemHeader;
