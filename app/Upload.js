import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Modal, Image, Input, View, Button, 
        Pressable, ScrollView, ImageBackground, Dimensions, 
        Text, TextInput, StatusBar, TouchableOpacity, 
        TouchableWithoutFeedback, ListViewComponent, Switch} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImagePicker, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { DateInput } from 'react-native-date-input';
import ProgressBar from 'react-native-progress/Bar';
import dayjs from 'dayjs';
import Card from './card';

import HomeScreen from './HomeScreen';
import PollDetails from './PollDetails';
import PollHighlight from './PollHighlight';

import { utils } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Upload = ({navigation}) => {

  const [progress, setProgress] = useState(0);
  const [queryLength, setQueryLength] = useState(0);
  const [title, setTitle] = useState('');
  /* NOTE: TAGS MUST BE CHANGED TO DB ENTRY VERSION ASAP */
  // const [tags, setTags] = useState([]);
  const [tags, setTags] = useState('');
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate())
  tomorrow.setHours(0,0,0,0);
  const [endDate, setEndDate] = useState(tomorrow);
  const [imageList, setImageList] = useState([]); 
  const [uniqueKey, setUniqueKey] = useState('');
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
  const [uploadImageModalVisible, setUploadImageModalVisible] = useState(false);
  const options = { title: 'Select an Image' }

  /* Sets the switch for deciding the  */
  const [enabledComments, setEnabledComments] = useState(false);
  const toggleSwitch = () => setEnabledComments(previousState => !previousState);

  /** Creates a user listener to hold the state of the user **/
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (imageList[0]){
      console.log(imageList[0].uri)
    }
  }, [imageList]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing)
      setInitializing(false);
  }
  if (initializing) return null;

  /** Allows the user to browse their personal files and appends to a list of files **/
  function browseImages() {

    launchImageLibrary(options, (response) => {
      response.assets[0]["key"] = imageList.length
      setImageList(imageList => [...imageList, response.assets[0]]);
    }).then(() => {
      console.log(imageList);
    })

  }

  function createPoll() {

    firestore()
    .collection('polls')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
      setQueryLength(querySnapshot.size + 1);

      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });

    console.log(user.displayName, title, endDate, tags, enabledComments, imageList[0].fileName, imageList[1].fileName)
    
    let reference = storage().ref("Poll-Images/"+imageList[0].fileName);
    let task = reference.putFile(imageList[0].uri);

    console.log(queryLength);

    task.then(() => {

      console.log('Image 1 uploaded to the bucket!');

      const comments = [{user:"default",comment:"",date:firestore.Timestamp.fromDate(tomorrow)}];
      // const len = queryLength + '';
      // console.log(len);

      const comments = enabledComments?[{user:"default",comment:"",date:""}]:null;
      const len = queryLength + '';
      console.log(len);

      firestore()
      .collection('polls')
      .add({
        User: user.displayName,
        Title: title,
        PollLength: new Date(firestore.Timestamp.now().seconds*1000).toLocaleDateString(),
        Tags: tags,
        Comments: comments,
        Images: {
          Image1: {
            Votes: 0,
            imageName: imageList[0].fileName
          },
          Image2: {
            Votes: 0,
            imageName: imageList[1].fileName
          }
        },
        hasVoted: []
      })
      .then(() => {
        console.log('Saved in Realtime Database!');

        let reference2 = storage().ref("Poll-Images/"+imageList[1].fileName);
        let task2 = reference2.putFile(imageList[1].uri);

        task2.then(() => {
          console.log('Image 2 uploaded to the bucket!');
          setCreatePostModalVisible(true);
        })
        .catch((e) => {
          console.log('uploading image 2 error => ', e);
        });
      })
      .catch((e) => {
        console.log('storing poll error => ', e);
      });
    })
    .catch((e) => {
      console.log('uploading image 1 error => ', e);
    });
  }

  /* {imageList?<Text>No images found</Text>:imageList.map(image => <Image styles={styles.tinyLogo} source={image.uri}/>)} */

  if(progress == 0){
    return (
      <View style={{flex: 1,backgroundColor:'white',paddingTop: 5}}>
        <ProgressBar progress={0.2} width={393} height={8} borderRadius={20}/>
        <View style={{paddingBottom: 50,paddingTop: 5}}>
          <Text style={styles.createText}>Poll Details</Text>
        </View>
        <View>
          {/*Title input*/}
          <Text style={styles.titleText}>Title</Text>
          <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Enter Title of Poll..."
            placeholderTextColor="grey"
            onChangeText={(title) => setTitle(title)}
            />
          </View>
          {/*Poll Length input*/}
          <Text style={styles.titleText}>Poll Length</Text>

          <Text style={styles.dateText}>Current Date: {endDate.toLocaleDateString()}</Text>
          <View style={styles.dateButton}>
            <Button color="#ED6C11" onPress={showDatepicker} title="Change Date"/>
          </View>
          {/*Tags input*/}
          <Text style={styles.titleText}>Tags</Text>
          <View style={styles.dropdownInputView}>
            <Picker
              selectedValue={endDate}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setEndDate(itemValue)}
            >
              <Picker.Item label="24 Hours" value={tomorrow} />
              <Picker.Item label="2 Days" value={tomorrow.setDate(tomorrow.getDate() + 2)} />
            </Picker>
          </View>
          {/*Tags input*/}
          <Text style={styles.titleText}>Tags</Text>
          <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Enter Tags with comma (e.g. fun, colourful)"
            placeholderTextColor="grey"
            onChangeText={(tags) => setTags(tags)}
            />
          </View>
        </View>
        <View style={styles.bottomButton}>
          <Button title = "Next Page" color="#666666" onPress={() =>{title?setProgress(50):alert(`Please provide a title to continue`)}}> </Button>
        </View>
      </View>
    )
  }
  else if (progress == 50){
    return(
      <View style={{flex: 1,backgroundColor:'white'}}>
        <ProgressBar progress={0.4} width={393} height={8} borderRadius={20}/>
        <Modal 
            animationType="slide"
            transparent={true}
            visible={uploadImageModalVisible}
            onRequestClose={() => {
              console.log("Modal has been closed");
              setUploadImageModalVisible(!uploadImageModalVisible);
            }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              {imageList.length < 2?<Button title = "Upload Image" color="#ED6C11" onPress={() =>{browseImages()}}> </Button>:<Text>Maximum image limit found</Text>}
              <Text>{imageList.length} Images Uploaded</Text>
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setUploadImageModalVisible(!uploadImageModalVisible)}
              >
                <Text style={styles.textStyle}> X </Text>
              </Pressable>
            </View>
          </View>

        </Modal>
        <View style={styles.imagePane}>
          {imageList.map(image => <Image key={image.key} styles={styles.tinyLogo} source={{uri:image.uri}}/>)}
        </View>
        <View style={styles.button}>
          <Button title = "Add Images" color="black" onPress={() =>{setUploadImageModalVisible(true);}}> </Button>
        </View>
        <View style={styles.button}>
          <Button title = "Clear Images" color="black" onPress={() =>{setImageList([]);}}> </Button>
        </View>
        <View style={styles.bottomButton}>
          <View style={{marginBottom:'2%'}}>
            <Button title = "Next Page" color="#666666" onPress={() =>{imageList.length === 2?setProgress(100):alert(`Missing ${2 - imageList.length} image(s), please select two images to continue`)}}> </Button>
          </View>
          <View>
            <Button title = "Previous Page" color="#666666" onPress={() =>{setProgress(0);}}> </Button>
          </View>
        </View>
      </View>
    )
  }
  else if (progress == 100){
    return(
      <View style={{flex: 1,backgroundColor:'white'}}>
          <ProgressBar progress={0.6} width={393} height={8} borderRadius={20}/>
          <Modal 
              animationType="slide"
              transparent={true}
              visible={createPostModalVisible}
              onRequestClose={() => {
                console.log("Modal has been closed");
                setCreatePostModalVisible(!createPostModalVisible);
              }}
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                
                <Button 
                  title = "Navigate to Poll" 
                  color="black" 
                  onPress={() => {
                    navigation.navigate(PollHighlight, {
                      id: uniqueKey
                    });
                    setProgress(0);
                  }}
                />
                <Button title = "Navigate Home" color="black" onPress={() => {navigation.navigate(HomeScreen);setProgress(0);}}/>
                
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setCreatePostModalVisible(!createPostModalVisible)}
                >
                  <Text style={styles.textStyle}>Dismiss</Text>
                </Pressable>
              </View>
            </View>

        </Modal>
        <View style={{paddingBottom: 50,paddingTop: 5}}>
          <Text style={styles.createText}>Summary</Text>
        </View>
        <View style={{marginLeft:'2%',marginTop:'-8%'}}>
          <Card 
                key={"YEET"}
                currentUser={auth().currentUser.uid} //this is the current logged in user
                pollID={"YEET"}
                title={title}
                tag={tag}
                date={endDate.toLocaleDateString()}
                username={user.displayName}
                image1Name={imageList[0].fileName}
                image2Name={imageList[1].fileName}
                im1Votes={0}
                im2Votes={0}
                votedList={[]}/>
        </View>
        <View style={styles.bottomButton}>
          <View style={{marginBottom:'2%'}}>
            <Button title = "Submit" color="#666666" onPress={() =>{createPoll()}}> </Button>
          </View>
          <View>
            <Button title = "Previous Page" color="#666666" onPress={() =>{setProgress(50);}}> </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  defaultText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft:20

    // letterSpacing:2,
    // textAlign:'center',
  },

  bottomButton: {
    position: 'absolute',
    bottom:50,
    width: '90%',
    marginLeft: '5%',
  },

  dateButton: {
    // position: 'absolute',
    width: '60%',
    marginLeft: '22%',
    marginBottom: '5%',
  },

  titleText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft:20,
    textAlign:'center',
    paddingBottom:25
    // letterSpacing:2,
  },
  dateText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft:20,
    textAlign:'center',
    // letterSpacing:2,
  },

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
    width: "90%",
    height: 45,
    marginBottom: 20,
    marginLeft: '5%',
    alignItems: "center",
    borderTopRightRadius:150,
    borderTopLeftRadius:250,
    borderBottomLeftRadius:250,
    borderBottomRightRadius:230,
    borderBottomWidth: StyleSheet.hairlineWidth
    //textAlign: 'center'
    
  },
  dropdownInputView: {
    backgroundColor: "whitesmoke",
    flexDirection:'row',
    borderRadius: 50,
    width: "40%",
    height: 45,
    marginBottom: 20,
    marginLeft: '33%',
    alignItems: "center",
    borderTopRightRadius:150,
    borderTopLeftRadius:250,
    borderBottomLeftRadius:250,
    borderBottomRightRadius:230,
    borderBottomWidth: 1
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 3
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#21FFFF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  datePickerStyle: {
    width: 230,
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
  switch: {
    marginRight: '41%',
  },
  
});

export default Upload;