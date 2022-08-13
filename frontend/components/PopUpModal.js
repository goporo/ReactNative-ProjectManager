import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  ScrollView
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from "../constants/colors";

const ModalInputBoardName = (props) => {
  const [title, setTitle] = useState("");

  return (
    <View>
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <View style={props.styles}>
          <Text
            style={{
              color: colors.textColor,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 14,
              fontSize: 16,
            }}
          >
            Rename column
          </Text>
          <TextInput
            autoFocus
            placeholder="Column name"
            value={title}
            style={{
              alignItems: "center",
              height: 30,
              color: colors.textColor,
              marginVertical: 15,
              paddingLeft: 5,
              width: "85%",
              alignSelf: "center",
              backgroundColor: colors.mainBackground,
              borderColor: colors.primary3,
              borderWidth: 1,
              borderRadius: 7,
            }}
            onChangeText={(text) => {
              setTitle(text);
            }}
            onSubmitEditing={() => {
              props.handleRenameBoard(props.id, title);
              setTitle('');
              props.close();
            }}
          />
          <View
            style={{ backgroundColor: colors.textColor, opacity: .3, height: 1, width: "100%" }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 24,
              }}
              onPress={() => {
                setTitle("");
                props.close();
              }}
            >
              <Text style={{ color: colors.primary1, fontWeight: "bold" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <View
              style={{ backgroundColor: colors.textColor, opacity: .3, width: 1, height: "100%" }}
            ></View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
              }}
              onPress={() => {
                props.handleRenameBoard(props.id, title);
                setTitle('')
                props.close();
              }}
            >
              <Text style={{ color: colors.textColor }}>
                Rename
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const InputModal = (props) => {
  const [title, setTitle] = useState("");

  return (
    <View>
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <View style={props.styles}>
          <Text
            style={{
              color: colors.textColor,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 14,
              fontSize: 16,
            }}
          >
            Add new column
          </Text>
          <TextInput
            autoFocus
            placeholder="Column name"
            value={title}
            style={{
              alignItems: "center",
              height: 30,
              color: colors.textColor,
              marginVertical: 15,
              paddingLeft: 5,
              width: "85%",
              alignSelf: "center",
              backgroundColor: colors.primary3,
              borderColor: colors.primary3,
              borderWidth: 1,
              borderRadius: 7,
            }}
            onChangeText={(text) => {
              setTitle(text);
            }}
            onSubmitEditing={() => {
              props.addBoard(title);
              setTitle("");
              props.close();
            }}
          />
          <View
            style={{ backgroundColor: colors.textColor, height: .5, opacity: .3, width: "100%" }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 24,
              }}
              onPress={() => {
                setTitle("");
                props.close();
              }}
            >
              <Text style={{ color: colors.primary1, fontWeight: "bold" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <View
              style={{ backgroundColor: colors.textColor, width: 1, opacity: .3, height: "100%" }}
            ></View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
              }}
              onPress={() => {
                props.addBoard(title);
                setTitle("");
                props.close();
              }}
            >
              <Text style={{ color: colors.textColor }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const PopUpModal = (props) => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [ProjectVisible, setProjectVisible] = useState(false);
  return (
    <View>
      <InputModal
        styles={{
          backgroundColor: colors.mainBackground,
          width: 250,
          borderRadius: 10,
          alignSelf: "center",
          flexDirection: "column",
          top: 200,
          shadowOpacity: 0.5,
          shadowRadius: 75,
          shadowColor: colors.textColor,
        }}
        isVisible={inputModalVisible}
        addBoard={props.addBoard}
        close={() => {
          setInputModalVisible(false);
        }}
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
              <View style={{
                flexDirection: "column",
                shadowOpacity: 0.5,
                shadowRadius: 75,
                shadowColor: colors.textColor,
              }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.textColor,
                    opacity: 0.5,
                    textAlign: "center",
                    marginVertical: 10,
                  }}
                >
                  Board actions
                </Text>
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: colors.textColor,
                    opacity: 0.5,
                  }}
                />

                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingLeft: 15,
                  }}
                  onPress={() => {
                    setInputModalVisible(true);
                    props.close();
                  }}
                >
                  <Text style={{ color: colors.textColor, fontSize: 15 }}>
                    Add new column
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: colors.textColor,
                    opacity: 0.5,
                  }}
                />
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingLeft: 15,
                  }}
                  onPress={() => {
                    setProjectVisible(true);

                  }}
                >
                  <Text style={{ color: colors.textColor, fontSize: 15 }}>
                    Project Detail
                  </Text>
                </TouchableOpacity>

                <ProjectModal
                  isVisible={ProjectVisible}
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
                  PJ_NAME={props.PJ_NAME}
                  handleAddMem={props.handleAddMem}
                  handleAssign={props.handleAssign}
                  P_Members={props.P_Members}
                  A_Members={props.A_Members}
                  handleDeleteMem={props.handleDeleteMem}
                  close={() => {
                    setProjectVisible(false);
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
                  style={{ paddingVertical: 10, paddingLeft: 15 }}
                  onPress={() => { props.handleLeave() }}
                >
                  <Text style={{ color: colors.warning, fontSize: 15, fontWeight: "bold", }}>Leave Project</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const TaskModal = (props) => {
  const [title, setTitle] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);

  return (
    <View >
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => props.close()}
        >
          <Pressable style={props.styles}>
            <View style={{ padding: 25, paddingTop: 30, paddingBottom: 15 }}>
              <View style={{ flexDirection: "row" }}>
                <Entypo
                  name={"folder"}
                  style={{
                    color: colors.textColor,
                    fontSize: 25,
                    marginRight: 15,
                    alignSelf: 'center'
                  }}
                />
                <Text
                  style={{
                    color: colors.textColor,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 25,
                    maxWidth: 220
                  }}
                >
                  {props.name}
                </Text>
                <Entypo
                  name={"edit"}
                  style={{
                    color: colors.textColor,
                    fontSize: 23,
                    position: "absolute",
                    right: 0,
                    alignSelf: "center",
                  }}
                />
              </View>
              <Text style={{
                color: colors.textColor,
                fontSize: 19,
                marginTop: 20,
              }}>Description</Text>
              <TextInput
                placeholder="Add a detail description..."
                value={title}
                style={{
                  height: 75,
                  color: colors.textColor,
                  backgroundColor: colors.primary3,
                  paddingLeft: 5,
                  width: "100%",
                  borderColor: colors.primary3,
                  borderWidth: 1,
                  borderRadius: 7,
                  marginTop: 5,
                  marginBottom: 15,
                  paddingLeft: 8,
                  paddingTop: 6,
                  fontSize: 16,
                }}
                multiline={true}
                onChangeText={(text) => {
                  const temp = text.replace(/^\s*\n/gm, "")
                  setTitle(temp);
                }}
                onSubmitEditing={() => {
                  props.addProject(title);
                  Keyboard.dismiss()
                }}
              />
              <Text style={{
                color: colors.textColor,
                fontSize: 19,
                marginBottom: 7,
              }}>
                Due Date
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Entypo
                  name={"calendar"}
                  style={{
                    color: colors.textColor,
                    fontSize: 19,
                    alignSelf: "center",
                    marginRight: 5
                  }}
                />

                <Text style={{
                  color: colors.textColor,
                  fontSize: 15,
                }}>
                  10/10/2023
                </Text>
              </View>

              <Text style={{
                color: colors.textColor,
                fontSize: 19,
                marginTop: 15,
                marginBottom: 8,
              }}>
                Members
              </Text>
              <View style={{ flexDirection: "row", alignItems: 'center' }}>
                {props.P_Members.map((item, index) =>
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',

                      alignItems: 'center',
                      borderRadius: 15,
                    }}>
                    <Image source={require(`../assets/user-ava/user${item.PROJECT_MEMBERS.MEM_ID % 9}.png`)}
                      style={{
                        width: 40,
                        height: 40,
                        marginRight: 10,
                        borderRadius: 50,
                      }} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => { setmodalVisible(!modalVisible) }}>
                  <Ionicons
                    name="ios-ellipsis-horizontal-circle-sharp"
                    style={{ borderRadius: 50, fontSize: 50, color: colors.primary1 }} />
                </TouchableOpacity>

                <TaskMemberModal
                  isVisible={modalVisible}
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
                  P_Members={props.P_Members}
                  A_Members={props.A_Members}
                  handleDeleteMem={props.handleDeleteMem}
                  close={() => {
                    setmodalVisible(false);
                  }}
                />

              </View>
              <View style={{ flexDirection: "row", alignItems: 'center', paddingTop: 20 }}>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                  <MaterialIcons
                    name={props.status === '1' ? "check-box" : "check-box-outline-blank"}
                    style={{ fontSize: 25, color: colors.primary1 }} />
                </TouchableOpacity>

                <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: '500' }}>
                  Mark as completed
                </Text>
              </View>
            </View>
            <View
              style={{ backgroundColor: colors.textColor, height: .5, opacity: .3, width: "100%" }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ paddingVertical: 10 }}
                onPress={() => {
                  props.handleDeleteTask(props.id);
                  props.close();
                }}
              >
                <Text style={{
                  color: colors.warning,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 5,
                }}>
                  Delete task
                </Text>
              </TouchableOpacity>

            </View>

          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};


const TaskMemberModal = (props) => {
  const [ModalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setaddModalVisible] = useState(false);
  const [MEMID, setMEMID] = useState();

  return (
    <View>
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => props.close()}
        >
          <Pressable style={props.styles}>
            <View style={{
              padding: 25,
              paddingVertical: 30,
              maxHeight: 500
            }}>
              <View style={{ flexDirection: "row", paddingBottom: 15 }}>

                <TouchableOpacity onPress={() => props.close()}>
                  <Ionicons
                    name={"arrow-back"}
                    style={{
                      color: colors.primary1,
                      fontSize: 25,
                      marginRight: 15,
                      alignSelf: 'center'
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text
                    style={{
                      color: colors.textColor,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >Member</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ position: "absolute", right: 9, }} onPress={() => { setaddModalVisible(!addModalVisible) }}>
                  <Ionicons
                    name={"add-circle-outline"}
                    style={{
                      color: colors.primary1,
                      fontSize: 27,
                    }}
                  />
                </TouchableOpacity>
              </View>



              <TaskAddMemberModal
                isVisible={addModalVisible}
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
                A_Members={props.A_Members}
                //handleAddMem={props.handleAddMem}
                close={() => {
                  setaddModalVisible(false);
                }}
              />

              <ScrollView>
                {props.P_Members.map((item, index) =>
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',

                      alignItems: 'center',
                      borderRadius: 15,
                      paddingBottom: 10,
                    }}>
                    <Image source={require(`../assets/user-ava/user${item.PROJECT_MEMBERS.MEM_ID % 9}.png`)}
                      style={{
                        width: 40,
                        height: 40,
                        marginRight: 10,
                        borderRadius: 50,
                      }} />

                    <Text style={{
                      fontSize: 17,
                      color: colors.textColor,
                      alignContent: 'center',
                      margin: 5,
                      fontWeight: "700"
                    }}>
                      {item.PROJECT_MEMBERS.USER_INFO.USER_ACCOUNT.US_ACCOUNT}
                    </Text>

                    <TouchableOpacity style={{ position: "absolute", right: 15, }}
                      onPress={() => {
                        //setMEMID(item.MEM_ID)
                        setModalVisible(!ModalVisible)
                      }}>
                      <Entypo
                        name="remove-circle"
                        style={{ fontSize: 20, color: colors.warning, marginLeft: 5 }} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}

              </ScrollView>
            </View>

          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};


const TaskAddMemberModal = (props) => {
  const [text, setText] = useState('');
  const [filteredData, setFilteredData] = useState(props.A_Members);
  const [id, setid] = useState("");

  const searchMember = (e) => {
    let text = e.toLowerCase()
    let filteredName = props.A_Members.filter((item) => {
      return item.USER_INFO.USER_ACCOUNT.US_ACCOUNT.toLowerCase().includes(text)
    })
    setFilteredData(filteredName);
  }

  return (
    <View >
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => props.close()}
        >
          <Pressable style={props.styles}>
            <View style={{
              padding: 25,
              paddingVertical: 30,
              maxHeight: 500,
            }}>
              <View style={{ flexDirection: "row", paddingBottom: 10 }}>

                <TouchableOpacity onPress={() => props.close()}>
                  <Ionicons
                    name={"arrow-back"}
                    style={{
                      color: colors.primary1,
                      fontSize: 25,
                      marginRight: 15,
                      alignSelf: 'center'
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text
                    style={{
                      color: colors.textColor,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >Add member</Text>
                </TouchableOpacity>

              </View>

              <View style={{
                flexDirection: 'row',
                backgroundColor: colors.primary3,
                opacity: .75,
                borderRadius: 10,
              }}>
                <Entypo
                  name={"magnifying-glass"}
                  style={{
                    color: colors.textColor,
                    fontSize: 22,
                    alignSelf: 'center',
                    margin: 5,
                    marginHorizontal: 10,
                  }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    height: 30,
                    alignSelf: 'center',
                    color: colors.textColor,
                    fontSize: 17,
                  }}
                  placeholder={"Search members"}
                  placeholderTextColor={colors.textColor}
                  value={text}
                  onChangeText={(text) => { searchMember(text), setText(text) }}
                />
              </View>
              <ScrollView style={{ paddingTop: 15 }}>
                {filteredData.map((item, index) =>
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',

                      alignItems: 'center',
                      borderRadius: 15,
                      paddingBottom: 15,
                    }}>
                    <Image source={require(`../assets/user-ava/user${item.MEM_ID % 9}.png`)}
                      style={{
                        width: 40,
                        height: 40,
                        marginRight: 10,
                        borderRadius: 50,
                      }} />

                    <Text style={{
                      fontSize: 17,
                      color: colors.textColor,
                      alignContent: 'center',
                      margin: 5,
                      fontWeight: "700"
                    }}>
                      {item.USER_INFO.USER_ACCOUNT.US_ACCOUNT}
                    </Text>

                    <TouchableOpacity
                      //onPress={() => { setid(item.USER_ACCOUNT.US_ACCOUNT) }}
                      style={{ position: "absolute", right: 0 }}
                    >
                      <Ionicons
                        name={item.added ? "checkmark-circle" : "add-circle-outline"}
                        style={{
                          fontSize: 30, color: colors.primary1, marginLeft: 5
                        }} />
                    </TouchableOpacity>
                  </TouchableOpacity>

                )}

              </ScrollView>


              <TouchableOpacity
                style={styles.commandButton}>
                <Text style={styles.panelButtonTitle}>Confirm</Text>
              </TouchableOpacity>
            </View>

          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};


const ProjectInputModal = (props) => {
  const [title, setTitle] = useState("");

  return (
    <View>
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <View style={props.styles}>
          <Text
            style={{
              color: colors.textColor,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 14,
              fontSize: 16,
            }}
          >
            Add new project
          </Text>
          <TextInput
            autoFocus
            placeholder="Project name"
            value={title}
            style={{
              alignItems: "center",
              height: 30,
              color: colors.textColor,
              marginVertical: 15,
              paddingLeft: 5,
              width: "85%",
              alignSelf: "center",
              backgroundColor: colors.mainBackground,
              borderColor: colors.primary3,
              borderWidth: 1,
              borderRadius: 7,
            }}
            onChangeText={(text) => {
              setTitle(text);
            }}
            onSubmitEditing={() => {
              props.addProject(title);
              setTitle("");
              props.close();
            }}
          />
          <View
            style={{ backgroundColor: colors.textColor, opacity: .3, height: 1, width: "100%" }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 24,
              }}
              onPress={() => {
                setTitle("");
                props.close();
              }}
            >
              <Text style={{ color: colors.primary1, fontWeight: "bold" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <View
              style={{ backgroundColor: colors.textColor, opacity: .3, width: 1, height: "100%" }}
            ></View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
              }}
              onPress={() => {
                props.addProject(title);
                setTitle("");
                props.close();
              }}
            >
              <Text style={{ color: colors.textColor }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProjectModal = (props) => {
  const [title, setTitle] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);

  return (
    <View >
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => props.close()}
        >
          <Pressable style={props.styles}>
            <View style={{ padding: 25, paddingVertical: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Entypo
                  name={"folder"}
                  style={{
                    color: colors.textColor,
                    fontSize: 25,
                    marginRight: 15,
                    alignSelf: 'center'
                  }}
                />
                <Text
                  style={{
                    color: colors.textColor,
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: 25,
                    maxWidth: 220
                  }}
                >
                  {props.PJ_NAME}
                </Text>
                <Entypo
                  name={"edit"}
                  style={{
                    color: colors.textColor,
                    fontSize: 23,
                    position: "absolute",
                    right: 0,
                    alignSelf: "center",
                  }}
                />
              </View>
              <Text style={{
                color: colors.textColor,
                fontSize: 19,
                marginTop: 20,
              }}>Description</Text>
              <TextInput
                placeholder="Add a detail description..."
                value={title}
                style={{
                  height: 75,
                  color: colors.textColor,
                  backgroundColor: colors.primary3,
                  paddingLeft: 5,
                  width: "100%",
                  borderColor: colors.primary3,
                  borderWidth: 1,
                  borderRadius: 7,
                  marginTop: 5,
                  marginBottom: 15,
                  paddingLeft: 8,
                  paddingTop: 6,
                  fontSize: 16,
                }}
                multiline={true}
                onChangeText={(text) => {
                  const temp = text.replace(/^\s*\n/gm, "")
                  setTitle(temp);
                }}
                onSubmitEditing={() => {
                  props.addProject(title);
                  Keyboard.dismiss()
                }}
              />
              <Text style={{
                color: colors.textColor,
                fontSize: 19,
                marginBottom: 7,
              }}>
                Due Date
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Entypo
                  name={"calendar"}
                  style={{
                    color: colors.textColor,
                    fontSize: 19,
                    alignSelf: "center",
                    marginRight: 5
                  }}
                />

                <Text style={{
                  color: colors.textColor,
                  fontSize: 15,
                }}>
                  10/10/2023
                </Text>
              </View>
              <Text style={{
                color: colors.textColor,
                fontSize: 19,
                marginBottom: 8,
                marginTop: 15,
              }}>
                Team Leader
              </Text>
              <Image source={require("../assets/anya.png")} style={{ borderRadius: 50, width: 40, height: 40 }} />

              <Text style={{
                color: colors.textColor,
                fontSize: 19,
                marginTop: 15,
                marginBottom: 8,
              }}>
                Team Members
              </Text>
              <View style={{ flexDirection: "row", alignItems: 'center' }}>
                {props.P_Members.map((item, index) => {
                  if (index < 2) {
                    return <TouchableOpacity
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 15,
                        maxWidth: 100
                      }}>
                      <Image source={require(`../assets/user-ava/user${item.MEM_ID % 9}.png`)}
                        style={{
                          width: 40,
                          height: 40,
                          marginRight: 10,
                          borderRadius: 50,
                        }} />
                    </TouchableOpacity>
                  }
                })}

                <TouchableOpacity onPress={() => { setmodalVisible(!modalVisible) }}>
                  <Ionicons
                    name="ios-ellipsis-horizontal-circle-sharp"
                    style={{ borderRadius: 50, fontSize: 50, color: colors.primary1 }} />
                </TouchableOpacity>

                <MemberModal
                  isVisible={modalVisible}
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
                  handleAddMem={props.handleAddMem}
                  handleAssign={props.handleAssign}
                  P_Members={props.P_Members}
                  A_Members={props.A_Members}
                  handleDeleteMem={props.handleDeleteMem}
                  close={() => {
                    setmodalVisible(false);
                  }}
                />

              </View>


            </View>


            <View
              style={{ backgroundColor: colors.textColor, height: .5, opacity: .3, width: "100%" }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ paddingVertical: 10 }}
                onPress={() => {
                  // props.handleDeleteTask(props.id);
                  props.close();
                }}
              >
                <Text style={{
                  color: colors.warning,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 5,
                }}>
                  Delete project
                </Text>
              </TouchableOpacity>

            </View>

          </Pressable>
        </Pressable>



      </Modal>
    </View>
  );
};

const MemberPopUpModal = (props) => {
  const [ModalVisible, setModalVisible] = useState(false);
  const [ProjectVisible, setProjectVisible] = useState(false);
  return (
    <View>
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            props.close();
          }}
        >
          <View>
            <View style={props.styles}>
              <View style={{
                flexDirection: "column",
                shadowOpacity: 0.5,
                shadowRadius: 75,
                shadowColor: colors.textColor,


              }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.textColor,
                    opacity: 0.5,
                    textAlign: "center",
                    marginVertical: 10,
                  }}
                >
                  Member actions
                </Text>
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: colors.textColor,
                    opacity: 0.5,
                  }}
                />
                <TouchableOpacity
                  style={{ paddingVertical: 10, paddingLeft: 15, }}
                  onPress={() => { props.handleAssign(props.ID), props.close() }}
                >
                  <Text style={{ color: colors.textColor, fontSize: 15 }}>
                    Assign to team leader
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: colors.textColor,
                    opacity: 0.5,
                  }}
                />
                <TouchableOpacity
                  style={{ paddingVertical: 10, paddingLeft: 15 }}
                  onPress={() => { props.handleDeleteMem(props.ID), props.close() }}
                >
                  <Text style={{ color: colors.warning, fontSize: 15, fontWeight: "bold", }}>Remove member</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const MemberModal = (props) => {
  const [ModalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setaddModalVisible] = useState(false);
  const [MEMID, setMEMID] = useState();

  return (
    <View>
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => props.close()}
        >
          <Pressable style={props.styles}>
            <View style={{
              padding: 25,
              paddingVertical: 30,
              maxHeight: 500
            }}>
              <View style={{ flexDirection: "row", paddingBottom: 15 }}>

                <TouchableOpacity onPress={() => props.close()}>
                  <Ionicons
                    name={"arrow-back"}
                    style={{
                      color: colors.primary1,
                      fontSize: 25,
                      marginRight: 15,
                      alignSelf: 'center'
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text
                    style={{
                      color: colors.textColor,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >Member</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ position: "absolute", right: 9, }} onPress={() => { setaddModalVisible(!addModalVisible) }}>
                  <Ionicons
                    name={"add-circle-outline"}
                    style={{
                      color: colors.primary1,
                      fontSize: 27,
                      //marginLeft: 60,

                    }}
                  />
                </TouchableOpacity>
              </View>



              <AddMemberModal
                isVisible={addModalVisible}
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
                A_Members={props.A_Members}
                handleAddMem={props.handleAddMem}
                close={() => {
                  setaddModalVisible(false);
                }}
              />

              <ScrollView>
                {props.P_Members.map((item, index) =>
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',

                      alignItems: 'center',
                      borderRadius: 15,
                      paddingBottom: 10,
                    }}>
                    <Image source={require(`../assets/user-ava/user${item.MEM_ID % 9}.png`)}
                      style={{
                        width: 40,
                        height: 40,
                        marginRight: 10,
                        borderRadius: 50,
                      }} />

                    <Text style={{
                      fontSize: 17,
                      color: colors.textColor,
                      alignContent: 'center',
                      margin: 5,
                      fontWeight: "700"
                    }}>
                      {item.USER_INFO.USER_ACCOUNT.US_ACCOUNT}
                    </Text>


                    <TouchableOpacity style={{ position: "absolute", right: 45, }}>
                      <Ionicons
                        name={item.MEM_POS === 1 ? "flag" : "flag-outline"}
                        style={{
                          color: colors.primary1,
                          fontSize: 25,
                          marginRight: 10,
                          alignSelf: 'center',
                          marginLeft: 20
                        }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ position: "absolute", right: 15, }}
                      onPress={() => {
                        setMEMID(item.MEM_ID)
                        setModalVisible(!ModalVisible)
                      }}>
                      <Entypo
                        name="dots-three-horizontal"
                        style={{ fontSize: 20, color: colors.textColor, marginLeft: 5 }} />
                    </TouchableOpacity>

                    <MemberPopUpModal
                      isVisible={ModalVisible}
                      styles={{
                        backgroundColor: colors.mainBackground,
                        width: 230,
                        right: 10,
                        position: "absolute",
                        borderRadius: 10,
                      }}
                      ID={MEMID}
                      handleAssign={props.handleAssign}
                      handleDeleteMem={props.handleDeleteMem}
                      close={() => {
                        setModalVisible(false);
                      }}
                    />
                  </TouchableOpacity>
                )}

              </ScrollView>
            </View>

          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};


const AddMemberModal = (props) => {
  const [text, setText] = useState('');
  const [filteredData, setFilteredData] = useState(props.A_Members);
  const [id, setid] = useState("");

  const searchMember = (e) => {
    let text = e.toLowerCase()
    let filteredName = props.A_Members.filter((item) => {
      return item.USER_ACCOUNT.US_ACCOUNT.toLowerCase().includes(text)
    })
    setFilteredData(filteredName);
  }

  return (
    <View >
      <Modal animationType="none" transparent={true} visible={props.isVisible}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => props.close()}
        >
          <Pressable style={props.styles}>
            <View style={{
              padding: 25,
              paddingVertical: 30,
              maxHeight: 500,
            }}>
              <View style={{ flexDirection: "row", paddingBottom: 10 }}>

                <TouchableOpacity onPress={() => props.close()}>
                  <Ionicons
                    name={"arrow-back"}
                    style={{
                      color: colors.primary1,
                      fontSize: 25,
                      marginRight: 15,
                      alignSelf: 'center'
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text
                    style={{
                      color: colors.textColor,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >Add member</Text>
                </TouchableOpacity>

              </View>

              <View style={{
                flexDirection: 'row',
                backgroundColor: colors.primary3,
                opacity: .75,
                borderRadius: 10,
              }}>
                <Entypo
                  name={"magnifying-glass"}
                  style={{
                    color: colors.textColor,
                    fontSize: 22,
                    alignSelf: 'center',
                    margin: 5,
                    marginHorizontal: 10,
                  }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    height: 30,
                    alignSelf: 'center',
                    color: colors.textColor,
                    fontSize: 17,
                  }}
                  placeholder={"Search members"}
                  placeholderTextColor={colors.textColor}
                  value={text}
                  onChangeText={(text) => { searchMember(text), setText(text) }}
                />
              </View>
              <ScrollView style={{ paddingTop: 15 }}>
                {filteredData.map((item, index) =>
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',

                      alignItems: 'center',
                      borderRadius: 15,
                      paddingBottom: 15,
                    }}>
                    <Image source={require(`../assets/user-ava/user${item.US_ID % 9}.png`)}
                      style={{
                        width: 40,
                        height: 40,
                        marginRight: 10,
                        borderRadius: 50,
                      }} />

                    <Text style={{
                      fontSize: 17,
                      color: colors.textColor,
                      alignContent: 'center',
                      margin: 5,
                      fontWeight: "700"
                    }}>
                      {item.USER_ACCOUNT.US_ACCOUNT}
                    </Text>

                    <TouchableOpacity
                      onPress={() => { setid(item.USER_ACCOUNT.US_ACCOUNT); props.handleAddMem(item.USER_ACCOUNT.US_ACCOUNT) }}
                      style={{ position: "absolute", right: 0 }}
                    >
                      <Ionicons
                        name={item.added ? "checkmark-circle" : "add-circle-outline"}
                        style={{
                          fontSize: 30, color: colors.primary1, marginLeft: 5
                        }} />
                    </TouchableOpacity>
                  </View>

                )}

              </ScrollView>


              <TouchableOpacity onPress={() => { props.close() }} style={styles.commandButton}>
                <Text
                  style={styles.panelButtonTitle}>Confirm</Text>
              </TouchableOpacity>
            </View>

          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export { PopUpModal, InputModal, ModalInputBoardName, TaskModal, ProjectInputModal, ProjectModal, MemberModal, AddMemberModal };

const styles = StyleSheet.create({
  commandButton: {
    paddingHorizontal: 100,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: colors.primary1,
    alignItems: 'center',
    marginTop: 20,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  }
});