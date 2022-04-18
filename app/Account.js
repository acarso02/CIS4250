import { Ionicons } from '@expo/vector-icons';
import {
  TouchableRipple
} from 'react-native-paper';
import React, { useState } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Input, View, Button, ScrollView, ImageBackground, Dimensions, Text, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ListViewComponent} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchBar } from 'react-native-elements';
import SignIn from './SignInScreen';
import SettingsScreen from './SettingsScreen';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Upload from './Upload';
import { useUser } from "./useUser";

const Account = ({navigation}) => {

    const {user, initializing} = useUser();

    // console.log(user);

    return (
    <ScrollView style={styles.rowContainer}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.headerOne}> Account Information</Text>
        <View style={styles.menuWrapper}>
         <View style={styles.menuItem}>
          <Text style={styles.menuItemText}> Username</Text>
          <Text style={styles.menuItemRight}> {user?.displayName}</Text>
        </View>
        </View>
        <View style={styles.menuWrapper}>

          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Email Address</Text>
            <Text style={styles.menuItemRight}> {user?.email}</Text>
          </View>

        </View>

      
    </ScrollView>
    )
}

const styles = StyleSheet.create({

    checkMark: {
      flex: 0.3,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems:'center',
      paddingBottom:70,
      marginTop:0
    },

    rowContainer: {
    flex: 1
  },
  
    loginButton: {
      
      width: '100%',
      height: 35,
      alignItems: 'center',
      //backgroundColor:'black',
      borderRadius:40,
      paddingBottom:0,
      marginTop:20
  },

  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  headerOne: {
    color: '#793bf5',
    marginLeft: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 22,
  },
  menuItemText: {
    color: 'black',
    width: 100,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
  },
  menuItemRight: {
    color: 'grey',
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 90,
    flexDirection: "row",
  },
    menuWrapper: {
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  input: {
    height: 40,
    borderWidth: 1
  },

  });
export default Account;