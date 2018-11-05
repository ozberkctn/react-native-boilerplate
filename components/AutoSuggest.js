import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import isEmpty from "lodash/isEmpty";
import { colors } from "../../KiraApp/common/variables";
class AutoSuggest extends Component {
  state = { suggestedData: [], selectedItem: "" };

  prepareData(text) {
    if (isEmpty(text)) return this.setState({ suggestedData: [] });
    this.setState({ text });
    const data = [];
    this.props.data.map(value => {
      if (value.substring(0, text.length).toLowerCase() == text.toLowerCase())
        data.push(value);
    });
    debugger;
    this.setState({ suggestedData: data });
    this.props.onChangeText(text);
  }

  selectItem(item) {
    this.setState({ suggestedData: [], selectedItem: item });
  }
  render() {
    const { placeholder } = this.props;
    const { suggestedData } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          style={{
            fontFamily: "Roboto-Regular",
            backgroundColor: "white",
            height: 40,
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 8,
            paddingLeft: 5,
            paddingRight: 5
          }}
          onChangeText={selectedItem => this.props.onChangeText(selectedItem)}
        />
        {/* <ScrollView
          onBlur={() => {
            this.setState({ suggestedData: [] });
          }}
          style={{
            width: "100%",
            backgroundColor: "white",
            position: "absolute",
            top: 50,
            left: 0,
            zIndex: 99,
            maxHeight: 200
          }}
        >
          {suggestedData.map(value => {
            return (
              <TouchableOpacity onPress={() => this.selectItem(value)}>
                <Text
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "black",
                    fontSize: 16,
                    margin: 10
                  }}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView> */}
      </View>
    );
  }
}

export default AutoSuggest;
