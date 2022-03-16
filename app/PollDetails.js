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

import { utils } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

const PollDetails = ({ route, navigation }) => {

    const [loading, setLoading] = useState(false);
    const { id } = route.params;

    /*Creates a user listener to hold the state of the user*/
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [poll, setPoll] = useState();
    const [imageUris, setImageUris] = useState([]);

    useEffect(() => {

        database()
        .ref(`/Polls/${id}`)
        .once('value')
        .then(snapshot => {
            console.log(snapshot.val());
            setPoll(snapshot.val());
            console.log(loading);
            setImages();
        });

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function setImages(){

        database()
        .ref()
    }

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing)
        setInitializing(false);
    }
    
    if (initializing) return null;

    return(loading?
        <View>
          <Text style={styles.createText}>
            Title Yeet
          </Text>
          <View style={styles.imagePane}>
            <Image style={{height: 200, width: 200}} source={{uri: imageUri}} />

          </View>
          <Button title = "Profile" color="blue" onPress={() => {console.log(poll)}}/>
        </View>
        :<View style={styles.horizontal, styles.container}><Progress.Circle size={100} thickness={1000} indeterminate={true} /></View>
    )

}

export default PollDetails;

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