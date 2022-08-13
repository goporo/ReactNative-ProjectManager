import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePass = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", height: 65, alignItems: "center", paddingBottom: 10, }}>

        <TouchableOpacity onPress={() => navigation.navigate("account")}>
          <Icon name={"chevron-left"} style={{ color: colors.primary1, fontSize: 30, marginLeft: 20, width: 55, }} />
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", flex: 1, marginHorizontal: 40, }}>
          <Text style={{ color: "black", fontSize: 20 }}>Change password</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name={"edit"} style={{ color: "black", fontSize: 20, marginLeft: 50, marginHorizontal: 22, }} />
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 30 }}>
        <View style={styles.action}>
          <Feather name="lock" color={colors.inactive} size={20} />
          <TextInput
            placeholder="Enter current password"
            placeholderTextColor="#dcdcdc"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.Text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="lock" color={colors.inactive} size={20} />
          <TextInput
            placeholder="Enter new password"
            placeholderTextColor="#dcdcdc"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.Text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="lock" color={colors.inactive} size={20} />
          <TextInput
            placeholder="Confirm new password"
            placeholderTextColor="#dcdcdc"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.Text,
              },
            ]}
          />
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={() => navigation.navigate("account")}>
          <Text style={styles.panelButtonTitle}>Confirm</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground
  },
  commandButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.primary1,
    alignItems: 'center',
    marginTop: 20,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
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

export default ChangePass;