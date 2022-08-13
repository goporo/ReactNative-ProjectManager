import { View, TouchableOpacity, Image, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../components/axios";

const Account = ({ navigation }) => {

  const [username, setUsername] = useState('')
  const [usid, setUSID] = useState(0)

  useEffect(() => {
    const fetchproducts = async () => {
      const un = await AsyncStorage.getItem('un');
      const pw = await AsyncStorage.getItem('pw');
      setUsername(un);
      const { data } = await axios.put('/login',
        {
          "US_ACCOUNT": un,
          "US_PASSWORD": pw,
        })
      const message = data.message
      if (message.success) {
        setUSID(data.data.US_ID)
      }
      else
        console.log(message)
    }
    fetchproducts();
  }, [])

  const handleLogOut = () => {
    navigation.navigate("StartScreen")
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.mainBackground, flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={{ paddingTop: 40, paddingBottom: 15, borderBottomEndRadius: 20 }}>
          <View style={{ marginTop: 30, paddingHorizontal: 29, flexDirection: "column", alignItems: "center" }}>
            <TouchableOpacity>
              <Image style={styles.profile_pic} source={require(`../assets/user-ava/user${usid % 9}.png`)} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.textColor, marginBottom: 5 }}>{username.toUpperCase()}</Text>
            <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '500', color: colors.textColor, opacity: .7 }}>{username}@clc.fitus.edu.vn</Text>
          </View>
        </View>


        <View style={styles.menuWrapper}>
          <View style={styles.line} />
          <TouchableOpacity onPress={() => navigation.navigate("ProfileInfo")}>
            <View style={styles.menuItem}>
              <Icon name="edit" color={colors.textColor} size={20} />
              <Text style={styles.menuItemText}>Profile infomation</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.line} />
          <TouchableOpacity onPress={() => navigation.navigate("ChangePass")}>
            <View style={styles.menuItem}>
              <Icon name="lock" color={colors.textColor} size={20} />
              <Text style={styles.menuItemText}>Change Password</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.line} />
          <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
            <View style={styles.menuItem}>
              <Icon name="info" color={colors.textColor} size={20} />
              <Text style={styles.menuItemText}>About Manager: Teams & Tasks</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.line} />
          <TouchableOpacity onPress={() => { handleLogOut() }}>
            <View style={styles.menuItem}>
              <Icon name="log-out" color={'red'} size={20} />
              <Text style={styles.menuItemTextLogout}>Log out</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.line} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
const styles = StyleSheet.create({
  line: {
    width: '100%', height: .5, backgroundColor: colors.textColor, opacity: .2
  },
  profile_pic: {
    height: 70,
    width: 70,
    borderRadius: 50,
    bottom: 10
  },
  menuWrapper: {
    marginTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: colors.textColor,
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  menuItemTextLogout: {
    color: 'red',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});