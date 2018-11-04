import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CardView from "react-native-cardview";
import { colors } from "../../KiraApp/common/variables";
import moment from "moment";
import { currency } from "../common/constants";
class OfferDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item } = this.props;

    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            minHeight: 45,
            flexDirection: "row",
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row",
              flex: 1
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Medium"
              }}
            >
              Alıcı
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              flexDirection: "row",
              flex: 1
            }}
          >
            <View
              style={{
                width: 2,
                backgroundColor: "#F2F2F2",
                marginLeft: 10,
                marginRight: 10
              }}
            />
            <Text
              style={{
                textAlign: "left",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              {item.alici_adsoyad}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            height: 45,
            flexDirection: "row",
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 15,
            paddingRight: 15
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row",
              flex: 1
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Medium"
              }}
            >
              Telefon
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              flexDirection: "row",
              flex: 1
            }}
          >
            <View
              style={{
                width: 2,
                backgroundColor: "#F2F2F2",
                marginLeft: 10,
                marginRight: 10
              }}
            />
            <Text
              style={{
                textAlign: "left",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              {item.alici_gsm}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            height: 45,
            flexDirection: "row",
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 15,
            paddingRight: 15
          }}
        >
          <View
            style={{
              width: 50,
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row",
              flex: 1
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Medium"
              }}
            >
              Tutar
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              flexDirection: "row",
              flex: 1
            }}
          >
            <View
              style={{
                width: 2,
                backgroundColor: "#F2F2F2",
                marginLeft: 10,
                marginRight: 10
              }}
            />
            <Text
              style={{
                textAlign: "left",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              {Number(item.tutar).toLocaleString("it-IT", {
                style: "currency",
                currency: "TRY",
                minimumFractionDigits: 2
              })}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            height: 45,
            flexDirection: "row",
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 15,
            paddingRight: 15
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Medium"
              }}
            >
              Dip Tutar
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              flexDirection: "row",
              flex: 1
            }}
          >
            <View
              style={{
                width: 2,
                backgroundColor: "#F2F2F2",
                marginLeft: 10,
                marginRight: 10
              }}
            />
            <Text
              style={{
                textAlign: "left",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              {Number(item.diptutar).toLocaleString("it-IT", {
                style: "currency",
                currency: "TRY",
                minimumFractionDigits: 2
              })}{" "}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            height: 45,
            flexDirection: "row",
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 15,
            paddingRight: 15
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Medium"
              }}
            >
              Tarih
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              flexDirection: "row",
              flex: 1
            }}
          >
            <View
              style={{
                width: 2,
                backgroundColor: "#F2F2F2",
                marginLeft: 10,
                marginRight: 10
              }}
            />
            <Text
              style={{
                textAlign: "left",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              {item.tarih}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            height: 45,
            flexDirection: "row",
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 15,
            paddingRight: 15
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Medium"
              }}
            >
              Kat
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              flexDirection: "row",
              flex: 1
            }}
          >
            <View
              style={{
                width: 2,
                backgroundColor: "#F2F2F2",
                marginLeft: 10,
                marginRight: 10
              }}
            />
            <Text
              style={{
                textAlign: "left",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              {item.portfoyno._ozellikler.kat}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            height: 45,
            flexDirection: "row",
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 15,
            paddingRight: 15
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <Text
              style={{
                textAlign: "right",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Medium"
              }}
            >
              Kapı No
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              flexDirection: "row",
              flex: 1
            }}
          >
            <View
              style={{
                width: 2,
                backgroundColor: "#F2F2F2",
                marginLeft: 10,
                marginRight: 10
              }}
            />
            <Text
              style={{
                textAlign: "left",
                color: colors.primary,
                fontSize: 14,
                fontFamily: "Roboto-Regular"
              }}
            >
              {item.portfoyno._ozellikler.kapino}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgColor }
});

export default OfferDetail;
