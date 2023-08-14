import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { app } from "./firebase-config";

export const fetchCurrentUserTweets = async (userId: string | null) => {
  try {
    const db = getFirestore(app);
    const tweetRef = collection(db, "tweets");
    const q = query(
      tweetRef,
      where("userId", "==", userId),
      orderBy("userId", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
