import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutUs from "../screens/AboutUs";
import EditProfile from "../screens/EditProfile";
import ChangePass from "../screens/ChangePass";
import ProjectDetail from "../screens/ProjectDetail";
import Notification from "../screens/Notification";
import Account from "../screens/Account";
import ProfileInfo from "../screens/ProfileInfo";
import colors from "../constants/colors";
import ProjectList from "../screens/ProjectList";


const Stack = createNativeStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="account" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"account"} component={Account} />
      <Stack.Screen name={"AboutUs"} component={AboutUs} />
      <Stack.Screen name={"ProfileInfo"} component={ProfileInfo} />
      <Stack.Screen name={"EditProfile"} component={EditProfile} />
      <Stack.Screen name={"ChangePass"} component={ChangePass} />
    </Stack.Navigator>
  );
}

const ProjectStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProjectList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"ProjectList"}
        component={ProjectList} />
      <Stack.Screen name={"ProjectDetail"} component={ProjectDetail} />
    </Stack.Navigator>
  );
}

const NotifStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="notification" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"notification"} component={Notification} />
    </Stack.Navigator>
  );
}




const Tab = createBottomTabNavigator();

const BotTab = () => {
  const screenOptions = () => ({

    headerShown: false,
    tabBarActiveTintColor: colors.primary1,
    tabBarInactiveTintColor: colors.inactive,
    tabBarActiveBackgroundColor: colors.mainBackground,
    tabBarInactiveBackgroundColor: colors.mainBackground,
  });
  return (
    <Tab.Navigator initialRouteName="Projects" screenOptions={screenOptions}>
      <Tab.Screen name={"Projects"} component={ProjectStackNavigator} options={{ tabBarLabel: 'Project', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="folder" color={color} size={size} />), }} />
      <Tab.Screen name={"Notification"} component={NotifStackNavigator} options={{ tabBarLabel: 'Notification', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="bell" color={color} size={size} />), }} />
      <Tab.Screen name={"Account"} component={AccountStackNavigator} options={{ tabBarLabel: 'Account', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account" color={color} size={size} />), }} />

    </Tab.Navigator>
  );
};

export default BotTab;