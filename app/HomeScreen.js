import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Image, Input, View, Button, ScrollView, ImageBackground, Dimensions, Text, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ListViewComponent} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchBar } from 'react-native-elements';
import { ImagePicker, launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import SignInScreen from './SignInScreen';
import SettingsScreen from './SettingsScreen';
import Notifications from './Notifications';
import Profile from './Profile';
import Upload from './Upload';

const HomeScreen = ({navigation}) => {

  //const image = {uri: "https://toppng.com/uploads/preview/orange-splat-orange-paint-splash-11562922076goctvo3zry.png"};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(); 
  const options = {
    title: 'Select an Image'
  }

  /*This must be imported into each screen so that we can access the logged-in user at any time*/
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing)
      setInitializing(false);
  }
  /* ----------------------------------------------------------------------------------------- */

  if (initializing) return null;

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

  function browseImages() {

    launchImageLibrary(options, (response) => {
      let assets = response.assets[0]
      console.log(assets);
      setImage(assets);
    }).then(() => {
      uploadToCloud(image.uri, image.fileName);
    })

  }

  function uploadToCloud(path, imageName) {

    console.log(path, imageName)
    
    let reference = storage().ref("Test/"+imageName);
    let task = reference.putFile(path);

    task.then(() => {
      console.log('Image uploaded to the bucket!');
    })
    .catch((e) => {
      console.log('uploading image error => ', e);
    })
  }

  return (
    <ScrollView style={{flex: 1,backgroundColor:'white'}}
    showsVerticalScrollIndicator={false}>
      <View> 
        <SearchBar
          placeholder='Search'
          textFieldBackgroundColor='blue'
          />
      </View>

      <View style={styles.background}>
        
        <StatusBar style="auto" />

        <View style={{flexDirection:"row"}}>
        
          <Image 
            style={styles.logo}
            source={{uri:image.uri}}
          />
          <Image 
            style={styles.logo}
            source={{uri:image.uri}}        
          />

        </View>

        <Button title = "Sign Out" color="black" onPress={() =>{signOut()}}> </Button>

        <Button title = "Upload Image!" color="black" onPress={() =>{browseImages()}}> </Button>

        <Button title = "Settings" color="black" onPress={() =>{navigation.navigate(SettingsScreen)}}> </Button>
        <Button title = "Notifications" color="black" onPress={() =>{navigation.navigate(Notifications)}}> </Button>
        <Button title = "Profile" color="black" onPress={() =>{navigation.navigate(Profile)}}> </Button>
  
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
    
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
  },
});

export default HomeScreen;