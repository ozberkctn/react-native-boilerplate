import React, { PureComponent } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { colors } from "../../KiraApp/common/variables";
class SalesItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item } = this.props;

    return (
      <View>
        <View
          style={{
            height: 45,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: colors.seperatorColor,
            alignItems: "center"
          }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                textAlign: "center",
                fontFamily: "Roboto-Regular"
              }}
            >
              {item._ozellikler.kapino}
            </Text>
          </View>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                textAlign: "center",
                fontFamily: "Roboto-Regular"
              }}
            >
              {item._ozellikler.kat}
            </Text>
          </View>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              {item._ozellikler.oda_sayisi}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default SalesItem;
