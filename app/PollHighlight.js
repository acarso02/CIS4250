import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, Component } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Modal, Image, Input, View, Button, 
        Pressable, ScrollView, ImageBackground, Dimensions, 
        Text, TextInput, StatusBar, TouchableOpacity, 
        TouchableWithoutFeedback, ListViewComponent, Switch, ActivityIndicator, ListView} from "react-native"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImagePicker, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { DateInput } from 'react-native-date-input';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import Card from './card';

import { utils } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { FlatList } from 'react-native-web';

const PollHighlight = ({route, navigation}) => {

  /*Creates a user listener to hold the state of the user*/
  const [initializing, setInitializing] = useState(true);
  const [image1Url, setImage1Url] = useState(null);
  const [image2Url, setImage2Url] = useState(null);
  const [voteCount1, setVoteCount1] = useState(0);
  const [voteCount2, setVoteCount2] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState();
  const [poll, setPoll] = useState('not downloaded');
  const [imageUrisLoaded, setImageUrisLoad] = useState(false);
  const [title, setTitle] = useState('temp');
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState('');
  const {pollID} = route.params;

  useEffect( async () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(pollID);
    await getPoll();
    
    setInitializing(false);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing)
      setInitializing(false);
  } 

  async function getPoll(){
    var tempPoll;

    await firestore()
      .collection('polls')
      .doc(pollID)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          tempPoll = docSnapshot.data();
          console.log(tempPoll);
          setPoll(tempPoll);
          getImage1(tempPoll);
          getImage2(tempPoll);
          setTitle(tempPoll.Title);
          setComments(tempPoll.Comments)
        }
      })
  }

  async function getImage1(p){
    await firebase.storage()
      .ref('/Poll-Images/' + p.Images.Image1.imageName)
      .getDownloadURL()
      .then((url) => {
        setImage1Url(url);
      })
      .catch((e) => console.log('error while getting image ', e));
  }

  async function getImage2(p){
    await firebase.storage()
      .ref('/Poll-Images/' + p.Images.Image2.imageName)
      .getDownloadURL()
      .then((url) => {
        setImage2Url(url);
      })
      .catch((e) => console.log('error while getting image ', e));
  }

  function postComment(){
    var date = new Date();
    const tempComment = {
      comment: myComment,
      user: auth().currentUser.displayName,
      date: date};

    const ref = firestore()
      .collection('polls')
      .doc(pollID);

    ref.update({
      'Comments': firestore.FieldValue.arrayUnion(tempComment)
    })
    .then(
      setComments(prevArray => [...prevArray, tempComment])
    )

  }

  //Dynamic Styles
  //base image style off of selection
  const imageStyle = function(i) {
    if(i==selectedImage){
      return {
        height: 250,
        width: 180,
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 5,
        borderColor: 'black'
      }
    }
    else{
      return {
        height: 250,
        width: 180,
        borderRadius: 5,
        flexDirection: 'row',
      }
    }
  }

  const renderItem = ({ comment }) => (
    <View>
      <Text style={{fontSize: 18}}>{comment}</Text>
    </View>
  );
 
  return(
    
    <ScrollView style={{flex: 1,backgroundColor:'white'}}
    showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.titleText}>{title}</Text>
      </View>


      <View style={styles.imageContainer}>
        <TouchableOpacity 
          onPress={() => {setSelectedImage(1)}}>
          <Image style={imageStyle(1)} source={{uri: image1Url}}/>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {setSelectedImage(2)}}>
          <Image style={imageStyle(2)} source={{uri: image2Url}}/>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{fontSize: 24, flexDirection: 'row', marginLeft: 20}}>Comments:</Text>
      </View>

      <View style={styles.commentSection}>
        <ScrollView>
          {comments.map((comment)=> {
            return (
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{comment.user}:  </Text>
                <Text style={{fontSize: 18}}>{comment.comment}</Text>
              </View>
            )}
          )}
        </ScrollView>
      </View>
      
      <View style={styles.inputSection}>
        <TextInput style={styles.input} placeholder="Comment" onChangeText={(thisComment) => setMyComment(thisComment)}></TextInput>
        <Button style={{flex: 1}} title='Submit' onPress={() => {postComment()}}></Button>
      </View>

    </ScrollView >
  )

}



const styles  = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 48
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    marginBottom: 40,
    justifyContent: 'space-evenly',
  },
  commentSection: {
    padding: 10,
    height: 180,
    width: '90%',
    backgroundColor: 'grey',
    alignSelf: 'center'
  },
  inputSection: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  input: {
    height: 40,
    width: '90%',
    fontSize: 18,
    alignSelf: 'center',
    flex: 1
  }

});
export default PollHighlight;