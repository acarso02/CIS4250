import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, Component } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Modal, Image, Input, View, Button, 
        Pressable, ScrollView, ImageBackground, Dimensions, 
        Text, TextInput, StatusBar, TouchableOpacity, 
        TouchableWithoutFeedback, ListViewComponent, Switch, ActivityIndicator, ListView, Alert} from "react-native"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImagePicker, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { DateInput } from 'react-native-date-input';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Card from './card';

import { utils } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { FlatList } from 'react-native-web';

import HomeScreen from './HomeScreen';

const PollHighlight = ({route, navigation}) => {

  /*Creates a user listener to hold the state of the user*/
  const [initializing, setInitializing] = useState(true);
  const scrollViewRef = React.useRef();
  const [image1Url, setImage1Url] = useState(null);
  const [image2Url, setImage2Url] = useState(null);
  const [voteCount1, setVoteCount1] = useState(0);
  const [voteCount2, setVoteCount2] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState();
  const [creator, setCreator] = useState('');
  const [poll, setPoll] = useState('not downloaded');
  const [imageUrisLoaded, setImageUrisLoad] = useState(false);
  const [title, setTitle] = useState('temp');
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState('');
  const [percents, setPercents] = useState({percentage1: 20, percenatge2: 22});
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
          setComments(tempPoll.Comments);
          setVoteCount1(tempPoll.Images.Image1.Votes);
          setVoteCount2(tempPoll.Images.Image2.Votes);
          setCreator(tempPoll.User);
          var total = tempPoll.Images.Image1.Votes + tempPoll.Images.Image2.Votes;
          if(total == 0){
            setPercents({percentage1: 0, percentage2: 0});
          }
          else{
            setPercents({percentage1: (tempPoll.Images.Image1.Votes/total)*100, percentage2: (tempPoll.Images.Image2.Votes/total)*100});
          }
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

  function deletePoll(){
    //remove from database
    firestore()
      .collection('polls')
      .doc(pollID)
      .delete()
      .then(() => {
        console.log("deleted!!!");
      });

    //return home
    navigation.goBack();
  }

  function getPercentage(){
    const total = voteCount1 + voteCount2
    if(total == 0){
      return{percentage1: 0, percentage2: 0};
    }
    else{
      return({percentage1: voteCount1/total, percentage2: voteCount2/total});
    }
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
  
    return(
      
      <ScrollView style={{flex: 1,backgroundColor:'white'}}
      showsVerticalScrollIndicator={false}>

        <View style={{flexDirection: 'column'}}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={{fontSize: 18, textAlign: 'center'}}>By: {creator}</Text>
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

        <View style={styles.votesContainer}>
          <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 23}}>{percents.percentage1}%</Text>
          <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 23}}>{percents.percentage2}%</Text>
        </View>

        <View>
          <Text style={{fontSize: 24, flexDirection: 'row', marginLeft: 20}}>Comments:</Text>
        </View>

        <View style={styles.commentSection}>
          <ScrollView ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }>
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

        {poll.UserId == auth().currentUser.uid && 
          <View style={{width: 120, alignSelf: 'center', marginVertical: 10}}>
            <Button title='Delete Poll' color='red' onPress={()=>{    
              Alert.alert( "Confirm",
                'Are you sure you want to delete this Poll?',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'Delete', onPress: () => deletePoll(), style: 'destructive'},
                ],
                { cancelable: false }
              )}}>
            </Button>
          </View>
        }

      </ScrollView >
    )
}

const styles  = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 48,
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    marginBottom: 10,
    justifyContent: 'space-evenly',
  },
  commentSection: {
    padding: 10,
    height: 180,
    width: '90%',
    backgroundColor: '#FFC46D',
    alignSelf: 'center'
  },
  inputSection: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    paddingLeft: 5
  },
  input: {
    height: 40,
    width: '90%',
    fontSize: 18,
    alignSelf: 'center',
    flex: 1,
  },
  deleteButton: {
    flex: 1,
    height: 20,
    width: 60,
    fontSize: 20,
    justifyContent: 'flex-end',
    color: 'red'
  },
  votesContainer: {
    flexDirection: 'row',
    marginBottom: 10
  }

});
export default PollHighlight;