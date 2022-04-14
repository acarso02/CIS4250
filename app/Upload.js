import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Modal, Image, Input, View, Button, 
        Pressable, ScrollView, ImageBackground, Dimensions, 
        Text, TextInput, StatusBar, TouchableOpacity, TouchableHighlight,
        TouchableWithoutFeedback, ListViewComponent, Switch} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImagePicker, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
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
import { render } from 'react-dom';

const Upload = ({navigation}) => {

  const [progress, setProgress] = useState(0);
  const [queryLength, setQueryLength] = useState(0);
  const [title, setTitle] = useState('');
  /* NOTE: TAGS MUST BE CHANGED TO DB ENTRY VERSION ASAP */
  // const [tags, setTags] = useState([]);
  const [tag, setTag] = useState();
  const [tagArr, setTagArr] = useState([]);
  const [tmpTag, setTmpTag] = useState();
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate());
  // tomorrow.setHours(0,0,0,0);
  const [endDate, setEndDate] = useState(tomorrow);
  const [imageList, setImageList] = useState([]); 
  const [uniqueKey, setUniqueKey] = useState('');
  const [createTagModalVisible, setCreateTagModalVisible] = useState(false);
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

    getTags();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (imageList[0]){ console.log(imageList[0].uri) }
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

    console.log(user.displayName, title, endDate, tag, enabledComments, imageList[0].fileName, imageList[1].fileName)
    
    let reference = storage().ref("Poll-Images/"+imageList[0].fileName);
    let task = reference.putFile(imageList[0].uri);

    task.then(() => {

      console.log('Image 1 uploaded to the bucket!');

      const comments = [];
      // const len = queryLength + '';
      // console.log(len);

      const tmr = firestore.Timestamp.fromDate(endDate);

      firestore()
      .collection('polls')
      .add({
        UserId: user.uid,
        User: user.displayName,
        Title: title,
        PollLength: tmr,
        Tags: tag,
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
        hasVoted: [user.uid]
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
          console.log('Error uploading image 2 => ', e);
        });
      })
      .catch((e) => {
        console.log('Error storing poll => ', e);
      });
    })
    .catch((e) => {
      console.log('Error uploading image 1 => ', e);
    });
  }
  
  async function getTags(){
    var tempArr = []; 
    await firestore()
    .collection('tags')
    .get() 
    .then(querySnapshot => {
      console.log('Total tags: ', querySnapshot.size)
      
      querySnapshot.forEach(documentSnapshot => {
        console.log(documentSnapshot.id, documentSnapshot.data())
        tempArr.push(documentSnapshot);
      });
    });

    const tagArray = await tempArr.map((tag) => {
      return <Picker.Item label={tag.data().tag} value={tag.data().tag} key={tag.id}/>
    })

    setTagArr(tagArray);
  }

  async function addTag(newTag){
    console.log(newTag.charAt(0).toUpperCase() + newTag.slice(1))
    firestore()
      .collection('tags')
      .add({
        tag:newTag.charAt(0).toUpperCase() + newTag.slice(1)
      })
      .catch((e) => {
        alert("Error creating new tag");
      })
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange,
      mode: currentMode,
      is24Hour: true
    })
  };

  const showDatepicker = () => {
    showMode('date');
  };

  /* {imageList?<Text>No images found</Text>:imageList.map(image => <Image styles={styles.tinyLogo} source={image.uri}/>)} */

  if(progress == 0){
    return (
      <View style={{flex: 1,backgroundColor:'white',paddingTop: 5}}>
        <ProgressBar progress={0.2} width={393} height={8} borderRadius={20}/>
        <Modal 
            animationType="slide"
            transparent={true}
            visible={createTagModalVisible}
            onRequestClose={() => {
              console.log("Modal has been closed");
              setCreateTagModalVisible(!createTagModalVisible);
            }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Pressable
                style={styles.buttonClose}
                onPress={() => setCreateTagModalVisible(!createTagModalVisible)}
              >
                <Text style={styles.textStyle}> X </Text>
              </Pressable>
              
              <Text>Add a new tag:</Text>
              <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder={"(Animals, Portfolio, etc..)"}
                placeholderTextColor="grey"
                onChangeText={(cngTag) => {setTag(cngTag);setTmpTag(cngTag)}}
                />
              </View>
              
              <Pressable
                style={[styles.button, styles.buttonSubmit]}
                onPress={async () => {
                  if(tmpTag){
                    await setCreateTagModalVisible(!createTagModalVisible); 
                    await addTag(tag); 
                    await getTags();
                  }
                  else{
                    console.log("Please enter a tag to submit");
                    alert("Please enter a tag to submit");
                  }
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>

        </Modal>
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
              selectedValue={tag}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setTag(itemValue)}
            >
              {tagArr}
            </Picker>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity onPress={() => {setCreateTagModalVisible(true);setTmpTag('')}}>
              <View style={{alignItems:'center'}}>
                <Icon name="plus" color="#000000" size={25}/>
                <Text>New Tag</Text>
              </View>
            </TouchableOpacity>
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
          {console.log(imageList[1])}
          {imageList.length == 1 && <View><Image style={{height: '100%', width: '50%', borderRadius: 10}} source={{uri: imageList[0].uri}}/></View>}
          {imageList.length == 2 && 
            <View style={{flexDirection: 'row'}}><Image style={{height: 250, width: 190, borderRadius: 10}} source={{uri: imageList[0].uri}}/>
            <Image style={{height: 250, width: 190, borderRadius: 10}} source={{uri: imageList[1].uri}}/></View>
          }
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
        <View style={{justifyContent: 'center',marginTop:'-8%', flexDirection: 'column'}}>
          <Text style={{margin: 10, alignSelf: 'flex-start', fontSize: 30}}>Poll Title: {title}</Text>
        </View>
        {imageList.length == 2 && 
            <View style={{flexDirection: 'row', alignSelf:'center'}}><Image style={{height: 250, width: 190, borderRadius: 10}} source={{uri: imageList[0].uri}}/>
            <Image style={{height: 250, width: 190, borderRadius: 10}} source={{uri: imageList[1].uri}}/></View>
          }
        
        <View style={{alignSelf: 'flex-start', marginLeft: 10, marginTop: 20}}>
          <Text>End Date: {endDate.toLocaleDateString()}</Text>
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
    // position: 'absolute',
    bottom:-50,
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
    backgroundColor: "#FFDBA1",
    flexDirection:'row',
    borderRadius: 50,
    width: "90%",
    height: 45,
    marginBottom: 20,
    marginLeft: '5%',
    alignItems: "center",
    paddingLeft: 10,
    borderTopRightRadius:150,
    borderTopLeftRadius:250,
    borderBottomLeftRadius:250,
    borderBottomRightRadius:250,
    borderBottomWidth: StyleSheet.hairlineWidth
    //textAlign: 'center'
    
  },
  dropdownInputView: {
    backgroundColor: "#FFDBA1",
    flexDirection:'row',
    borderRadius: 50,
    width: "40%",
    height: 45,
    marginBottom: 20,
    marginLeft: '32%',
    alignItems: "center",
    borderTopRightRadius:150,
    borderTopLeftRadius:250,
    borderBottomLeftRadius:250,
    borderBottomRightRadius:250,
    borderBottomWidth: 1
    //textAlign: 'center'
    
  },
  iconView: {
    borderRadius: 50,
    width: "40%",
    height: 45,
    marginBottom: 20,
    marginTop: -20,
    marginLeft: '33%',
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
  buttonSubmit: {
    backgroundColor: "#E65400",
  },
  buttonClose: {
    backgroundColor: "#000000",
    position:'absolute',
    top:10,
    right:10,
    borderRadius: 20,
    padding: 5,
    elevation: 3
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