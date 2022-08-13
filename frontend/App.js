import { React } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BotTab from "./navigation/BotTab";
import StartScreen from "./navigation/StartScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"StartScreen"} component={StartScreen} />
        <Stack.Screen name={"BotTab"} component={BotTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
