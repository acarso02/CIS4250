import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Image, Input, View, Button, ScrollView, ImageBackground, Dimensions, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ListViewComponent} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchBar } from 'react-native-elements';
import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';
import Notifications from './Notifications';
import Profile from './Profile';
import Upload from './Upload';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

const SettingsScreen = () => {

  return(
    <ScrollView style={{flex: 1,backgroundColor:'white'}}
        showsVerticalScrollIndicator={false}>

        {/* Top View of the Brand */}
      <View style={styles.brandView}>
        <Ionicons style={styles.shadow} name="settings-sharp" size={120} color="#00A6C2" />
        
      </View>

      <View style={styles.bottomView}>
        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account" color="#00A6C2" size={25}/>
              <Text style={styles.menuItemText}>Edit profile</Text>
              <View style = {styles.chevronArrow}>
                <Icon name="chevron-right" color="#00A6C2" size={25}/>
              </View>
              
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="form-textbox-password" color="#00A6C2" size={25}/>
              <Text style={styles.menuItemText}>Change password</Text>
              <View style = {styles.chevronArrow}>
                <Icon name="chevron-right" color="#00A6C2" size={25}/>
              </View>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="bell-outline" color="#00A6C2" size={25}/>
              <Text style={styles.menuItemText}>Manage notifications</Text>
              
              <View style = {styles.chevronArrow}>
                <Icon name="chevron-right" color="#00A6C2" size={25}/>
              </View>
              
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="book-account-outline" color="#00A6C2" size={25}/>
              <Text style={styles.menuItemText}>Privacy policy</Text>

              <View style = {styles.chevronArrow}>
                <Icon name="chevron-right" color="#00A6C2" size={25}/>
              </View>
            </View>
          </TouchableRipple>
        </View>
        </View>
      
      
      
    </ScrollView>

  )
  // <Tab.Navigator>
        // <Tab.Screen name="Home" component={HomeScreen}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
        //         return (
        //           <Image
        //             style={{ width: size, height: size }}
        //             source={{
        //               uri:
        //                 'https://img.icons8.com/color-glass/48/000000/home.png',
        //             }}
        //           />
        //         );
        //       }, }} />
        //   <Tab.Screen name="Notifications" component={Notifications}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
        //         return (
        //           <Image
        //             style={{ width: size, height: size }}
        //             source={{
        //               uri:
        //                 'https://img.icons8.com/color-glass/48/000000/appointment-reminders.png',
        //             }}
        //           />
        //         );
        //       },  }} />
        //   <Tab.Screen name="Upload" component={Upload}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
        //         return (
        //           <Image
        //             style={{ width: size, height: size }}
        //             source={{
        //               uri:
        //                 'https://img.icons8.com/color-glass/48/000000/camera.png',
        //             }}
        //           />
        //         );
        //       },  }} />
        //   <Tab.Screen name="Profile" component={Profile}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
        //         return (
        //           <Image
        //             style={{ width: size, height: size }}
        //             source={{
        //               uri:
        //                 'https://img.icons8.com/color/48/000000/user.png',
        //             }}
        //           />
        //         );
        //       },  }} />

          
        // </Tab.Navigator>
    
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
    chevronArrow: {
      justifyContent:'flex-end',
      //paddingVertical: 15,
      //paddingHorizontal: 60,

    },

    brandView:{
      flexDirection:'row',
      justifyContent: 'center',
      marginLeft:20,
      alignItems: 'center',
      backgroundColor:'white'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  
    menuWrapper: {
      marginTop: 10,
    },

    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },

    menuItemText: {
      color: 'black',
      fontWeight:'bold',
      letterSpacing: 2,
      marginLeft: 20,
      //fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },

    bottomView:{
      flex: 1.5,
      backgroundColor: '#E65400',
      bottom: 0,
      borderTopStartRadius: 30,
      borderTopEndRadius: 30,
      borderBottomStartRadius:30,
      borderBottomEndRadius:30,
      marginTop: 50,
      elevation: 5
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