import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Button, Text, TouchableWithoutFeedback} from "react-native"
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/HomeScreen';
import SignIn from './app/SignInScreen';
import Register from './app/Register';
import SettingsScreen from './app/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Tabs from './navigation/tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

<<<<<<< HEAD
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>   
        <Stack.Screen name="Home" component={HomeScreen} options = {{title: 'Welcome'}}/>
=======
export default () => (
  <NavigationContainer>
      <Stack.Navigator>
  
        <Stack.Screen options = {{headerShown:false}} name="Home" component={HomeScreen} />
>>>>>>> bb4169a3f4fd2ae7e50208ce6a88d3aadaa058f7
        <Stack.Screen name="SignIn" component={SignIn} options = {{title: 'Sign in'}}/>

        <Stack.Screen name="Register" component={Register} options = {{headerShown: false}}/>
      </Stack.Navigator>
      
    </NavigationContainer>
);


export const TabStack = () => {
  return(
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{tabBar}}/>
    </Tab.Navigator>
  </NavigationContainer>
  );
  
}


