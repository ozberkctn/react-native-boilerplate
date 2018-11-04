import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { show } = this.props;

    return (
      <Spinner
        visible={show}
        textContent={"Yükleniyor..."}
        textStyle={styles.textStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  textStyle: { color: "white" }
});

export default Loading;
