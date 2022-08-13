import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import colors from '../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import axios from '../components/axios';

const SignInScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const { colors } = useTheme();


    const textInputChange = (val) => {
        if (val.trim().length >= 5) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,

            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                password: val,

            });
        } else {
            setData({
                ...data,
                password: val,

            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const tryLogin = async (un, pw) => {
        const { data } = await axios.put('/login',
            {
                "US_ACCOUNT": un,
                "US_PASSWORD": pw,
            })
        const message = data.message
        if (message.success) {
            return true
        }
        return false

    }

    const loginHandle = async (un, pw) => {
        if (await tryLogin(un, pw)) {
            AsyncStorage.setItem('un', un);
            AsyncStorage.setItem('pw', pw);
            navigation.navigate("BotTab")
        }
        else {
            alert("Username or Password is not correct!!")
        }

    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#528ae6' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >

                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>

                {<View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View animation="bounceIn">

                            <Feather
                                name="check-circle"
                                color="blue"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                }


                <Text style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}>Password</Text>
                {<View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>

                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                }


                <TouchableOpacity>
                    <Text style={{ color: '#388fdd', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.signIn, { backgroundColor: '#528ae6' }]} onPress={() => { loginHandle(data.username, data.password) }}>
                        <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Do not have an account yet?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}><Text style={[styles.textSign, { color: '#528ae6' }]}> Sign Up</Text></TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary1
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#05375a',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    signupText: {
        color: colors.placeholder,
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
});