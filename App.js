import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Button, Text, TouchableWithoutFeedback} from "react-native"
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './app/HomeScreen';
import SignInScreen from './app/SignInScreen';
import Register from './app/Register';
import SettingsScreen from './app/SettingsScreen';
import Notifications from './app/Notifications';
import Profile from './app/Profile';
import Upload from './app/Upload';
import PollDetails from './app/PollDetails'
import PollHighlight from './app/PollHighlight';
import Account from './app/Account';

import auth from '@react-native-firebase/auth';

//import Tabs from './navigation/tabs';

const Tab = createBottomTabNavigator();

function PollStuff(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options = {{headerShown:false,title:'Home'}}/>
      <Stack.Screen name="PollHighlight" component={PollHighlight} options = {{title: 'Poll Highlight'}}/>
      <Stack.Screen name="PollDetails" component={PollDetails} options = {{headerShown:false,title: 'Poll'}}/>
    </Stack.Navigator>
  )
}

function UserStuff(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options = {{headerShown:false,title: 'Profile'}}/>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options = {{title: 'Settings'}}/>
      <Stack.Screen name="PollHighlight" component={PollHighlight} options = {{title: 'Poll Highlight'}}/>
      <Stack.Screen name="PollDetails" component={PollDetails} options = {{headerShown:false,title: 'My Polls'}}/>
      <Stack.Screen name="Account" component={Account} options = {{title: 'Account'}}/>
    </Stack.Navigator>
  )
}

function Home(){
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          let large;

          if (route.name === 'UserStuff') {
            iconName = 'person-circle-outline';
          } 
          if (route.name === 'PollStuff') {
            iconName = 'home';
          }
          if (route.name === 'Upload') {
            iconName = 'camera';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
      })}
    >        
      <Tab.Screen name="PollStuff" component={PollStuff} options = {{headerShown:false,title:'Home'}}/>
      <Tab.Screen name="Upload" component={Upload} options = {{title: 'New Poll'}}/>
      <Tab.Screen name="UserStuff" component={UserStuff} options = {{title: 'Profile'}}/>
    </Tab.Navigator>
  );
}



function Authentication(){
  return(
    <Stack.Navigator>
        <Stack.Screen name="SignInScreen" component={SignInScreen} options = {{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options = {{headerShown: false}}/>
    </Stack.Navigator>
  )
};

const Stack = createNativeStackNavigator();

export default function App() {

  /*Creates a user listener to hold the state of the user*/
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []); 

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing)
      setInitializing(false);
  } 
  
  if (initializing) return null;

  return(
    <NavigationContainer>
      <Stack.Navigator>
        {user?(
            <Stack.Screen name="Home" component={Home} options = {{headerShown:false}}/>
          ):(
            <Stack.Screen name="Authentication" component={Authentication} options = {{headerShown:false}}/>
          )
        }
      </Stack.Navigator>

    </NavigationContainer>
  )
};


