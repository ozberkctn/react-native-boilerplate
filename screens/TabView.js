import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";
import PieChart from "../components/PieChart";

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired
};

const defaultProps = {
  sceneStyle: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "red"
  }
});

class TabView extends React.Component {
  state = { hideNavBar: false };

  toggleNavBar = () => {
    this.setState(
      prevState => ({ hideNavBar: !prevState.hideNavBar }),
      () => Actions.refresh({ hideNavBar: this.state.hideNavBar })
    );
  };

  render() {
    return (
      <View>
        <View>
          <PieChart />
        </View>
      </View>
    );
  }
}
TabView.propTypes = propTypes;
TabView.defaultProps = defaultProps;

export default TabView;
