import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";
import { connect } from "react-redux";
import AggrementItem from "./AggrementItem";
import { getAggrements, getSikayetler } from "../redux/actions/apiActions";
import isEmpty from "lodash/isEmpty";
import { colors } from "../common/variables";
import AggrementItemHeader from "./AggrementItemHeader";
import { Actions } from "react-native-router-flux";
import Loading from "../components/Loading";
import SikayetListesiItem from "../components/SikayetListesiItem";
import Modal from "react-native-modal";
import Accordion from "react-native-collapsible/Accordion";
import ExpandableHeader from "../components/ExpandableHeader";
class Sikayetler extends Component {
  state = { openImageModal: false, selectedImage: "" };
  componentWillMount() {
    const { sikayetler, token } = this.props;

    if (isEmpty(sikayetler)) this.props.getSikayetler(token);
  }

  componentDidMount() {
    Image.getSize(
      "http://online.keystoneyonetim.com/media/belgeler/2018/01/A1_DR_6_1200_DEPOZITO__1200_KIRA_QF65XWj.jpg",
      (width, height) => {
        if (this.props.width && !this.props.height) {
          this.setState({
            width: this.props.width,
            height: height * (this.props.width / width)
          });
        } else if (!this.props.width && this.props.height) {
          this.setState({
            width: width * (this.props.height / height),
            height: this.props.height
          });
        } else {
          this.setState({ width: width, height: height });
        }
      }
    );
  }

  renderHeader(section) {
    debugger;
    return <ExpandableHeader title={section.title} marginTop={0} />;
  }

  renderContent(section) {
    debugger;
    return (
      <View>
        <FlatList
          data={section.data}
          renderItem={({ item, index }) => {
            return (
              <SikayetListesiItem
                item={item}
                onPressImage={image =>
                  this.setState({ openImageModal: true, selectedImage: image })
                }
              />
            );
          }}
        />
      </View>
    );
  }

  render() {
    const { sikayetler, getSikayetlerAreLoading } = this.props;
    const { width, height, openImageModal, selectedImage } = this.state;

    return (
      <View style={styles.container}>
        <Loading show={getSikayetlerAreLoading} />
        <Accordion
          key="1"
          sections={sikayetler}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          underlayColor="transparent"
        />
        <Modal isVisible={openImageModal}>
          <View>
            <Image
              resizeMode="contain"
              style={{
                height: height
              }}
              source={{
                uri: selectedImage
              }}
            />
          </View>
          <View style={{ position: "absolute", top: 20, right: 0 }}>
            <TouchableHighlight
              style={{ width: 50, height: 50 }}
              underlayColor="transparent"
              onPress={() => this.setState({ openImageModal: false })}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../images/close.png")}
              />
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.bgColor }
});

function mapStateToProps(state) {
  return {
    token: state.api.token,
    sikayetler: state.api.sikayetler,
    getSikayetlerAreLoading: state.api.getSikayetlerAreLoading
  };
}

export default connect(
  mapStateToProps,
  { getSikayetler }
)(Sikayetler);
