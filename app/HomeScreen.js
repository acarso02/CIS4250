import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Modal, Image, Input, View, Button, 
        Pressable, ScrollView, ImageBackground, Dimensions, 
        Text, TextInput, StatusBar, TouchableOpacity, 
        TouchableWithoutFeedback, ListViewComponent} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchBar } from 'react-native-elements';

import { utils } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

import SignInScreen from './SignInScreen';
import SettingsScreen from './SettingsScreen';
import Notifications from './Notifications';
import Profile from './Profile';
import Upload from './Upload';
import PollDetails from './PollDetails';
import Card from './card';
import { render } from 'react-dom';

const HomeScreen = ({navigation}) => {

  //const image = {uri: "https://toppng.com/uploads/preview/orange-splat-orange-paint-splash-11562922076goctvo3zry.png"};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pollArr, setPollArr] = useState([]);
  

  /*Creates a user listener to hold the state of the user*/
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    getPolls();
    return subscriber; // unsubscribe on unmount
  }, []); 

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing)
      setInitializing(false);
  } 

  function getPolls(){ 
      var tempArr = []; 
      firestore()
      .collection('polls')
      .get() 
      .then(querySnapshot => {
      console.log('Total polls: ', querySnapshot.size)
      
      querySnapshot.forEach(documentSnapshot => {
        tempArr.push(documentSnapshot.data());
        console.log('Poll ID: ', documentSnapshot.id, documentSnapshot.data().Title);
        
      });
      setPollArr(tempArr);     
    }); 
  }
  
  if (initializing) return null;

  // let arr = []

  // querySnapshot.forEach(documentSnapshot => {
  //   arr.push(<View>data</View>)
  // })


  /* Signs the user out of the app and returns to the signin page */
  function signOut(){

    if(user){
      auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate(SignInScreen);
      })
    }
    else { //Shouldn't be reaching here but does for some reason. When signing in it doesn't recognize the user
      console.log('User not signed in!');
      navigation.navigate(SignInScreen);
    }
    
  }

  //IMPORTANT TO LEARN MAPPING STATEMENTS AND HOW THEY CAN BE USED
  //imageList.map(image => (<Text>Name:{image.fileName}</Text>))

  return (
    <ScrollView style={{flex: 1,backgroundColor:'white'}}
    showsVerticalScrollIndicator={false}> 
      
      <View> 
        <SearchBar
          placeholder='Search' 
          textFieldBackgroundColor='blue'
          />
      </View>

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

      <View style={styles.background}>
        
        <StatusBar style="auto" />

        <Button title = "Create Poll" color="green" onPress={() =>{navigation.navigate(Upload)}}> </Button>
        <Button title = "Settings" color="teal" onPress={() =>{navigation.navigate(SettingsScreen)}}> </Button>
        <Button title = "Notifications" color="purple" onPress={() =>{navigation.navigate(Notifications)}}> </Button>
        <Button title = "user" color="purple" onPress={() =>{console.log(user)}}> </Button>
        <Button title = "Profile" color="blue" onPress={() =>{navigation.navigate(Profile)}}> </Button>
        <Button 
          title = "MyPoll" 
          color="black" 
          onPress={() => {
            navigation.navigate('PollDetails',{
              id: '-MyFTS4sQw6PtR7talMm',
            });
          }}
        />

        <Button title = "Sign Out" color="black" onPress={() =>{signOut()}}> </Button>
    
      </View>
      
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: 'seashell',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  logo: {
    width: 200,
    height: 400,
  },
 
  inputView: {
    backgroundColor: "lavender",
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginBottom: 25,
    alignItems: "center",
    textAlign: 'center',
  },

  loginButton: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginLeft: 150,
    alignItems: "center",
  },

    loginButton: {
    width: '100%',
    height: 100,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  }
});

export default HomeScreen;