import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight
} from "react-native";
import Tabs from "../components/Tabs";
import { getRealEstates } from "../redux/actions/apiActions";
import Loading from "../components/Loading";
import Accordion from "react-native-collapsible/Accordion";
import ExpandableHeader from "../components/ExpandableHeader";
import { colors } from "../common/variables";
import { Actions } from "react-native-router-flux";
import CardView from "react-native-cardview";
class EstateDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { estate } = this.props;

    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight
          style={{ flex: 1 }}
          onPress={() => Actions.EstateProperties({ item: estate })}
        >
          <ExpandableHeader
            title="GAYRİMENKUL BİLGİLERİ"
            marginTop={0}
            rotate="-90deg"
          />
        </TouchableHighlight>
        <ExpandableHeader title="KİRACI BİLGİLERİ" marginTop={0.25} hideArrow />
        <View style={{ flexDirection: "row" }}>
          <TouchableHighlight
            style={{ flex: 1 }}
            underlayColor="transparent"
            onPress={() => Actions.PersonalDetails({ id: estate.id })}
          >
            <View
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                height: 120,
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: colors.seperatorColor
              }}
            >
              <Image
                resizeMode="center"
                source={require("../images/personal_information.png")}
              />
              <Text
                style={{
                  marginTop: 10,
                  color: colors.primary,
                  fontFamily: "Roboto-Medium"
                }}
              >
                Kişisel Bilgiler
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ flex: 1 }}
            underlayColor="transparent"
            onPress={() => Actions.HirePaymentInformation({ id: estate.id })}
          >
            <View
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                height: 120,

                borderRightWidth: 1,
                borderRightColor: colors.seperatorColor
              }}
            >
              <Image
                resizeMode="center"
                source={require("../images/payment_information.png")}
              />
              <Text
                style={{
                  marginTop: 10,
                  color: colors.primary,
                  fontFamily: "Roboto-Medium"
                }}
              >
                Ödeme Bilgiler
              </Text>
            </View>
          </TouchableHighlight>
          {/* <TouchableHighlight
            underlayColor="transparent"
            onPress={() => Actions.AggrementsDetail({ estate: estate })}
          >
            <View
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                height: 120,
                flex: 1
              }}
            >
              <Image
                resizeMode="center"
                source={require("../images/aggrements_detail.png")}
              />
              <Text
                style={{
                  marginTop: 10,
                  color: colors.primary,
                  fontFamily: "Roboto-Medium"
                }}
              >
                Sözleşme Detayları
              </Text>
            </View>
          </TouchableHighlight> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.bgColor, flex: 1 }
});

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(EstateDetail);
