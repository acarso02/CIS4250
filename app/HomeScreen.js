import React from 'react';
import reactDom from 'react-dom';
import {StyleSheet, View, Button, Text, TouchableWithoutFeedback} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignInScreen';
import Register from './Register';

//Heyo Andrew

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.background}>
   <View style={styles.loginButton}> 
        <Button title = "Login" color="black" onPress={() =>navigation.navigate(SignIn)}> </Button>
    </View>
     <View style={styles.registerButton}> 
         <Button title = "Register" color="black" onPress={() =>navigation.navigate(Register)}> </Button>
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

  loginButton: {
    width: '100%',
    height: 80,
  },

    registerButton: {
    width: '100%',
    height: 80,
  },
  
});

export default HomeScreen;