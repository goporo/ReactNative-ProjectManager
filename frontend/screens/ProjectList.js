import { View, TouchableOpacity, Image, Text, ScrollView, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { React, useEffect, useState } from "react";
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { ProjectInputModal } from "../components/PopUpModal";
import axios from "../components/axios";


const ProjectList = ({ route, navigation }) => {
    const [text, setText] = useState('');
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [projects, setProjects] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [usid, setUSID] = useState(0)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [needRefresh, setNeedRefresh] = useState(false)

    const handleAddProject = async (title) => {
        await axios.post('/project', {
            "access": {
                "US_ID": usid,
                "US_ACCOUNT": username,
                "US_PASSWORD": password,
                "TOKEN": null
            },
            "data": {
                "PJ_ID": 99,
                "PJ_NAME": title,
                "PJ_CREATEDAY": "2022-08-05T14:03:50.911Z",
                "PJ_DEADLINE": "09/09/2022",
                "PJ_STATUS": "0",
                "PJ_ADMIN": 1,
                "PJ_OWNER": "Khoa CNTT"
            }
        })
        setNeedRefresh(!needRefresh)
    }

    const searchProject = (e) => {
        let text = e.toLowerCase()
        let filteredName = projects.filter((item) => {
            return item.PROJECT_INFO.PJ_NAME.toLowerCase().includes(text)
        })
        setFilteredData(filteredName);
    }


    useEffect(() => {
        const fetchproducts = async () => {
            const un = await AsyncStorage.getItem('un');
            const pw = await AsyncStorage.getItem('pw');

            setUsername(un)
            setPassword(pw)
            const { data } = await axios.put('/login',
                {

                    "US_ACCOUNT": un,
                    "US_PASSWORD": pw,

                })
            const message = data.message
            if (message.success) {
                const temp = data.data.USER_INFO.PROJECT_MEMBER
                setUSID(data.data.US_ID)
                AsyncStorage.setItem('userid', data.data.US_ID);
                setProjects(temp)
                setFilteredData(temp)

            }
            else {
                setUsername('USER NOT FOUND')
            }
        }
        fetchproducts();
    }, [route.params, needRefresh])

    return (
        <SafeAreaView style={{
            backgroundColor: colors.mainBackground,
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 25

        }}>

            <View style={{
                marginTop: 20,
                flexDirection: 'row',
                margin: 10,
                alignItems: 'center',
                marginBottom: 35,
            }}>
                <Text style={{ color: colors.textColor, fontSize: 30, fontWeight: 'bold' }}>
                    Projects
                </Text>
                <TouchableOpacity style={{ right: 0, position: "absolute", alignItems: "center" }}>
                    <Image source={require(`../assets/user-ava/user${usid % 9}.png`)} style={{ borderRadius: 50, width: 55, height: 55 }} />
                    <Text style={{ marginTop: 5, fontWeight: 525, fontSize: 14, color: colors.textColor }}>{username.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>



            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.primary3,
                opacity: .75,
                height: 45,
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
                    placeholder={"Search projects"}
                    placeholderTextColor={colors.textColor}
                    value={text}
                    onChangeText={(text) => { searchProject(text), setText(text) }}
                />
            </View>

            <Text style={{ fontSize: 20, color: colors.textColor, marginTop: 15, fontWeight: 'bold', marginBottom: 10 }}>All projects</Text>


            <ScrollView>
                {filteredData.map((item, index) =>
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate("ProjectDetail", item)}
                        style={{
                            minHeight: 100,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: colors.primary3,
                            borderRadius: 15,
                            marginBottom: 10,
                        }}>
                        <Image source={require("../assets/project.png")} style={{
                            width: 55,
                            height: 55,
                            marginRight: 20,
                            margin: 10,
                            borderRadius: 6,
                            shadowColor: '#000000',
                            shadowOffset: { width: 1, height: 3 },
                            shadowOpacity: 0.9,
                            shadowRadius: 3,
                            elevation: 5,
                        }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{
                                    fontSize: 20,
                                    color: colors.textColor,
                                    alignContent: 'center',
                                    margin: 4,
                                }}>{item.PROJECT_INFO.PJ_NAME}</Text>
                                <Text style={{
                                    fontSize: 14, color: colors.textColor, alignContent: 'center', margin: 4,
                                    opacity: .75,
                                }}>Due date: 10/10/2000</Text>
                            </View>
                        </View>
                    </TouchableOpacity>)
                }
            </ScrollView>

            <TouchableOpacity
                onPress={() => { setInputModalVisible(true) }}
                style={{ right: 25, bottom: 25, position: "absolute" }}>
                <View style={{
                    backgroundColor: colors.primary1,
                    borderRadius: 50,
                    width: 65,
                    height: 65,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowRadius: 30,
                    shadowOpacity: .2
                }}>
                    <Entypo
                        name={"plus"}
                        style={{
                            color: "white",
                            fontSize: 35,
                        }}
                    />
                </View>
            </TouchableOpacity>

            <ProjectInputModal
                styles={{
                    backgroundColor: colors.primary3,
                    width: 300,
                    borderRadius: 10,
                    alignSelf: "center",
                    flexDirection: "column",
                    top: 300,
                    shadowOpacity: 1,
                    shadowRadius: 300,
                }}
                isVisible={inputModalVisible}
                addProject={handleAddProject}
                close={() => {
                    setInputModalVisible(false);
                }}
            />
        </SafeAreaView >

    );
};


export default ProjectList;