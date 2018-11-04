import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import CardView from "react-native-cardview";
import { colors } from "../common/variables";
import { Actions } from "react-native-router-flux";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            padding: 10
          }}
        >
          <TouchableHighlight
            style={{ flex: 1, marginLeft: 5 }}
            onPress={() => Actions.TransactionsReport()}
          >
            <View
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                height: 200
              }}
            >
              <Image
                resizeMode="center"
                source={require("../images/dept_reports.png")}
              />
              <Text
                style={{
                  marginTop: 10,
                  color: colors.primary,
                  fontFamily: "Roboto-Medium"
                }}
              >
                Borç Raporu
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.bgColor, flex: 1 }
});

export default Reports;
