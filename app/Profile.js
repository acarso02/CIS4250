import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import database from "@react-native-firebase/database";
import reactDom from "react-dom";
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  Input,
  View,
  SafeAreaView,
  Button,
  ScrollView,
  ImageBackground,
  Dimensions,
  TextInput,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ListViewComponent,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchBar } from "react-native-elements";
import SignIn from "./SignInScreen";
import SettingsScreen from "./SettingsScreen";
import HomeScreen from "./HomeScreen";
import { usePollCount } from "./usePollCount";
import { useUser } from "./useUser";
import SignInScreen from './SignInScreen';

const Profile = ({ navigation }) => {
  /*Creates a user listener to hold the state of the user*/

  const {user, initializing} = useUser();

  const pollCount = usePollCount();

  function setImages() {
    database().ref();
  }

  /* Signs the user out of the app and returns to the signin page */
  function signOut(){

    if(user){
      auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      })
    }
    else { //Shouldn't be reaching here but does for some reason. When signing in it doesn't recognize the user
      console.log('User not signed in!');
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {user?.displayName}
            </Title>
            <Caption style={styles.caption}>
              {user?.displayName ? "@" : ""}
              {user?.displayName}
            </Caption>
          </View>
        </View>
        <View style={styles.menuItem}>
          <Icon name="heart-outline" color="#793bf5" size={25} />
          <Text style={styles.menuItemText}>Total Votes</Text>
          <Text style={styles.menuItemText}>XXXX Votes</Text>
        </View>
        <View style={styles.menuItem}>
          <Icon name="poll" color="#793bf5" size={25} />
          <Text style={styles.menuItemText}> {pollCount} Published Polls</Text>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("PollDetails", {
              id: "-MyFTS4sQw6PtR7talMm",
            });
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="poll" color="#793bf5" size={25} />
            <Text style={styles.menuItemText}>
              {" "}
              My Polls
            </Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => {
            navigation.navigate("SettingsScreen", {
              id: "-MyFTS4sQw6PtR7talMm",
            });
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="cog-outline" color="#793bf5" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => {
            {signOut()}
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="exit-run" color="#793bf5" size={25} />
            <Text style={styles.menuItemText}>Sign Out</Text>
          </View>
        </TouchableRipple>

      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "black",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});

