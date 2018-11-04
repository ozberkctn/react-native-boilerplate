import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CardView from "react-native-cardview";
import { colors } from "../../KiraApp/common/variables";
import moment from "moment";
class AggrementsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      item: {
        kira,
        created,
        bitis,
        depozito,
        aidat,
        kiraci: { first_name, last_name }
      }
    } = this.props;

    const createdDate = moment(created, "YYYY-MM-DD").format("DD MMM YYYY");
    const endDate = moment(bitis, "YYYY-MM-DD").format("DD MMM YYYY");

    return (
      <View style={styles.container}>
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
              Sözleşme Tarihi
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
              {createdDate}
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
              Bitiş Tarihi
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
              {endDate}
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
              Depozito
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
              {Number(depozito).toLocaleString("it-IT", {
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
              Kira
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
              {Number(kira).toLocaleString("it-IT", {
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
              Aidat
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
              {Number(aidat).toLocaleString("it-IT", {
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
              Kiracı
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
              {first_name} {last_name}
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

export default AggrementsDetail;
