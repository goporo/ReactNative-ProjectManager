import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
const Stack = createNativeStackNavigator();

const StartScreen = () => (
    <Stack.Navigator headerMode='none' >
        <Stack.Screen options={{ headerShown: false }} name='SplashScreen' component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignInScreen" component={SignInScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
);


export default StartScreen;