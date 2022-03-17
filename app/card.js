import React, { useState } from 'react';
import { StyleSheet, Text,  View, Dimensions, Image, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Card = (props) => {
  const [image1Url, setImage1Url] = useState(undefined);
  const [image2Url, setImage2Url] = useState(undefined);

  const [image1Votes, setImage1Votes] = useState(0);
  const [image2Votes, setImage2Votes] = useState(0);

  //I'm so sorry about how bad of a solution this is.. its 3am
  function getImage1(){
    console.log(props.image1Name);
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


  return (
    <View style={styles.cardContainer}> 
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>{props.title}</Text>
          <TouchableOpacity style={styles.tag} >
            <Text style={{flex: 1, margin: 5}}>#{props.tag}</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity >
          {getImage1()}
          <Image style={styles.imageStyle} source={{uri: image1Url}}/>
        </TouchableOpacity>

        <TouchableOpacity >
          {getImage2()}
          <Image style={styles.imageStyle} source={{uri: image2Url}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.votesContainer}>
        <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold'}}>{props.im1Votes}</Text>
        <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold'}}>{props.im2Votes}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>{props.username}</Text>
        </View>
        <Button style={styles.buttons} title="VOTE" color="#F51007"></Button>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.dateText}>{props.date.toString()}</Text>
        </View>
      </View>
    </View>
  )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  cardContainer: { 
    width: deviceWidth - 50, 
    backgroundColor: '#aaaaaa',
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
  imageStyle: {
    height: 200,
    width: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row'
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
    flex: 1
  },
  votesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default Card;
