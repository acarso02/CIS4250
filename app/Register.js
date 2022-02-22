import React, { useState } from 'react';
import reactDom from 'react-dom';
import {StyleSheet, View, Button, Text, TextInput, StatusBar, TouchableOpacity} from "react-native"
import HomeScreen from './HomeScreen';

const Register = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 

   <View style={styles.loginButton}> 
        <Button title = "Register" color="black" onPress={() =>navigation.navigate(HomeScreen)}> </Button>
    </View>

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
  },
 
  TextInput: {
    height: 50,
    padding: 10,
    alignItems: "center",
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
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

export default Register;