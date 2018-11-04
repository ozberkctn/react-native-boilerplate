import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import CardView from "react-native-cardview";
import { colors } from "../../KiraApp/common/variables";
import axios from "axios";
import { MAIN_URL } from "../redux/actions/actionTypes";
import Loading from "../components/Loading";
class PersonalDetails extends Component {
  state = {
    loading: true,
    data: {
      kiraci: {
        first_name: "",
        last_name: "",
        kullanici: { gsm: "", tcno: "", photo: "", adres: "" }
      }
    }
  };
  componentDidMount() {
    const { id, token } = this.props;
    axios
      .get(`${MAIN_URL}/sozlesmeler/?portfoyno=${id}&pasif=false`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        
        this.setState({ loading: false, data: res.data[0] });
      })
      .catch(err => {
        
        this.setState({ loading: false });
      });
  }
  render() {
    const {
      data: {
        kiraci: {
          first_name,
          last_name,
          kullanici: { gsm, tcno, photo, adres }
        }
      },
      loading
    } = this.state;
    return (
      <View style={styles.container}>
        <Loading show={loading} />
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 8,
            paddingTop: 16,
            paddingBottom: 8,
            borderRightColor: colors.seperatorColor,
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 1 }}>
            <Image
              resizeMode="center"
              source={{ uri: photo }}
              style={{ width: 128, height: 128 }}
            />
          </View>
          <Text
            style={{
              marginTop: 10,
              color: colors.primary,
              flex: 1,
              fontSize: 20,
              fontFamily: "Roboto-Regular"
            }}
          >
            {first_name} {last_name}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 16,
            height: 45,
            marginTop: 15,
            flexDirection: "row"
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 16,
              fontFamily: "Roboto-Medium"
            }}
          >
            TCKN
          </Text>
          <Text
            style={{
              color: colors.primary,
              fontSize: 14,
              fontFamily: "Roboto-Regular",
              opacity: 0.8
            }}
          >
            {tcno}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 16,
            minHeight: 45,
            flexDirection: "row"
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 16,
              fontFamily: "Roboto-Medium",
              marginRight: 15
            }}
          >
            Adres
          </Text>
          <Text
            style={{
              textAlign: "right",
              flex: 1,
              color: colors.primary,
              fontSize: 14,
              opacity: 0.8,
              fontFamily: "Roboto-Regular"
            }}
          >
            {adres}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 16,
            height: 45,
            marginTop: 15,
            flexDirection: "row"
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 16,
              fontFamily: "Roboto-Medium"
            }}
          >
            GSM No
          </Text>
          <Text
            style={{
              color: colors.primary,
              fontSize: 14,
              opacity: 0.8,
              fontFamily: "Roboto-Regular"
            }}
          >
            {gsm}
          </Text>
        </View>
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
  {}
)(PersonalDetails);
