import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/Feather";

const About = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.mainBackground, flex: 1, flexDirection: "column", }}>
      <View style={{ flexDirection: "row", height: 65, alignItems: "center", paddingBottom: 10, }}>

        <TouchableOpacity onPress={() => navigation.navigate("account")}>
          <Icon name={"chevron-left"} style={{ color: colors.primary1, fontSize: 30, marginLeft: 20, width: 55, }} />
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", flex: 1, marginHorizontal: 40, }}>
          <Text style={{ color: colors.textColor, fontSize: 20 }}>About us</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon name={"edit"} style={{ color: colors.mainBackground, fontSize: 20, marginLeft: 50, marginHorizontal: 22, }} />
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 15, color: colors.textColor, paddingBottom: 15 }}>Manager: Teams & Tasks is the flexible work management tool that will gather project’s information and indivitual tasks at one place with a user-friendly interface. Work, organize tasks anywhere, anytime, get the jobs done and increase productivity.</Text>
        <Text style={{ fontSize: 15, color: colors.textColor, paddingBottom: 5 }}>This app is contributed by 5 members of Group 05 - 20CLC11:</Text>
        <Text style={{ fontSize: 15, color: colors.textColor, paddingBottom: 5 }}>   20127005 - Nguyễn Đức Bảo</Text>
        <Text style={{ fontSize: 15, color: colors.textColor, paddingBottom: 5 }}>   20127317 - Phạm Minh Tài</Text>
        <Text style={{ fontSize: 15, color: colors.textColor, paddingBottom: 5 }}>   20127337 - Trần Quang Thịnh</Text>
        <Text style={{ fontSize: 15, color: colors.textColor, paddingBottom: 5 }}>   20127577 - Phan Nguyễn Phước Nguyên</Text>
        <Text style={{ fontSize: 15, color: colors.textColor, paddingBottom: 5 }}>   20127585 - Phan Thị Hữu Niên</Text>
      </View>

    </SafeAreaView>
  );
};


export default About;