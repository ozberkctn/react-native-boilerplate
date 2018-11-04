import React, { PureComponent } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Image,
  StyleSheet,
  FlatList,
  ScrollView
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { colors } from "../common/variables";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { gayrimenkulDetails } from "../common/constants";

const FirstRoute = () => <View style={[{ backgroundColor: "#ff4081" }]} />;
const SecondRoute = () => <View style={[{ backgroundColor: "#673ab7" }]} />;

class EstateProperties extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "First" },
      { key: "second", title: "Second" }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      item: {
        _dis_ozellikler,
        _ic_ozellikler,
        _satilik,
        _ozellikler,
        _bilgiler
      }
    } = this.props;
    return (
      <ScrollableTabView
        tabBarUnderlineStyle={{
          backgroundColor: colors.primary,
          height: 1
        }}
        tabBarTextStyle={{ fontSize: 15, fontFamily: "Roboto-Medium" }}
        tabBarInactiveTextColor={colors.primary}
        tabBarActiveTextColor={colors.primary}
      >
        <ScrollView
          style={{ backgroundColor: colors.white, flex: 1 }}
          tabLabel="Bilgiler"
        >
          {Object.keys(_bilgiler).map(key => {
            return (
              <View style={styles.valueContainer}>
                <Text style={styles.valueKey}>{gayrimenkulDetails[key]}</Text>

                {_bilgiler[key] == true || _bilgiler[key] == false ? (
                  _bilgiler[key] == true ? (
                    <Image source={require("../images/check.png")} />
                  ) : null
                ) : (
                  <Text style={styles.value}>{_bilgiler[key]}</Text>
                )}
              </View>
            );
          })}
        </ScrollView>
        <ScrollView
          style={{ backgroundColor: colors.white, flex: 1 }}
          tabLabel="Özellikler"
        >
          {Object.keys(_ozellikler).map(key => {
            return (
              <View style={styles.valueContainer}>
                <Text style={styles.valueKey}>{gayrimenkulDetails[key]}</Text>

                {_ozellikler[key] == true || _ozellikler[key] == false ? (
                  _ozellikler[key] == true ? (
                    <Image source={require("../images/check.png")} />
                  ) : null
                ) : (
                  <Text style={styles.value}>
                    {gayrimenkulDetails[_ozellikler[key]]}
                  </Text>
                )}
              </View>
            );
          })}
        </ScrollView>
        <ScrollView
          style={{ backgroundColor: colors.white, flex: 1 }}
          tabLabel="D.Özellikler"
        >
          {Object.keys(_dis_ozellikler).map(key => {
            return (
              <View style={styles.valueContainer}>
                <Text style={styles.valueKey}>{gayrimenkulDetails[key]}</Text>
                {_dis_ozellikler[key] ? (
                  <Image source={require("../images/check.png")} />
                ) : null}
              </View>
            );
          })}
        </ScrollView>
        <ScrollView
          style={{ backgroundColor: colors.white, flex: 1 }}
          tabLabel="Satılık"
        >
          {Object.keys(_satilik).map(key => {
            return (
              <View style={styles.valueContainer}>
                <Text style={styles.valueKey}>{gayrimenkulDetails[key]}</Text>
                {_satilik[key] ? <Text>{_satilik[key]}</Text> : null}
              </View>
            );
          })}
        </ScrollView>
        <ScrollView
          style={{ backgroundColor: colors.white, flex: 1 }}
          tabLabel="İç"
        >
          {Object.keys(_ic_ozellikler).map(key => {
            return (
              <View style={styles.valueContainer}>
                <Text style={styles.valueKey}>{gayrimenkulDetails[key]}</Text>
                {_ic_ozellikler[key] ? (
                  <Image source={require("../images/check.png")} />
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const styles = StyleSheet.create({
  container: { flexShrink: 1, backgroundColor: colors.bgColor },
  valueContainer: {
    borderWidth: 1,
    borderColor: "#E4F1FD",
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center"
  },
  valueKey: {
    fontSize: 14,
    color: colors.primary,
    flex: 1
  },
  value: { fontSize: 14, color: colors.primary, flex: 2, textAlign: "right" }
});

export default EstateProperties;
