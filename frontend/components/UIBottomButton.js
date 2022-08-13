import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity, Text } from "react-native";
import React from "react";
import colors from "../constants/colors";

const UIBottomButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation?.navigate("Home")}
      style={{
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Icon
        name={props.iconName}
        style={{
          color: props.isSelected ? colors.primary1 : "#fff",
          fontSize: 20,
        }}
      />
      <Text
        style={{
          marginTop: 5,
          color: props.isSelected ? colors.primary1 : "#fff",
          fontSize: 10,
        }}
      >
        {props.useName}
      </Text>
    </TouchableOpacity>
  );
};

export default UIBottomButton;
