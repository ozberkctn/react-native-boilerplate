import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { colors } from "../common/variables";
import Loading from "../components/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { MAIN_URL } from "../redux/actions/actionTypes";
import isEmpty from "lodash/isEmpty";
import { Actions } from "react-native-router-flux";

class ForgotPassword extends Component {
  state = {
    email: ""
  };

  sendContactForm = email => {
    if (isEmpty(email)) {
      return Alert.alert("Uyarı", "Lütfen eposta bilgisi giriniz.");
    }
    this.setState({ loading: true, error: "" });
    axios
      .post(`${MAIN_URL}/reset-password/`, {
        email: email
      })
      .then(res => {
        debugger;

        Alert.alert(
          "",
          "Eposta gönderildi. Lütfen epostanızı kontrol ediniz.",
          [
            {
              text: "Tamam",
              onPress: () => {
                this.setState({ loading: false });
                Actions.pop();
              }
            }
          ]
        );
      })
      .catch(err => {
        debugger;
        this.setState({ loading: false, error: "Bir hata meydana geldi" });
        dispatch({ type: SEND_CONTACT_FORM.FAIL, payload: err });
      });
  };

  render() {
    const { email, loading } = this.state;
    const { token } = this.props;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Loading show={loading} />
        <View style={{ padding: 20 }}>
          <Text style={{ color: "white", fontSize: 24 }}>
            Bizimle İletişime Geçin
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>E-Posta</Text>
              <TextInput
                underlineColorAndroid="transparent"
                autoCorrect={false}
                style={styles.input}
                onChangeText={email => this.setState({ email })}
              />
            </View>

            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => this.sendContactForm(email)}
            >
              <View
                style={{
                  height: 40,
                  backgroundColor: "#3392C5",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: "white" }}>GÖNDER</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  formContainer: {
    marginTop: 20
  },
  inputContainer: {
    marginTop: 10
  },
  inputTitle: { color: "white" },
  input: {
    borderWidth: 1,
    borderColor: "#979797",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    backgroundColor: "white",
    height: 40
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#979797",
    padding: 10,
    marginTop: 10,
    backgroundColor: "white",
    height: 100
  }
});

function mapStateToProps(state) {
  return {
    token: state.api.token
  };
}

export default ForgotPassword;
