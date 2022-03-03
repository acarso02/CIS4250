import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Image, Input, View, Button, ScrollView, ImageBackground, Dimensions, Text, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ListViewComponent} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchBar } from 'react-native-elements';
import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';
import Notifications from './Notifications';
import Profile from './Profile';
import Upload from './Upload';

const SettingsScreen = () => {
    return(
      <ScrollView style={{flex: 1,backgroundColor:'white'}}
          showsVerticalScrollIndicator={false}>

        <View>
          <Text>Hi</Text>
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
  
    loginButton: {
      
      width: '100%',
      height: 35,
      alignItems: 'center',
      //backgroundColor:'black',
      borderRadius:40,
      paddingBottom:0,
      marginTop:20
  }
  });

export default SettingsScreen;