import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, createContext} from 'react';
import reactDom from 'react-dom';
import {StyleSheet, Input, View, Button, ScrollView, ImageBackground, Dimensions, Text, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ListViewComponent} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import Register from './Register';
import auth from '@react-native-firebase/auth';

const SignInScreen = ({navigation}) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  //const image = {uri: "https://toppng.com/uploads/preview/orange-splat-orange-paint-splash-11562922076goctvo3zry.png"};

  function logIn(email, password){
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Logged In!");
      navigation.navigate(HomeScreen);
    })
    .catch(error => {
      //UPDATE ERROR CODES WITH MODAL INSTEAD OF 
      if (error.code === 'auth/invalid-email') {
        alert("Invalid email selected.");
        console.log(error.code);
      }
      else if (error.code === 'auth/user-not-found') {
        alert("Email does not exist.");
        console.log(error.code);
      }
      else if (error.code === 'auth/wrong-password') {
        alert("Invalid password, please try again.");
        console.log(error.code);
      }

      console.error(error);
    });
  }

  return (
    <ScrollView style={{flex: 1,backgroundColor:'white'}}
    showsVerticalScrollIndicator={false}>
      
      {/* Top View of the Brand */}
      <View style={styles.brandView}>
        <Ionicons name="checkmark-done-circle-sharp" size={140} color="orange" />
        
      </View>

      {/* Bottom/Welcome View of Brand*/}
      <View style={styles.bottomView}>
        {/* Welcome View */}
        <View style={{padding:40}}>
          <Text style={{color: 'black',fontSize:34, letterSpacing: 1.5,fontWeight:'bold'}}>Hello</Text>
          <Text>
          
            <Text style={{color:'black',letterSpacing: 2,fontSize: 15,}}>Sign in to your account</Text>
          </Text>

          {/* Form Email input View */}
          <View style={styles.inputView}>

            <View style={styles.mailIcon}>
              <Ionicons name="mail-outline" size={20} color="grey"/>
            </View>
            <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="grey"
            
            onChangeText={(email) => setEmail(email)}
            
            />

          </View>

          {/* Form Password input View */}
          <View style={styles.inputView}>
          <View style={styles.mailIcon}>
              <Ionicons name="lock-closed-outline" size={20} color="grey"/>
              
            </View>

            <TextInput
              style={styles.TextInput}
              placeholder="Password"
            
              placeholderTextColor="grey"
              secureTextEntry={true}
              //inlineImageLeft="search_icon"
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.loginButton}> 
            <Button style={styles.buttonText}title = "Log In" color='black' onPress={() =>{logIn(email, password)}}> </Button>
          </View>

        </View>

      </View>

      <View style={styles.dontHave}>
      <Text style={{color:'black',fontSize: 15,marginLeft:90, letterSpacing: 2,marginTop: 60,paddingBottom:0}}> Don't have an account?</Text>

      
        <TouchableOpacity onPress={()=>navigation.navigate(Register)}>
              <Text style={styles.createAccount}>Create</Text>
              
            </TouchableOpacity>
      </View>
    </ScrollView>
  );
  // }

  // return (
  //   <View>
  //     {navigation.navigate(HomeScreen)}
  //   </View>
  // );

}

export default SignInScreen;

const styles  = StyleSheet.create({

  
  inputView: {
    backgroundColor: "whitesmoke",
    flexDirection:'row',
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    
  },
  
  createAccount: {
    flex:1,
    //justifyContent:'flex-end',
    //marginBottom:30,
    marginTop:10,
    marginLeft:160,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 16,
    letterSpacing: 2
    //lineHeight: 40
    //position: 'absolute',
    //bottom: 0

  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginLeft: 160,
    fontWeight:'bold',
    letterSpacing: 2
    //alignItems: "flex-start",
  },

  loginButton: {
    
      width: '100%',
      height: 45,
      alignItems: 'center',
      //backgroundColor:'black',
      borderRadius:40
  },


  mailIcon: {
    //alignContent='center',
    
    
  },

  brandView:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  
  brandViewText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  bottomView:{
    flex: 1.5,
    backgroundColor: 'orange',
    bottom: 0,
    borderTopStartRadius: 230,
    borderTopEndRadius: 780,
    borderBottomStartRadius:940,
    borderBottomEndRadius:720,
    marginTop: 50,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 5,
    letterSpacing:2,
    fontSize:12
  },
 

  

})