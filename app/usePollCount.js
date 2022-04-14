import { useState, useEffect } from "react";
import database from "@react-native-firebase/database";

export function usePollCount() {

  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    database()
      .ref(`/Polls`)
      .once("value")
      .then((snapshot) => {
        setPollCount(snapshot.numChildren());
      });

  }, []);

  return pollCount;

}