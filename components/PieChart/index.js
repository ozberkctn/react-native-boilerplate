import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../../../KiraApp/common/variables";

const CircularProgress = ({ title, percentage, onClickFilledArea }) => {
  
  return (
    <View>
      <View style={styles.container}>
        <Text
          style={{
            color: colors.primary,
            marginTop: 30,
            fontSize: 18,
            fontFamily: "Roboto-Medium"
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "#1A00C7",
            marginTop: 30,
            fontSize: 18,
            position: "absolute",
            right: 50,
            top: 70
          }}
        >
          %{100 - percentage}
        </Text>
        <Text
          style={{
            color: colors.primary,
            marginTop: 30,
            fontSize: 18,
            position: "absolute",
            left: 40,
            top: 190
          }}
        >
          %{percentage}
        </Text>
        <Svg
          height={220}
          width={220}
          viewBox="0 0 45 45"
          style={{
            marginTop: 15,
            transform: [{ rotate: "-90deg" }]
          }}
        >
          <Circle
            onPress={onClickFilledArea}
            cx="23.5"
            cy="22"
            r="15.91549430918954"
            stroke="#008CBB"
            strokeWidth="1"
            fill="transparent"
            strokeDasharray={[100, 100]}
            strokeDashoffset="0"
          />
          <Circle
            onPress={onClickFilledArea}
            cx="22.5"
            cy="22"
            r="15.91549430918954"
            stroke="#00BFFF"
            strokeWidth="1"
            fill="transparent"
            strokeDasharray={[100, 100]}
            strokeDashoffset="0"
          />
          <Circle
            onPress={onClickFilledArea}
            cx="25"
            cy="21"
            r="15.91549430918954"
            stroke="#050024"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={[100, 100]}
            strokeDashoffset={percentage}
          />

          <Circle
            onPress={onClickFilledArea}
            cx="24"
            cy="21"
            r="15.91549430918954"
            stroke="#1A00C7"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={[100, 100]}
            strokeDashoffset={percentage}
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CircularProgress;
