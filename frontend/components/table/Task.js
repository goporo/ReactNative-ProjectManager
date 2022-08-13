import { View, Text } from "react-native";
import React from "react";
import colors from "../../constants/colors";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Task = (props) => {
  return (
    <View
      style={{
        backgroundColor: colors.mainBackground,
        marginHorizontal: 10,
        marginBottom: 8,
        paddingHorizontal: 7,
        paddingBottom: 5,
        borderRadius: 6,
      }}
    >
      <Text
        style={{
          color: colors.textColor,
          fontSize: 18,
          marginTop: 8,
          marginBottom: 12,
        }}
      >
        {props.text}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons
          name={props.status === '1' ? "check-box" : "check-box-outline-blank"}
          style={{ fontSize: 15, color: colors.textColor }} />
        <Text
          style={{
            color: colors.textColor,
            fontSize: 15,
            opacity: 0.75,
            marginLeft: 5
          }}
        >
          Completed

        </Text>
      </View>
    </View>
  );
};

export default Task;
