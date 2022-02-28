import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, View, ScrollView, ImageBackground, Dimensions, Button, Text, TextInput, StatusBar, TouchableOpacity} from "react-native"
import SignInScreen from './SignInScreen';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  //const image = {uri: "https://toppng.com/uploads/preview/orange-splat-orange-paint-splash-11562922076goctvo3zry.png"};

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

  if (initializing) return null;

  function signOut(){
    auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
      navigation.navigate(SignInScreen);
    })
  }

  return (
    <View style={styles.background}>
         <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.loginButton}> 
        <Button title = "Login" color="black" onPress={() =>navigation.navigate(HomeScreen)}> </Button>
<<<<<<< HEAD
      </View>
=======
        <Button title = "Sign Out" color="black" onPress={() =>{signOut()}}> </Button>
    </View>
>>>>>>> e4052d874ce3d81f00fbdce41409c0a3e2978688
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
   

    </View>
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