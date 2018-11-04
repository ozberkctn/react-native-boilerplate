import React, { Component } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import styled from "styled-components";
import { colors } from "../common/variables";

const TriangleReverse = styled.View`
  border-top-width: 20;
  border-right-width: 0;
  border-bottom-width: 20;
  border-left-width: 20;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: ${colors.white};
  position: absolute;
  right: 50%;
  z-index: 99;
  transform: ${props => (props.reverse ? "" : "rotate(180deg)")};
`;

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { active: 0 };
  }
  render() {
    const { active } = this.state;
    const {
      tabOneTitle,
      tabTwoTitle,
      tabOneContent,
      tabSecondContent
    } = this.props;
    return (
      <View>
        <View style={styles.headerContainer}>
          {active === 0 ? (
            <View style={[styles.triangle]} />
          ) : (
            <TriangleReverse />
          )}

          <TouchableHighlight
            style={[
              styles.tab,
              {
                backgroundColor: active === 0 ? colors.white : colors.primary
              }
            ]}
            onPress={() => this.setState({ active: 0 })}
            underlayColor="white"
          >
            <Text
              style={{
                color: active === 0 ? colors.primary : "white",
                fontFamily: "Roboto-Medium"
              }}
            >
              {tabOneTitle}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              styles.tab,
              { backgroundColor: active === 1 ? colors.white : colors.primary }
            ]}
            onPress={() => this.setState({ active: 1 })}
            underlayColor="white"
          >
            <Text
              style={{
                color: active === 1 ? colors.primary : "white",
                fontFamily: "Roboto-Medium"
              }}
            >
              {tabTwoTitle}
            </Text>
          </TouchableHighlight>
        </View>
        {active === 0 ? tabOneContent : tabSecondContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 40,
    flexDirection: "row"
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  triangle: {
    borderTopWidth: 20,
    borderRightWidth: 0,
    borderBottomWidth: 20,
    borderLeftWidth: 20,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    position: "absolute",
    left: "50%",
    zIndex: 99,
    borderLeftColor: colors.white
  }
});

export default Tabs;
