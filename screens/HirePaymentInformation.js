import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CardView from "react-native-cardview";
import { colors } from "../../KiraApp/common/variables";
import Loading from "../components/Loading";
import { MAIN_URL } from "../redux/actions/actionTypes";
import axios from "axios";
import moment from "moment";
import { currency } from "../common/constants";

class HirePaymentInformation extends Component {
  state = { loading: true, data: [] };
  componentDidMount() {
    const { id, token } = this.props;
    axios
      .get(`${MAIN_URL}/gayrimenul-borclar/?portfoyno=${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({ loading: false, data: res.data });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { loading, data } = this.state;

    return (
      <View style={styles.container}>
        <Loading show={loading} />
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "center",
            height: 45,
            borderBottomWidth: 1,
            borderBottomColor: colors.seperatorColor,
            flexDirection: "row"
          }}
        >
          <Text
            style={{
              color: colors.primary,
              flex: 1,
              textAlign: "center",
              fontFamily: "Roboto-Medium"
            }}
          >
            Tarih
          </Text>
          <Text
            style={{
              color: colors.primary,
              flex: 1,
              textAlign: "center",
              fontFamily: "Roboto-Medium"
            }}
          >
            Tür
          </Text>
          <Text
            style={{
              color: colors.primary,
              flex: 1,
              textAlign: "center",
              fontFamily: "Roboto-Medium"
            }}
          >
            Tutar
          </Text>
          <Text
            style={{
              color: colors.primary,
              flex: 1,
              textAlign: "center",
              fontFamily: "Roboto-Medium"
            }}
          >
            Ödenen Tutar
          </Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            const { tarih, tutar, tur, odenentutar, odendi, parabirimi } = item;
            const day = moment(tarih, "YYYY-MM-DD").format("DD");
            const monthAndYear = moment(tarih, "YYYY-MM-DD").format("MMM YYYY");
            return (
              <View
                style={{
                  marginTop: 1,
                  backgroundColor: odendi ? "white" : "#8D021F",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: 45,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.seperatorColor,
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      color: odendi ? colors.primary : "white",
                      fontSize: 24,
                      textAlign: "center",
                      flex: 1,
                      fontFamily: "Roboto-Medium"
                    }}
                  >
                    {day}
                  </Text>
                  <Text
                    style={{
                      color: odendi ? colors.primary : "white",
                      fontSize: 10,
                      marginBottom: 3,
                      fontFamily: "Roboto-Medium"
                    }}
                  >
                    {monthAndYear}
                  </Text>
                </View>

                <Text
                  style={{
                    color: odendi ? colors.primary : "white",
                    flex: 1,
                    textAlign: "center",
                    fontFamily: "Roboto-Regular"
                  }}
                >
                  {tur}
                </Text>

                <Text
                  style={{
                    color: odendi ? colors.primary : "white",
                    flex: 1,
                    textAlign: "center",
                    fontFamily: "Roboto-Regular"
                  }}
                >
                  {Number(tutar).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "TRY",
                    minimumFractionDigits: 2
                  })}
                </Text>
                <Text
                  style={{
                    color: odendi ? colors.primary : "white",
                    flex: 1,
                    textAlign: "center",
                    fontFamily: "Roboto-Regular"
                  }}
                >
                  {odenentutar
                    ? `${Number(odenentutar).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}`
                    : "X"}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor
  }
});

function mapStateToProps(state) {
  return { token: state.api.token };
}

export default connect(
  mapStateToProps,
  null
)(HirePaymentInformation);
