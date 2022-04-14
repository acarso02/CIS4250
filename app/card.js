import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,  View, Dimensions, Image, Button, TouchableOpacity, Pressable } from 'react-native';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PollHighlight from './PollHighlight';
import { render } from 'react-dom';

const Card = (props) => {
  const [image1Url, setImage1Url] = useState(undefined);
  const [image2Url, setImage2Url] = useState(undefined);
  const [voteCount1, setVoteCount1] = useState(0);
  const [voteCount2, setVoteCount2] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    //get images from storage
    getImage1();
    getImage2();

    //set the vote counts 
    setVoteCount1(props.im1Votes);
    setVoteCount2(props.im2Votes);
  }, [image1Url, image2Url, props]); 

  //I'm so sorry about how bad of a solution this is.. its 3am
  function getImage1(){
    firebase.storage()
      .ref('/Poll-Images/' + props.image1Name)
      .getDownloadURL()
      .then((url) => {
        setImage1Url(url);
      })
      .catch((e) => console.log('error while getting image ', e));
  }
  function getImage2(){
    console.log(props.image2Name);
    firebase.storage()
      .ref('/Poll-Images/' + props.image2Name)
      .getDownloadURL()
      .then((url) => {
        setImage2Url(url);
      })
      .catch((e) => console.log('error while getting image ', e));
  }

  //vote button onPress
  function castVote() {

    if(props.hasVoted.includes(props.currentUser)){   //user is in the hasVoted list
      alert('You already voted on that poll')
    }
    else{   //user not in hasVoted list
      const ref = firestore()
      .collection('polls')
      .doc(props.pollID);

      if(selectedImage == 1){
        ref.update({
          'Images.Image1.Votes': firestore.FieldValue.increment(1)
        });
        setVoteCount1(voteCount1 + 1);
      }
      else if(selectedImage == 2){
        ref.update({
          'Images.Image2.Votes': firestore.FieldValue.increment(1)
        });
        setVoteCount2(voteCount2 + 1);
      }
      else{
        alert('Select an Image First')
      }
      //update remote list
      ref.update({
          'hasVoted': firestore.FieldValue.arrayUnion(props.currentUser)
      })
      //update local list
      props.hasVoted.push(props.currentUser);
    }
  }

//Dynamic Styles
  //base image style off of selection
  const imageStyle = function(i) {
    if(i==selectedImage){
      return {
        height: 200,
        width: 140,
        marginHorizontal: 5,
        borderRadius: 10,
        flexDirection: 'row',
        borderWidth: 5,
        borderColor: 'black'
      }
    }
    else{
      return {
        height: 200,
        width: 140,
        marginHorizontal: 5,
        borderRadius: 10,
        flexDirection: 'row',
      }
    }
  }

  return (
    <View style={styles.cardContainer}>

      <View style={styles.titleArea}>
        <Pressable style={styles.titleText} onPress={()=>{navigation.navigate('PollHighlight', {pollID: props.pollID})}}>
          <Text style={styles.titleText}>{props.title}</Text>
        </Pressable>

        <TouchableOpacity style={styles.tag} >
          <Text style={{flex: 1, margin: 5}}>#{props.tag}</Text>
        </TouchableOpacity>
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
        <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold'}}>{voteCount1}</Text>
        <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold'}}>{voteCount2}</Text>
      </View>
      
      <View style={styles.bottomContainer}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>{props.username}</Text>
        </View>
        <Button style={styles.buttons} title="VOTE" color="#F51007" onPress={() => {castVote()}}></Button>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.dateText}>{props.date.toDate().toLocaleDateString()}</Text>
        </View>
      </View>

    </View>
  )
}



const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  cardContainer: { 
    width: deviceWidth - 50, 
    backgroundColor: '#ED6C11',
    height: 350,
    borderRadius: 15,

    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 10,

    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  bottomContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }, 
  buttons: {
    margin: 10,
    alignSelf: 'center',
    flex: 1
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
  },
  titleArea: {
    flexDirection: "row",
  },
  tag: {
    borderRadius: 20,
    backgroundColor: '#F2A50C',
    height: 30,
    margin: 5,
  },
  dateText: {
    textAlign: 'right',
  },
  votesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default Card;
