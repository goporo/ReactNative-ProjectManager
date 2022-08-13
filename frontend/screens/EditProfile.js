import { React } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", height: 65, alignItems: "center", paddingBottom: 10, }}>

        <TouchableOpacity onPress={() => navigation.navigate("ProfileInfo")}>
          <Icon name={"chevron-left"} style={{ color: colors.primary1, fontSize: 30, marginLeft: 20, width: 55, }} />
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", flex: 1, marginHorizontal: 40, }}>
          <Text style={{ color: colors.Text, fontSize: 20 }}>Edit profile</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name={"edit"} style={{ color: colors.mainBackground, fontSize: 20, marginLeft: 50, marginHorizontal: 22, }} />
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 30, }}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.inactive} size={20} />
          <TextInput
            placeholder="Name"
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
          <FontAwesome name="envelope-o" color={colors.inactive} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#dcdcdc"
            keyboardType="email-address"
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
          <Feather name="phone" color={colors.inactive} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#dcdcdc"
            keyboardType="number-pad"
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
          <FontAwesome name="calendar" color={colors.inactive} size={20} />
          <TextInput
            placeholder="Birth date"
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
          <Icon name="human-male-female" color={colors.inactive} size={20} />
          <TextInput
            placeholder="Gender"
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
          <Icon name="map-marker-outline" color={colors.inactive} size={20} />
          <TextInput
            placeholder="Address"
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

        <TouchableOpacity style={styles.commandButton} onPress={() => navigation.navigate("ProfileInfo")}>
          <Text style={styles.panelButtonTitle}>Confirm</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground
  },
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