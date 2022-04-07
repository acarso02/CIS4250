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

const PollDetails = ({ route, navigation }) => {

    const [loading, setLoading] = useState(false);
    const [pollArr, setPollArr] = useState([]);
    const { id } = route.params;

    /*Creates a user listener to hold the state of the user*/
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [poll, setPoll] = useState();
    const [imageUrisLoaded, setImageUrisLoad] = useState(false);

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      console.log(auth().currentUser.displayName); 
      var tempArr = []; 
      firestore()
        .collection('polls')
        .where('User', '==', auth().currentUser.displayName)
        .get() 
        .then(querySnapshot => {
        console.log('Total polls: ', querySnapshot.size)
      
      querySnapshot.forEach(documentSnapshot => {
        tempArr.push(documentSnapshot.data());
        console.log('Poll ID: ', documentSnapshot.id, documentSnapshot.data().Title);
      });
        setPollArr(tempArr);     
      }); 
        return subscriber; // unsubscribe on unmount
    }, []);


    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing)
        setInitializing(false);
    }

    /*return(loading?
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

    )*/
    return(

      <ScrollView style={{flex: 1,backgroundColor:'white'}}
      showsVerticalScrollIndicator={false}>
        <Text style={styles.createText}>My Polls:</Text>
        
        <View style={{alignItems: 'center', marginVertical: 20}}> 
            
            {pollArr.map((p, k) => {

              console.log("to component: " + p.Title); 
              return (
                <Card 
                  key={k}
                  title={p.Title} 
                  tag={p.Tags}
                  date={p.PollLength}
                  username={p.User}
                  image1Name={p.Images.Image1.imageName}
                  image2Name={p.Images.Image2.imageName}
                  im1Votes={p.Images.Image1.Votes}
                  im2Votes={p.Images.Image2.Votes}/>
              );
            })}
        </View> 

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
export default PollDetails;