import React, { PureComponent } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { colors } from "../common/variables";
class AggrementItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      item,
      onPress,
      item: {
        kiraci: { first_name, last_name },
        kira,
        info
      }
    } = this.props;

    const aciklamaArray = info.split("|");
    const address = aciklamaArray[2].trim();
    const daire = aciklamaArray[3].split(" ")[1];
    const name = aciklamaArray[1].trim();

    return (
      <TouchableHighlight
        style={{ backgroundColor: colors.bgColor, paddingLeft: 20 }}
        onPress={() => onPress(item)}
        underlayColor="transparent"
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: colors.seperatorColor,
            alignItems: "center"
          }}
        >
          <View style={{ justifyContent: "center", flex: 2, paddingRight: 10 }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular",
                paddingTop: 10,
                paddingBottom: 10
              }}
            >
              {address} {daire}
            </Text>
          </View>
          <View style={{ justifyContent: "center", flex: 1, paddingRight: 15 }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              {first_name} {last_name}
            </Text>
          </View>

          <Image
            resizeMode="center"
            source={require("../images/blue_down_arrow.png")}
            style={{
              position: "absolute",
              right: 0,
              transform: [{ rotate: "-90deg" }],
              paddingRight: 25,
              opacity: 0.5
            }}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

export default AggrementItem;
