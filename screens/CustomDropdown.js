import React, { Component } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { colors } from "../common/variables";
import DateTimePicker from "react-native-modal-datetime-picker";
import PickerCustom from "react-native-picker";
class CustomDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { isPickerVisible: false, selected: "Seçiniz" };
  }

  _showPicker = () => {
    PickerCustom.init({
      pickerTextEllipsisLen: 100,
      pickerTitleText: "Lütfen Seçiniz",
      pickerCancelBtnText: "İptal",
      pickerConfirmBtnText: "Tamam",
      pickerData: this.props.data,
      onPickerConfirm: data => {
        this.setState({ selected: data[0] });
        if (this.props.onSelect) this.props.onSelect(data[0]);
      },
      onPickerCancel: data => {},
      onPickerSelect: data => {}
    });
    PickerCustom.show();
  };

  _hideDateTimePicker = () => {};

  _handleDatePicked = value => {};

  render() {
    const { title, onSelect } = this.props;
    const { selected } = this.state;
    return (
      <View
        style={{
          backgroundColor: "white",
          height: 40,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingLeft: 10,
          paddingRight: 10
        }}
      >
        <Text>{title}</Text>
        <TouchableHighlight
          onPress={this._showPicker.bind(this)}
          underlayColor="transparent"
        >
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.primary,
                borderRadius: 4,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                paddingLeft: 20,
                width: 150,
                paddingTop: 5,
                paddingBottom: 5
              }}
            >
              <Text>{selected}</Text>
            </View>
            <View
              style={{
                backgroundColor: colors.secondary,
                width: 30,
                height: 30,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image source={require("../images/down_arrow.png")} />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default CustomDropdown;
