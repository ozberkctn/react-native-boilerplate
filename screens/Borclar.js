import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Image,
  StyleSheet,
  FlatList
} from "react-native";
import { colors } from "../common/variables";
import { getBorclar } from "../redux/actions/apiActions";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import BorclarItem from "../components/BorclarItem";
import Loading from "../components/Loading";

class Borclar extends Component {
  componentWillMount() {
    const { borclar, token } = this.props;
    if (isEmpty(borclar)) this.props.getBorclar(token);
  }
  render() {
    const { borclar, getBorclarAreLoading } = this.props;
    debugger;
    return (
      <View style={styles.container}>
        <Loading show={getBorclarAreLoading} />

        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <FlatList
            data={borclar}
            renderItem={({ item }) => <BorclarItem item={item} />}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    borclar: state.api.borclar,
    token: state.api.token,
    getBorclarAreLoading: state.api.getBorclarAreLoading
  };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgColor }
});

export default connect(
  mapStateToProps,
  { getBorclar }
)(Borclar);
