import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Alert,
  StyleSheet,
  ScrollView
} from "react-native";
import DateDropdown from "./DateDropdown";
import { colors } from "../common/variables";
import { getTaxes } from "../redux/actions/apiActions";
import Tabs from "../components/Tabs";
import Loading from "../components/Loading";
import isEmpty from "lodash/isEmpty";
class TaxCalculate extends Component {
  state = { startDate: null, endDate: null };
  render() {
    const { taxes, getTaxesAreLoading } = this.props;
    return (
      <ScrollView style={styles.container}>
        <Loading show={getTaxesAreLoading} />
        <View
          style={{
            height: 30,
            paddingLeft: 20,
            justifyContent: "center",
            backgroundColor: colors.bgColor
          }}
        >
          <Text style={{ opacity: 0.8, fontSize: 16 }}>Tarihler</Text>
        </View>
        <DateDropdown
          title="Başlangıç Tarihi"
          onDateSelect={startDate => {
            this.setState({ startDate: startDate });
          }}
        />
        <View style={{ marginTop: 2 }}>
          <DateDropdown
            title="Bitiş Tarihi"
            onDateSelect={endDate => {
              this.setState({ endDate: endDate });
            }}
          />
        </View>
        <TouchableHighlight
          underlayColor={colors.primary}
          onPress={this.apply.bind(this)}
          style={{
            marginTop: 20,
            backgroundColor: colors.primary,
            height: 40,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Uygula</Text>
        </TouchableHighlight>
        {!isEmpty(taxes) ? (
          <View style={{ marginTop: 20, backgroundColor: "white" }}>
            <Tabs
              tabOneTitle="GERÇEK GİDER USULÜ"
              tabTwoTitle="GÖTÜRÜ USULÜ"
              tabOneContent={
                <View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#eaeaea",
                      height: 30,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 20,
                      paddingRight: 20,
                      alignItems: "center"
                    }}
                  >
                    <Text>GİDERLER </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Malın İdare Giderleri:</Text>
                    <Text style={styles.value}>
                      {taxes.idarigider.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Faiz Gideri:</Text>
                    <Text style={styles.value}>
                      {taxes.faizgider.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Toplam:</Text>
                    <Text style={styles.value}>
                      {taxes.toplamgider.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 30,
                      borderWidth: 1,
                      borderColor: "#eaeaea",
                      height: 30,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 20,
                      paddingRight: 20,
                      alignItems: "center"
                    }}
                  >
                    <Text>GERÇEK GİDER USÜLÜNE GÖRE HESAP</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Toplam Kira Hasılatı:</Text>
                    <Text style={styles.value}>
                      {taxes.kirageliri.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>İstisna Tutarı:</Text>
                    <Text style={styles.value}>
                      {taxes.istisna.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Kalan:</Text>
                    <Text style={styles.value}>
                      {taxes.kalan.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>

                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Toplam Gider:</Text>
                    <Text style={styles.value}>
                      {taxes.toplamgider.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  {/* <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>İndirilebilecek Gider:</Text>
                    <Text style={styles.value}>38665.15</Text>
                  </View> */}
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Vergi Matrahı:</Text>
                    <Text style={styles.value}>
                      {taxes.vergimatrah.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 30,
                      borderWidth: 1,
                      borderColor: "#eaeaea",
                      height: 30,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 20,
                      paddingRight: 20,
                      alignItems: "center"
                    }}
                  >
                    <Text>VERGİ HESABI</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>0 - 13000 TL:</Text>
                    <Text style={styles.value}>
                      {taxes.dilim1.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>13000 - 30000 TL:</Text>
                    <Text style={styles.value}>
                      {taxes.dilim2.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>30000 - 70000 TL:</Text>
                    <Text style={styles.value}>
                      {taxes.dilim3.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>

                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>70000 TL Üzeri: </Text>
                    <Text style={styles.value}>
                      {taxes.dilim4.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Toplam Vergi: </Text>
                    <Text style={styles.value}>
                      {taxes.toplamvergi.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                </View>
              }
              tabSecondContent={
                <View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#eaeaea",
                      height: 30,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 20,
                      paddingRight: 20,
                      alignItems: "center"
                    }}
                  >
                    <Text>GÖTÜRÜ GİDER USÜLÜNE GÖRE HESAP</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Toplam Kira Hasılatı: </Text>
                    <Text style={styles.value}>
                      {taxes.kirageliri.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>İstisna Tutarı: </Text>
                    <Text style={styles.value}>
                      {taxes.istisna.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Kalan: </Text>
                    <Text style={styles.value}>
                      {taxes.kalan.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Götürü Gider Oranı: </Text>
                    <Text style={styles.value}>
                      {taxes.goturugider.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Vergi Matrahı: </Text>
                    <Text style={styles.value}>
                      {taxes.gvergimatrah.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 30,
                      borderWidth: 1,
                      borderColor: "#eaeaea",
                      height: 30,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 20,
                      paddingRight: 20,
                      alignItems: "center"
                    }}
                  >
                    <Text>VERGİ HESABI</Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>0 - 13000 TL:</Text>
                    <Text style={styles.value}>
                      {taxes.gdilim1.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>13000 - 30000 TL:</Text>
                    <Text style={styles.value}>
                      {taxes.gdilim2.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>30000 - 70000 TL:</Text>
                    <Text style={styles.value}>
                      {taxes.gdilim3.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>

                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>70000 TL Üzeri: </Text>
                    <Text style={styles.value}>
                      {taxes.gdilim4.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueKey}>Toplam Vergi: </Text>
                    <Text style={styles.value}>
                      {taxes.gtoplamvergi.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "TRY",
                        minimumFractionDigits: 2
                      })}
                    </Text>
                  </View>
                </View>
              }
            />
          </View>
        ) : null}
      </ScrollView>
    );
  }

  apply() {
    const { startDate, endDate } = this.state;
    const { token, getTaxes } = this.props;
    if (startDate == null || endDate == null) {
      return Alert.alert("Lütfen başlangıç ve bitiş tarihi seçiniz.");
    }
    getTaxes(startDate, endDate, token);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor
  },
  valueContainer: {
    borderWidth: 1,
    borderColor: "#eaeaea",
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center"
  },
  valueKey: { fontSize: 14, opacity: 0.8 },
  value: { fontSize: 14, opacity: 0.8 }
});

function mapStateToProps(state) {
  return {
    token: state.api.token,
    taxes: state.api.taxes.data,
    getTaxesAreLoading: state.api.getTaxesAreLoading
  };
}

export default connect(
  mapStateToProps,
  { getTaxes }
)(TaxCalculate);
