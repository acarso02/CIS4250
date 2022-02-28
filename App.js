import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Button, Text, TouchableWithoutFeedback} from "react-native"
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/HomeScreen';
import SignInScreen from './app/SignInScreen';
import Register from './app/Register';
import SettingsScreen from './app/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Tabs from './navigation/tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="SignInScreen" component={SignInScreen} options = {{headerShown:false}} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options = {{title: 'Home'}}/>
        <Stack.Screen name="Register" component={Register} options = {{headerShown: false}}/>
      </Stack.Navigator>

    </NavigationContainer>
);


// export const TabStack = () => {
//   return(
//     <NavigationContainer>
//     <Tab.Navigator>
//       <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{tabBar}}/>
//     </Tab.Navigator>
//   </NavigationContainer>
//   );

// }