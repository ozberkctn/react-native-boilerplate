import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import Tabs from "../components/Tabs";
import { getRealEstates } from "../redux/actions/apiActions";
import Loading from "../components/Loading";
import Accordion from "react-native-collapsible/Accordion";
import ExpandableHeader from "../components/ExpandableHeader";
import { colors } from "../common/variables";
import { Actions } from "react-native-router-flux";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import EstateItem from "../components/EstateItem";
class RealEstates extends Component {
  constructor(props) {
    super(props);
    this.state = { fullEstates: [], emptyEstates: [] };
  }

  componentWillMount() {
    const { realEstates, token } = this.props;
    if (isEmpty(realEstates)) this.props.getRealEstates(token);
  }

  componentDidMount() {
    const { projectsWithEstates } = this.props;
    if (!isEmpty(projectsWithEstates)) {
      this.filterEstates(projectsWithEstates);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.projectsWithEstates != nextProps.projectsWithEstates &&
      !isEmpty(nextProps.projectsWithEstates)
    ) {
      this.filterEstates(nextProps.projectsWithEstates);
    }
  }

  filterEstates(data) {
    let fullEstates = [];
    let emptyEstates = [];

    data.map(project => {
      const fullProjects = {};
      const emptyProjects = {};

      const filteredProject = project.map(estate => {
        if (estate._bilgiler.dolu) {
          if (fullProjects[estate.proje.id]) {
            console.log("ozberk" + estate.proje.id);
            fullProjects[estate.proje.id].estates.push(estate);
          } else {
            console.log("ozberk" + estate.proje.id);

            fullProjects[estate.proje.id] = {
              proje: estate.proje.info,
              estates: [estate]
            };
          }
        } else {
          console.log("ozberk" + estate.proje.id);
          if (emptyProjects[estate.proje.id]) {
            emptyProjects[estate.proje.id].estates.push(estate);
          } else {
            console.log("ozberk" + estate.proje.id);
            emptyProjects[estate.proje.id] = {
              proje: estate.proje.info,
              estates: [estate]
            };
          }
        }
      });
      if (!isEmpty(fullProjects)) {
        fullEstates.push(fullProjects);
      }
      if (!isEmpty(emptyProjects)) {
        emptyEstates.push(emptyProjects);
      }
    });

    this.setState({ fullEstates: fullEstates, emptyEstates: emptyEstates });
  }

  render() {
    const { getRealEstatesAreLoading, projectsWithEstates } = this.props;
    const { fullEstates, emptyEstates } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Loading show={getRealEstatesAreLoading} />
        <Tabs
          tabOneTitle="Dolu"
          tabTwoTitle="Boş"
          tabOneContent={
            <View>
              <Accordion
                key="1"
                sections={fullEstates}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                underlayColor="transparent"
              />
            </View>
          }
          tabSecondContent={
            <View>
              <Accordion
                key="2"
                sections={emptyEstates}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                underlayColor="transparent"
              />
            </View>
          }
        />
      </ScrollView>
    );
  }

  renderHeader(section) {
    return (
      <ExpandableHeader
        title={section[Object.keys(section)[0]].proje}
        marginTop={0}
      />
    );
  }

  renderContent(section) {
    return (
      <View>
        <FlatList
          data={section[Object.keys(section)[0]].estates}
          renderItem={({ item }) => (
            <EstateItem
              key={item.id}
              item={item}
              onPress={item => Actions.EstateDetail({ estate: item })}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.bgColor, flex: 1 }
});

function mapStateToProps(state) {
  return {
    token: state.api.token,
    realEstates: state.api.realEstates,
    projectsWithEstates: state.api.projectsWithEstates,
    getRealEstatesAreLoading: state.api.getRealEstatesAreLoading
  };
}

export default connect(
  mapStateToProps,
  { getRealEstates }
)(RealEstates);
