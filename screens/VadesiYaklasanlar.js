import React, { PureComponent } from "react";
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
import ScrollableTabView from "react-native-scrollable-tab-view";
import { colors } from "../common/variables";
import { getVadesiYaklasanlar } from "../redux/actions/apiActions";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import VadesiYaklasanlarItem from "../components/VadesiYaklasanlarItem";
import Loading from "../components/Loading";

const FirstRoute = () => <View style={[{ backgroundColor: "#ff4081" }]} />;
const SecondRoute = () => <View style={[{ backgroundColor: "#673ab7" }]} />;

class VadesiYaklasanlar extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "First" },
      { key: "second", title: "Second" }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const { vadesiYaklasanlar, token } = this.props;
    if (isEmpty(vadesiYaklasanlar)) this.props.getVadesiYaklasanlar(token);
  }
  render() {
    const { vadesiYaklasanlar, getVadesiYaklasanlarAreLoading } = this.props;
    debugger;
    return (
      <View style={styles.container}>
        <Loading show={getVadesiYaklasanlarAreLoading} />

        <View
          style={{ flex: 1, backgroundColor: colors.white }}
          tabLabel="Kira"
        >
          <FlatList
            data={vadesiYaklasanlar}
            renderItem={({ item }) => <VadesiYaklasanlarItem item={item} />}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    vadesiYaklasanlar: state.api.vadesiYaklasanlar,
    token: state.api.token,
    getVadesiYaklasanlarAreLoading: state.api.getVadesiYaklasanlarAreLoading
  };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgColor }
});

export default connect(
  mapStateToProps,
  { getVadesiYaklasanlar }
)(VadesiYaklasanlar);
