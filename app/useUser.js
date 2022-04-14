import { useState, useEffect } from "react";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

export function useUser() {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    database()
      .ref(`/Polls`)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.numChildren());
      });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing)
      setInitializing(false);
  }
  return { user, initializing };
}