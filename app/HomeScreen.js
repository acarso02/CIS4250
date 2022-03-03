import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Image, Input, View, Button, ScrollView, ImageBackground, Dimensions, Text, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ListViewComponent} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchBar } from 'react-native-elements';
import SignInScreen from './SignInScreen';
import SettingsScreen from './SettingsScreen';
import Notifications from './Notifications';
import Profile from './Profile';
import Upload from './Upload';
import auth from '@react-native-firebase/auth';



const HomeScreen = ({navigation}) => {

  //const image = {uri: "https://toppng.com/uploads/preview/orange-splat-orange-paint-splash-11562922076goctvo3zry.png"};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        
        <Button title = "Sign Out" color="black" onPress={() =>{signOut()}}> </Button>

        <Button title = "Click ME!" color="black" onPress={() =>{console.log(user)}}> </Button>

        <Button title = "Settings" color="black" onPress={() =>{navigation.navigate(SettingsScreen)}}> </Button>
        <Button title = "Notifications" color="black" onPress={() =>{navigation.navigate(Notifications)}}> </Button>
        <Button title = "Profile" color="black" onPress={() =>{navigation.navigate(Profile)}}> </Button>
  
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
    
      </View>
      {/* <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri:
                        'https://img.icons8.com/color-glass/48/000000/home.png',
                    }}
                  />
                );
              }, }} />
          <Tab.Screen name="Notifications" component={Notifications}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri:
                        'https://img.icons8.com/color-glass/48/000000/appointment-reminders.png',
                    }}
                  />
                );
              },  }} />
          <Tab.Screen name="Upload" component={Upload}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri:
                        'https://img.icons8.com/color-glass/48/000000/camera.png',
                    }}
                  />
                );
              },  }} />
          <Tab.Screen name="Profile" component={Profile}  options={{ headerShown: false, tabBarIcon: ({size,focused,color}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri:
                        'https://img.icons8.com/color/48/000000/user.png',
                    }}
                  />
                );
              },  }} />

          
        </Tab.Navigator> */}
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
 
  image: {
    marginBottom: 40,
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