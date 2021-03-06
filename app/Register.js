import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, View, Button, ScrollView, Text, TextInput, StatusBar, TouchableOpacity} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { utils } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import HomeScreen from './HomeScreen';
import SignInScreen from './SignInScreen';

const Register = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  async function createUser(email, password, username, number) {

    if (email && password && username && number){
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');

        auth()
        .currentUser
        .updateProfile({displayName: username, phoneNumber: number})
        .then(() =>{
            console.log("Username set to "+ username);
        }, function (error) {
            console.log("Error happened");
        });
        
        // const newReference = firebase
        // .app()
        // .database('https://impollse-default-rtdb.firebaseio.com/')
        // .ref('/users/')
        // .push();
        // console.log('Auto generated key: ', newReference.key);

        // newReference
        // .set({
        //   email: email,
        //   phone: number,
        //   username: username
        // })
        // .then(() => console.log('Saved in Realtime Database!'));
        navigation.navigate(HomeScreen);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          alert('That email address is already in use!');
        }
        else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('That email address is invalid!');
        }
        else if (error.code === 'auth/weak-password') {
          console.log('The password is too weak, and requires a minimum of 6 characters.');
          alert('The password is too weak, and requires a minimum of 6 characters.');
        }

        console.error(error);
      })
    }
    else{
      console.log("Error, Missing Fields: ");
      alert('Error - Missing Fields: \n'+(username?'':'Username\n')+(email?'':'Email\n')+(password?'':'Password\n')+(number?'':'Phone number\n'));
    }
    
  }

  return (
    <ScrollView style={{flex: 1,backgroundColor:'white'}}
    showsVerticalScrollIndicator={false}>

      <View style={styles.checkMark}>
        <Ionicons name="checkmark-done-circle-sharp" size={140} color="orange" />
      </View>
      <View>
        <Text style={styles.createText}>
          Create Account
        </Text>
      </View>
      <View style={styles.middleBlob}>
        <View style={{padding:40}}>

          {/* Form Name input View */}
          <View style={styles.inputView}>

            <View style={styles.mailIcon}>
              <Ionicons name="person-circle-outline" size={25} color="grey"/>
            </View>
            <TextInput
            style={styles.TextInput}
            placeholder="Username"
            placeholderTextColor="grey"
            
            onChangeText={(name) => setUsername(name)}
            
            />

          </View>
          
          {/* Email input view */}
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

          {/* Password input view */}
          <View style={styles.passView}>
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

          {/*Phone number input view */}
          <View style={styles.phoneInput}>
            <View style={styles.mailIcon}>
              <Ionicons name="call-outline" size={20} color="grey"/>
            </View>

            <TextInput
              style={styles.TextInput}
              placeholder="Phone number"
            
              placeholderTextColor="grey"
              secureTextEntry={true}
              //inlineImageLeft="search_icon"
              onChangeText={(number) => setNumber(number)}
            />
          </View>

          <View style={styles.signUpButton}> 
            <Button onPress={() => createUser(email, password, username, number)}
                    style={styles.buttonText} 
                    title = "Create" 
                    color='black' />
          </View>

        </View>

      </View>

    </ScrollView>
  );
  
}

const styles = StyleSheet.create({

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
    width: "110%",
    height: 45,
    marginBottom: 20,
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
  }
  
});

export default Register;