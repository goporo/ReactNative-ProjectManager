import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { React, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Task from "./Task";
import BoardModal from "./BoardModal";
import colors from "../../constants/colors";
import { TaskModal } from "../PopUpModal";
import axios from "../axios";


const Board = (props) => {
  const [task, setTask] = useState({ text: "" });
  const [taskname, setTaskname] = useState();
  const [boardModalVisible, setBoardModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false)
  const [clickedID, setClickedID] = useState("");
  const [clickstatus, setclickstatus] = useState("");
  const [taskMem, settaskMem] = useState([]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setClickedID(item.TASK_ID);
        setTaskname(item.TASK_NAME);
        setclickstatus(item.TASK_STATUS)
        settaskMem(item.TASK_RESPONDSIPLE)
        setTaskModalVisible(true)
      }}>
      <Task

        text={item.TASK_NAME}
        member={item.TASK_RESPONDSIPLE}
        status={item.TASK_STATUS}
      />
    </TouchableOpacity>

  );

  const handleAddTask = () => {
    axios.post('/task', {
      "access": {
        "PJ_ID": props.PJ_ID
        , "MEM_ID": props.MEM_ID
        , "MEM_POS": 0
      },
      "data": {
        "PJ_ID": 99,
        "TASK_ID": 99,
        "TASK_STATUS": "99",
        "TASK_NAME": task.text,
        "TASK_DESCRIPTION": "99",
        "TASK_CREATEDAY": null,
        "TASK_DEADLINE": null,
        "TASK_CREATOR": 1,
        "TASK_LABEL": props.id
      }
    })
    props.refresh()
    setTask({ text: "" });
    setIsSelectCreate(false);

    setTimeout(() => {
      scrollRef.current.scrollToEnd({ animated: true });
    }, 150);
  };

  const handleDeleteTask = (id) => {
    axios.put('/delete/task', {
      "access": {
        "PJ_ID": props.PJ_ID
        , "MEM_ID": props.MEM_ID
        , "MEM_POS": 0
      },
      "data": {
        "PJ_ID": 99,
        "TASK_ID": id,
        "TASK_STATUS": "0",
        "TASK_NAME": "99",
        "TASK_DESCRIPTION": "99",
        "TASK_CREATEDAY": null,
        "TASK_DEADLINE": null,
        "TASK_CREATOR": 99,
        "TASK_LABEL": 1
      }
    })
    props.refresh()
  };
  const [isSelectCreate, setIsSelectCreate] = useState(false);

  const scrollRef = useRef();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{
        maxHeight: 500,
        marginTop: 18,
        backgroundColor: colors.primary3,
        width: 300,
        marginHorizontal: 10,
        borderRadius: 6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.textColor,
            fontSize: 18,
            marginStart: 15,
          }}
        >
          {props.title}
        </Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => {
            setBoardModalVisible(true);
          }}
        >
          <Entypo
            name={"dots-three-horizontal"}
            style={{
              color: colors.textColor,
              fontSize: 22,
              marginEnd: 5,
              padding: 12,
            }}
          />
        </TouchableOpacity>
        <BoardModal
          isVisible={boardModalVisible}
          styles={{
            backgroundColor: colors.mainBackground,
            width: 230,
            position: "absolute",
            top: 145 + useSafeAreaInsets().top,
            right: "5%",
            borderRadius: 15,
          }}
          close={() => {
            setBoardModalVisible(!boardModalVisible);
          }}
          handleDeleteBoard={props.handleDeleteBoard}
          handleRenameBoard={props.handleRenameBoard}
          id={props.id}
        />
      </View>
      <TaskModal
        isVisible={taskModalVisible}
        styles={{
          backgroundColor: colors.mainBackground,
          width: 350,
          borderRadius: 10,
          alignSelf: "center",
          top: '16%',

          flexDirection: "column",
          shadowOpacity: 1,
          shadowRadius: 300,

        }}
        close={() => {
          setTaskModalVisible(!taskModalVisible);
        }}
        P_Members={taskMem}
        A_Members={props.P_Members}
        handleDeleteTask={handleDeleteTask}
        id={clickedID}
        status={clickstatus}
        name={taskname}
      />
      <FlatList

        ref={scrollRef}
        scrollEnabled
        data={props.tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.TASK_ID}
      />
      {isSelectCreate ? (
        <TextInput
          style={{
            color: colors.textColor,
            fontSize: 18,
            marginStart: 15,
            marginVertical: 12,
            paddingVertical: 5,
            paddingLeft: 5,
          }}
          placeholder={"Issue summary"}
          placeholderTextColor={colors.textColor * 0.5}
          value={task.text}
          onChangeText={(newText) => setTask({ id: new Date().getTime() % 1e6, text: newText })}
          onSubmitEditing={() => {
            if (task.text != null && task.text != "") handleAddTask();
          }}
          autoFocus={true}
          onBlur={() => Keyboard.dismiss()}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            setIsSelectCreate(true);
          }}
        >
          <Text
            style={{
              color: colors.textColor,
              fontSize: 17,
              marginStart: 15,
              marginTop: 12,
              marginBottom: 16,
              position: "relative",
            }}
          >
            + &nbsp;Create
          </Text>
        </TouchableOpacity>
      )}

    </KeyboardAvoidingView>
  );
};

export default Board;
