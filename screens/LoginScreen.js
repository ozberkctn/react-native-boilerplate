import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { colors } from "../common/variables";
import { Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { login } from "../redux/actions/apiActions";
import Loading from "../components/Loading";
import AwesomeAlert from "react-native-awesome-alerts";
import renderIf from "render-if";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppIntroSlider from "react-native-app-intro-slider";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showRealApp: undefined
    };
  }

  async componentWillMount() {
    const username = await AsyncStorage.getItem("username");
    // const isFirstEnter = await AsyncStorage.getItem("isFirstEnter");
    const isFirstEnter = await AsyncStorage.getItem("isFirstEnter");

    debugger;

    if (username) {
      const password = await AsyncStorage.getItem("password");
      this.setState({ showRealApp: true });
      this.props.login(username, password);
    } else {
      this.setState({
        showRealApp: isFirstEnter ? false : false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loginIsSuccess != nextProps.loginIsSuccess) {
      Actions.HomePage();
    }
  }

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem("isFirstEnter", "true");
    this.setState({ showRealApp: true });
  };

  renderItem(props) {
    return (
      <View
        style={{
          backgroundColor: colors.primary,
          width: props.width,
          height: props.height
        }}
      >
        <Image
          source={require("../images/white_logo.png")}
          style={{ marginTop: 100, alignSelf: "center" }}
        />
      </View>
    );
  }

  render() {
    const { username, password } = this.state;
    const { loginIsLoading, loginHasError } = this.props;

    const canShowErrorAlert = renderIf(loginHasError);

    if (this.state.showRealApp == undefined) {
      return <Loading show={true} />;
    }
    // else if (this.state.showRealApp) {
    else {
      return (
        <KeyboardAwareScrollView style={styles.container}>
          <Loading show={loginIsLoading} />

          <View style={{ alignItems: "center" }}>
            <Image
              resizeMode="center"
              style={{ marginTop: responsiveHeight(10) }}
              source={require("../images/logo.png")}
            />
          </View>

          <View
            style={{
              alignItems: "center",
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 100
            }}
          >
            <View
              style={{
                width: "100%",
                height: 88,
                borderRadius: 4,
                backgroundColor: "rgb(255, 255, 255)",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "rgb(228, 241, 253)"
              }}
            >
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholder="Kullanıcı Adı"
                placeholderTextColor={colors.primary}
                style={{ height: 40, marginLeft: 10, color: colors.primary }}
                onChangeText={username => this.setState({ username })}
                value={username}
              />
              <View
                style={{
                  width: 343,
                  height: 0.5,
                  backgroundColor: "rgb(228, 241, 253)"
                }}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholder="Şifre"
                placeholderTextColor={colors.primary}
                style={{ height: 40, marginLeft: 10, color: colors.primary }}
                onChangeText={password => this.setState({ password })}
                value={password}
              />
            </View>
          </View>
          <Button
            onPress={() => {
              this.props.login(username, password);
            }}
            buttonStyle={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}
            title="Giriş Yap"
            backgroundColor={colors.primary}
            borderRadius={4}
          />
          {/* <Text
        style={{ marginTop: 10, color: colors.primary, alignSelf: "center" }}
      >
        Şifremi Unuttum
      </Text> */}
          <TouchableOpacity onPress={() => Actions.SingleContact()}>
            <Text
              style={{
                marginTop: 10,
                color: colors.primary,
                alignSelf: "center"
              }}
            >
              Bizimle İletişime Geçin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.ForgotPassword()}>
            <Text
              style={{
                marginTop: 10,
                color: colors.primary,
                alignSelf: "center"
              }}
            >
              Şifremi Unuttum
            </Text>
          </TouchableOpacity>
          {canShowErrorAlert(
            <AwesomeAlert
              show={loginHasError}
              title="Uyarı"
              message={loginHasError}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={true}
              showConfirmButton={true}
              confirmText="Tamam"
              confirmButtonColor={colors.primary}
              onConfirmPressed={this.props.clearGetProjects}
            />
          )}
        </KeyboardAwareScrollView>
      );
      // } else {
      //   return (
      //     <AppIntroSlider
      //       slides={[
      //         {
      //           key: "somethun2",
      //           title: "No need to buy me beer",
      //           text: "Usage is all free"
      //         }
      //       ]}
      //       renderItem={this.renderItem}
      //       onDone={this._onDone}
      //     />
      //   );
      // }
    }
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  image: {
    width: 320,
    height: 320
  }
});

const slides = [
  {
    key: "somethun",
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("../images/1.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#59b2ab"
  },
  {
    key: "somethun-dos",
    title: "Title 2",
    text: "Other cool stuff",
    image: require("../images/2.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#febe29"
  },
  {
    key: "somethun1",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("../images/3.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#22bcb5"
  }
];

function mapStateToProps(state) {
  return {
    loginIsLoading: state.api.loginIsLoading,
    loginIsSuccess: state.api.loginIsSuccess,
    loginHasError: state.api.loginHasError
  };
}

export default connect(
  mapStateToProps,
  { login }
)(LoginScreen);
