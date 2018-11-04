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
import { getSales, getOffers } from "../redux/actions/apiActions";
import Loading from "../components/Loading";
import Accordion from "react-native-collapsible/Accordion";
import ExpandableHeader from "../components/ExpandableHeader";
import { colors } from "../common/variables";
import { Actions } from "react-native-router-flux";
import isEmpty from "lodash/isEmpty";
import OffersItem from "../components/OffersItem";
import EstateItem from "../components/EstateItem";
import SalesItem from "./SalesItem";

class EstatesForSale extends Component {
  state = { filteredSales: [], filteredOffers: [] };

  componentDidMount() {
    const { sales, offers } = this.props;
    if (sales) {
      this.filterSales(sales);
    }
    if (offers) {
      this.filterOffers(offers);
    }
  }

  componentWillMount() {
    const { sales, offers, token } = this.props;
    if (isEmpty(sales)) this.props.getSales(token);
    if (isEmpty(offers)) this.props.getOffers(token);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sales != nextProps.sales) {
      this.filterSales(nextProps.sales);
    }
    if (this.props.offers != nextProps.offers) {
      this.filterOffers(nextProps.offers);
    }
  }

  filterSales(data) {
    const projects = [];
    data.map(estate => {
      let isMatch = false;
      projects.map(project => {
        if (project.info == estate.proje.info) {
          isMatch = true;
          project.estates.push(estate);
        }
      });
      if (!isMatch) {
        projects.push({ info: estate.proje.info, estates: [estate] });
      }
    });
    this.setState({ filteredSales: projects });
  }

  filterOffers(data) {
    const projects = [];
    data.map(offer => {
      let isMatch = false;
      projects.map(project => {
        if (project.info == offer.proje.info) {
          isMatch = true;
          project.offers.push(offer);
        }
      });
      if (!isMatch) {
        projects.push({ info: offer.proje.info, offers: [offer] });
      }
    });

    this.setState({ filteredOffers: projects });
  }

  render() {
    const {
      getSalesAreLoading,
      getOffersAreLoading,
      sales,
      offers
    } = this.props;
    const { filteredSales, filteredOffers } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Loading show={getSalesAreLoading || getOffersAreLoading} />
        <Tabs
          tabOneTitle="Satılık"
          tabTwoTitle="Teklifler"
          tabOneContent={
            <View>
              <Accordion
                key="1"
                sections={filteredSales}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                underlayColor="transparent"
              />
            </View>
          }
          tabSecondContent={
            // <View>
            //   <View
            //     style={{
            //       height: 45,
            //       flexDirection: "row",
            //       justifyContent: "space-between",
            //       borderBottomWidth: 1,
            //       borderBottomColor: colors.seperatorColor,
            //       alignItems: "center"
            //     }}
            //   >
            //     <View
            //       style={{
            //         justifyContent: "center",
            //         alignItems: "center",
            //         flex: 1
            //       }}
            //     >
            //       <Text
            //         style={{
            //           color: colors.primary,
            //           fontSize: 14,
            //           textAlign: "center",
            //           fontFamily: "Roboto-Regular"
            //         }}
            //       >
            //         Portfoy No
            //       </Text>
            //     </View>
            //     <View
            //       style={{
            //         justifyContent: "center",
            //         flex: 1,
            //         justifyContent: "center",
            //         alignItems: "center"
            //       }}
            //     >
            //       <Text
            //         style={{
            //           color: colors.primary,
            //           fontSize: 14,
            //           textAlign: "center",
            //           fontFamily: "Roboto-Regular"
            //         }}
            //       >
            //         Tutar
            //       </Text>
            //     </View>
            //     <View
            //       style={{
            //         justifyContent: "center",
            //         flex: 1,
            //         justifyContent: "center",
            //         alignItems: "center"
            //       }}
            //     >
            //       <Text
            //         style={{
            //           textAlign: "center",
            //           color: colors.primary,
            //           fontSize: 14,
            //           fontFamily: "Roboto-Regular"
            //         }}
            //       >
            //         Dip Tutar
            //       </Text>
            //     </View>
            //   </View>
            //   <FlatList
            //     data={offers}
            //     renderItem={({ item }) => <OffersItem item={item} />}
            //   />
            // </View>
            <View>
              <Accordion
                key="2"
                sections={filteredOffers}
                renderHeader={this.renderHeader}
                renderContent={this.renderFilterContent}
                underlayColor="transparent"
              />
            </View>
          }
        />
      </ScrollView>
    );
  }

  renderHeader(section) {
    return <ExpandableHeader title={section.info} marginTop={0} />;
  }
  renderFilterContent(section) {
    return (
      <View>
        <View
          style={{
            height: 45,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: colors.seperatorColor
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 1
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              Kapı No
            </Text>
            <Image
              resizeMode="center"
              style={{ marginLeft: 20 }}
              source={require("../images/blue_down_arrow.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              Dip Tutar
            </Text>
            <Image
              resizeMode="center"
              resizeMode="center"
              style={{ marginLeft: 20 }}
              source={require("../images/blue_down_arrow.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              Tutar
            </Text>
            <Image
              resizeMode="center"
              style={{ marginLeft: 20 }}
              source={require("../images/blue_down_arrow.png")}
            />
          </View>
        </View>
        {section.offers.map(item => {
          return <OffersItem key={item.id} item={item} />;
        })}
      </View>
    );
  }
  renderContent(section) {
    return (
      <View>
        <View
          style={{
            height: 45,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: colors.seperatorColor
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 1
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              Kapı No
            </Text>
            <Image
              resizeMode="center"
              style={{ marginLeft: 20 }}
              source={require("../images/blue_down_arrow.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              Kat
            </Text>
            <Image
              resizeMode="center"
              resizeMode="center"
              style={{ marginLeft: 20 }}
              source={require("../images/blue_down_arrow.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              Oda
            </Text>
            <Image
              resizeMode="center"
              style={{ marginLeft: 20 }}
              source={require("../images/blue_down_arrow.png")}
            />
          </View>
        </View>
        {section.estates.map(item => {
          return (
            <SalesItem
              key={item.id}
              item={item}
              onPress={item => Actions.EstateDetail({ estate: item })}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.bgColor, flex: 1 }
});

function mapStateToProps(state) {
  return {
    token: state.api.token,
    sales: state.api.sales,
    getSalesAreLoading: state.api.getSalesAreLoading,
    getOffersAreLoading: state.api.getOffersAreLoading,
    offers: state.api.offers
  };
}

export default connect(
  mapStateToProps,
  { getSales, getOffers }
)(EstatesForSale);
