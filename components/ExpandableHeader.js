import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../../KiraApp/common/variables";
import renderIf from "render-if";
const rotates = { up: "90" };
class ExpandableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { title, marginTop, hideArrow, rotate } = this.props;
    const showArrow = renderIf(!hideArrow);
    return (
      <View style={[styles.container, { marginTop: marginTop }]}>
        <Text style={styles.title}>{title}</Text>
        {showArrow(
          <Image
            resizeMode="center"
            source={require("../images/down_arrow.png")}
            style={{ transform: [{ rotate: rotate }] }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.secondary,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.seperatorColor
  },
  title: {
    flex: 1,
    color: colors.white,
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    marginRight: 10
  }
});

ExpandableHeader.defaultProps = {
  marginTop: 0,
  rotate: "0deg"
};

export default ExpandableHeader;
