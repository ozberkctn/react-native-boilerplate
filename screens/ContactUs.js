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

class ContactUs extends Component {
  state = {
    nameSurname: "",
    phone: "",
    email: "",
    message: "",
    topic: "",
    loading: false
  };

  sendContactForm = (name_surname, phone, email, topic, message) => {
    if (
      isEmpty(name_surname) ||
      isEmpty(phone) ||
      isEmpty(email) ||
      isEmpty(topic) ||
      isEmpty(message)
    ) {
      return Alert.alert("Uyarı", "Lütfen tüm bilgileri doldurunuz");
    }
    this.setState({ loading: true, error: "" });
    axios
      .post(`${MAIN_URL}/iletisim/`, {
        name_surname: name_surname,
        phone: phone,
        email: email,
        topic: topic,
        message: message
      })
      .then(res => {
        this.setState({ loading: false }, () =>
          setTimeout(
            () =>
              Alert.alert(
                "",
                "Mesajınız gönderilmiştir. En kısa sürede size yanıt verilecektir teşekkürler.",
                [
                  {
                    text: "Tamam",
                    onPress: () => {
                      Actions.pop();
                    }
                  }
                ]
              ),
            1000
          )
        );
      })
      .catch(err => {
        this.setState({ loading: false, error: "Bir hata meydana geldi" });
        dispatch({ type: SEND_CONTACT_FORM.FAIL, payload: err });
      });
  };

  render() {
    const { nameSurname, phone, email, topic, message, loading } = this.state;
    const { token, sendFormIsLoading } = this.props;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Loading show={loading} />
        <View style={{ padding: 20 }}>
          <Text style={{ color: "white", fontSize: 24 }}>
            Bizimle İletişime Geçin
          </Text>
          <Text style={{ color: "white", fontSize: 14, marginTop: 20 }}>
            Ünvan: Keystone Yönetim Danışmanlık Anonim Şirketi
          </Text>
          <Text style={{ color: "white", fontSize: 14, marginTop: 20 }}>
            Adres: Koreşehitleri caddesi Çimen Apt. No:43 Esentepe - Şişli /
            İstanbul
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>İsim Soyisim</Text>
              <TextInput
                underlineColorAndroid="transparent"
                autoCorrect={false}
                style={styles.input}
                onChangeText={nameSurname => this.setState({ nameSurname })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Telefon</Text>
              <TextInput
                underlineColorAndroid="transparent"
                autoCorrect={false}
                style={styles.input}
                onChangeText={phone => this.setState({ phone })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>E-Posta</Text>
              <TextInput
                underlineColorAndroid="transparent"
                autoCorrect={false}
                style={styles.input}
                onChangeText={email => this.setState({ email })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Konu</Text>
              <TextInput
                underlineColorAndroid="transparent"
                autoCorrect={false}
                style={styles.input}
                onChangeText={topic => this.setState({ topic })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Mesaj</Text>
              <TextInput
                underlineColorAndroid="transparent"
                autoCorrect={false}
                style={styles.messageInput}
                multiline={true}
                onChangeText={message => this.setState({ message })}
              />
            </View>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() =>
                this.sendContactForm(nameSurname, phone, email, topic, message)
              }
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
    token: state.api.token,
    sendFormIsLoading: state.api.sendFormIsLoading
  };
}

export default ContactUs;
