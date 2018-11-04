import React, { Component } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { colors } from "../common/variables";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
class DateDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerVisible: false,
      date: props.initial ? props.initial : "Seçiniz"
    };
  }

  _showDateTimePicker = () => this.setState({ isPickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isPickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    const momentedDate = moment(date).format("DD-MM-YYYY");
    this.setState({ date: momentedDate });
    this.props.onDateSelect(momentedDate);
    this._hideDateTimePicker();
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.initial != nextProps.initial) {
      this.setState({ date: nextProps.initial });
    }
  }

  render() {
    const { title, onDateSelect } = this.props;
    const { isPickerVisible, date } = this.state;
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
          onPress={this._showDateTimePicker.bind(this)}
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
              <Text>{date}</Text>
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
        <DateTimePicker
          locale="tr"
          confirmTextIOS="Tamam"
          cancelTextIOS="İptal"
          isVisible={isPickerVisible}
          onConfirm={this._handleDatePicked.bind(this)}
          onCancel={this._hideDateTimePicker.bind(this)}
        />
      </View>
    );
  }
}

export default DateDropdown;
