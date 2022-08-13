import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../constants/colors";


const ProfileInfo = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", height: 65, alignItems: "center", paddingBottom: 10, }}>

        <TouchableOpacity onPress={() => navigation.navigate("account")}>
          <Icon name={"chevron-left"} style={{ color: colors.primary1, fontSize: 30, marginLeft: 20, width: 55, }} />
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", flex: 1, marginHorizontal: 40, }}>
          <Text style={{ color: colors.textColor, fontSize: 20 }}>Profile information</Text>
        </TouchableOpacity>

        <TouchableOpacity syle={{}} onPress={() => navigation.navigate("EditProfile")}>
          <Feather name={"edit"} style={{ color: colors.primary1, fontSize: 20, marginLeft: 50, marginHorizontal: 22, }} />
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 30, }}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.inactive} size={20} />
          <Text style={{ color: colors.primary1, marginLeft: 10 }}>Name</Text>
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ color: colors.textColor, }}>Kiyotoka</Text>
          </View>
        </View>

        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.inactive} size={20} />
          <Text style={{ color: colors.primary1, marginLeft: 10 }}>Email</Text>
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ color: colors.textColor, }}>Kiyotoka@gmail.com</Text>
          </View>
        </View>

        <View style={styles.action}>
          <Feather name="phone" color={colors.inactive} size={20} />
          <Text style={{ color: colors.primary1, marginLeft: 10 }}>Phone</Text>
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ color: colors.textColor, }}>012345678</Text>
          </View>
        </View>

        <View style={styles.action}>
          <FontAwesome name="calendar" color={colors.inactive} size={20} />
          <Text style={{ color: colors.primary1, marginLeft: 10 }}>Birth date</Text>
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ color: colors.textColor, }}>Jul 7 2000</Text>
          </View>
        </View>


        <View style={styles.action}>
          <Icon name="human-male-female" color={colors.inactive} size={20} />
          <Text style={{ color: colors.primary1, marginLeft: 10 }}>Gender</Text>
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ color: colors.textColor, }}>Male</Text>
          </View>
        </View>

        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.inactive} size={20} />
          <Text style={{ color: colors.primary1, marginLeft: 10 }}>Address</Text>
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ color: colors.textColor, }}>2773 Tail Ends Road, USA</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    flexDirection: "column"
  },
  commandButton: {
    paddingHorizontal: 100,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: colors.primary1,
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
});