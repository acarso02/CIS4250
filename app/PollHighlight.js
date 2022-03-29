import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, Component } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Modal, Image, Input, View, Button, 
        Pressable, ScrollView, ImageBackground, Dimensions, 
        Text, TextInput, StatusBar, TouchableOpacity, 
        TouchableWithoutFeedback, ListViewComponent, Switch, ActivityIndicator} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImagePicker, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { DateInput } from 'react-native-date-input';
import * as Progress from 'react-native-progress';

import dayjs from 'dayjs';
import HomeScreen from './HomeScreen';
import Card from './card';

import { utils } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

const PollHighlight = ({ route, navigation }) => {


    /*Creates a user listener to hold the state of the user*/
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [poll, setPoll] = useState();
    const [imageUrisLoaded, setImageUrisLoad] = useState(false);

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      console.log(auth().currentUser.displayName); 
      return subscriber; // unsubscribe on unmount
    }, []);


    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing)
        setInitializing(false);
    }

    return(

      <ScrollView style={{flex: 1,backgroundColor:'white'}}
      showsVerticalScrollIndicator={false}>


      </ScrollView>
    )

}



const styles  = StyleSheet.create({

    createText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing:2,
        textAlign:'center',
        paddingTop:0
    },
    imagePane: {
        width: '98%',
        height: '50%',
        marginLeft: '1%',
        marginTop: '1%',
        backgroundColor:'white',
        borderWidth: 1,
        borderRadius: 10,
        elevation: 1
      },
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      },
})
export default PollHighlight;