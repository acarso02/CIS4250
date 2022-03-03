import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Input, View, Button, ScrollView, ImageBackground, Dimensions, Text, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ListViewComponent} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchBar } from 'react-native-elements';
import SignIn from './SignInScreen';
import SettingsScreen from './SettingsScreen';
import HomeScreen from './HomeScreen';

const Profile = ({navigation}) => {

    return (
      <ScrollView style={{flex: 1,backgroundColor:'white'}}
          showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.createText}>
            PROFILE Page
          </Text>
        </View>
        {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={{
                    uri:
                      'https://img.icons8.com/color-glass/48/000000/home.png',
                  }}
                />
              );
            }, }} />
        <Tab.Screen name="Notifications" component={Notifications}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={{
                    uri:
                      'https://img.icons8.com/color-glass/48/000000/appointment-reminders.png',
                  }}
                />
              );
            },  }} />
        <Tab.Screen name="Upload" component={Upload}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={{
                    uri:
                      'https://img.icons8.com/color-glass/48/000000/camera.png',
                  }}
                />
              );
            },  }} />
        <Tab.Screen name="Profile" component={Profile}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={{
                    uri:
                      'https://img.icons8.com/color/48/000000/user.png',
                  }}
                />
              );
            },  }} />

        
        </Tab.Navigator> */}
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

  signUpButton: {
    
    width: '100%',
    height: 35,
    alignItems: 'center',
    //backgroundColor:'black',
    borderRadius:40,
    paddingBottom:0,
    marginTop:20
},

  TextInput: {
    height: 50,
    flex: 1,
    padding: 5,
    letterSpacing:2,
    fontSize:12,
    textAlign: 'auto'
  },

  inputView: {
    backgroundColor: "whitesmoke",
    flexDirection:'row',
    borderRadius: 50,
    width: "110%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderTopRightRadius:150,
    borderTopLeftRadius:250,
    borderBottomLeftRadius:250,
    borderBottomRightRadius:230,
    //textAlign: 'center'
    
  },
  passView: {
    backgroundColor: "whitesmoke",
    flexDirection:'row',
    borderRadius: 50,
    width: "108%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderTopRightRadius:100,
    borderTopLeftRadius:250,
    borderBottomLeftRadius:200,
    borderBottomRightRadius:300,
    //textAlign: 'center'
    
  },

  phoneInput: {
    backgroundColor: "whitesmoke",
    flexDirection:'row',
    borderRadius: 350,
    width: "100%",
    height: 45,
    marginBottom: 0,
    borderTopRightRadius:150,
    borderTopLeftRadius:250,
    borderBottomLeftRadius:200,
    borderBottomRightRadius:350,
    alignItems: "center",
    //textAlign: 'center'
    
  },
  createText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing:2,
    textAlign:'center',
    paddingTop:0
  },
  middleBlob: {
    flex: 1.5,
    backgroundColor: 'orange',
    bottom: 0,
    borderTopStartRadius: 430,  
    borderTopEndRadius: 120,    
    borderBottomStartRadius:440,  
    borderBottomEndRadius:720,    
    marginTop: 30, 
  }
  
});

export default Profile;