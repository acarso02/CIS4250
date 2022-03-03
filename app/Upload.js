import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Input, View, Button, ScrollView, ImageBackground, Dimensions, Text, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ListViewComponent} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignInScreen';
import Register from './Register';
import SettingsScreen from './SettingsScreen';

const Upload = ({navigation}) => {

    return (
  <View>
    <Text style={styles.createText}>
      Upload
    </Text>
  </View>
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

export default Upload;