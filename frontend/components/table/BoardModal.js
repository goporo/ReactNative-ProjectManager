import React, { useState } from "react";
import { Modal, Text, View, TouchableOpacity, Pressable } from "react-native";
import colors from "../../constants/colors";
import { ModalInputBoardName } from "../PopUpModal";

const BoardModal = (props) => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  return (
    <View>
      <ModalInputBoardName
        styles={{
          backgroundColor: colors.primary3,
          width: 250,
          borderRadius: 10,
          alignSelf: "center",
          flexDirection: "column",
          top: 200,
          shadowOpacity: 1,
          shadowRadius: 300,
        }}
        isVisible={inputModalVisible}
        addBoard={props.addBoard}
        close={() => {
          setInputModalVisible(false);
        }}
        id={props.id}
        handleRenameBoard={props.handleRenameBoard}
      />
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            props.close();

          }}
        >
          <View>
            <View style={props.styles}>
              <View
                style={{
                  flexDirection: "column",
                  shadowOpacity: 0.5,
                  shadowRadius: 75,
                  shadowColor: colors.textColor,
                }}
              >

                <TouchableOpacity
                  style={{ marginVertical: 10, paddingLeft: 15 }}
                  onPress={() => {
                    setInputModalVisible(true);
                    props.close();
                  }}
                >
                  <Text style={{ color: colors.textColor, fontSize: 15 }}>
                    Rename column
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: colors.textColor,
                    opacity: 0.5,
                  }}
                />

                <View
                  style={{
                    height: 0.5,
                    backgroundColor: colors.textColor,
                    opacity: 0.5,
                  }}
                />
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: colors.textColor,
                    opacity: 0.5,
                  }}
                />
                <TouchableOpacity
                  style={{ marginVertical: 10, paddingLeft: 15, fontSize: 15 }}
                  onPress={() => {
                    props.handleDeleteBoard(props.id);
                    props.close();
                  }}
                >
                  <Text
                    style={{
                      color: colors.warning,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Delete column
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal></View>

  );
};

export default BoardModal;
