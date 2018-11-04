import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  InteractionManager,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import AggrementItem from "./AggrementItem";
import { getAggrements } from "../redux/actions/apiActions";
import isEmpty from "lodash/isEmpty";
import { colors } from "../common/variables";
import AggrementItemHeader from "./AggrementItemHeader";
import { Actions } from "react-native-router-flux";
import Loading from "../components/Loading";
import AutoSuggest from "../components/AutoSuggest";
class Aggrements extends Component {
  state = { kiraciData: [], filteredData: [] };
  componentDidMount() {
    const { aggrements, token } = this.props;
    if (isEmpty(aggrements)) this.props.getAggrements(token);
    else {
      this.setState({ filteredData: this.props.aggrements });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.aggrements != nextProps.aggrements) {
      this.setState({ filteredData: nextProps.aggrements });
    }
  }

  apply(text) {
    debugger;
    if (isEmpty(text)) {
      debugger;
      return this.setState({ filteredData: this.props.aggrements });
    }
    const filteredData = [];
    this.props.aggrements.map(aggrement => {
      if (
        (aggrement.kiraci.first_name + " " + aggrement.kiraci.last_name)
          .substring(0, text.length)
          .toLowerCase() == text.toLowerCase()
      ) {
        filteredData.push(aggrement);
      }
    });
    this.setState({ filteredData });
  }

  render() {
    const { aggrements, getAggrementsAreLoading } = this.props;
    const { kiraciData, filteredData } = this.state;

    return (
      <View style={styles.container}>
        <Loading show={getAggrementsAreLoading} />
        <View
          style={{
            position: "absolute",
            top: 0,
            zIndex: 9999,
            left: 0,
            right: 0,
            backgroundColor: "#eaeaea",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <AutoSuggest
            placeholder="KİRACI"
            onChangeText={text => this.apply(text)}
            data={kiraciData}
          />
        </View>

        <FlatList
          style={{ marginTop: 55 }}
          data={filteredData}
          renderItem={({ item, index }) => (
            <AggrementItem
              item={item}
              onPress={item => Actions.AggrementsDetail({ item: item })}
            />
          )}
        />
      </View>
    );
  }
}

// Aggrements.defaultProps = {
//   getAggrementsAreLoading: true
// };

const styles = StyleSheet.create({
  container: { backgroundColor: colors.bgColor }
});

function mapStateToProps(state) {
  return {
    aggrements: state.api.aggrements,
    token: state.api.token,
    getAggrementsAreLoading: state.api.getAggrementsAreLoading
  };
}

export default connect(
  mapStateToProps,
  { getAggrements }
)(Aggrements);
