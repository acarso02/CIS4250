import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Button, Text, TouchableWithoutFeedback} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/HomeScreen';
import SignIn from './app/SignInScreen';
import Register from './app/Register';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options = {{title: 'Welcome'}}/>
        <Stack.Screen name="SignIn" component={SignIn} options = {{title: 'Sign in'}}/>
        <Stack.Screen name="Register" component={Register} options = {{title: 'Register'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack

