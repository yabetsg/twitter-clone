import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { getDatabase, ref, child, push, update, set } from "firebase/database";
import { app } from "./firebase-config";
import { getDate } from "../utils/dateFormatter";
import firebase from "firebase/app";
export const setUserData = async (
  collection: string,
  document: string,
  displayName: string | null | undefined,
  userName: string
) => {
  const db = getFirestore(app);
  await setDoc(doc(db, collection, document), {
    displayName: displayName,
    userName: userName,
  });
};

export const setTweetData = async (
  collection: string,
  tweetId: string,
  content: string,
  userId: string | null
) => {
  const db = getFirestore(app);
  await setDoc(doc(db, collection, tweetId), {
    tweetId: tweetId,
    content: content,
    userId: userId,
    date: getDate(),
    likes: 0,
  });
};
export const setLikesData = async (
  userId: string,
  tweetId: string,
  content: string,
  likesCount: number
) => {
  const db = getFirestore(app);
  const likeDocRef = doc(db, "likes", userId, "tweets", tweetId);
  try {
    await setDoc(likeDocRef, {
      content: content,
      userId: userId,
      date: getDate(),
      likes: likesCount,
    });
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const getData = async (collection: string, document: string) => {
  const db = getFirestore(app);
  const docData = await getDoc(doc(db, collection, document));
  return docData;
};
export const readTweet = () => {
  const db = getFirestore(app);
  const q = query(collection(db, "cities"), where("state", "==", "CA"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New city: ", change.doc.data());
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
      }
    });
  });
};

export const updateData = (tweetId: string, newLikes: number) => {
  const db = getFirestore(app);
  const docRef = doc(db, "tweets", tweetId);
  updateDoc(docRef, {
    likes: newLikes,
  })
    .then(() => console.log("updated"))
    .catch((error) => console.log(error));
};

export const checkIfUserExists = async (userid: string | undefined) => {
  const newUserId = userid !== undefined ? userid : "";
  let result = false;
  if ((await getData("users", newUserId)).exists()) {
    result = true;
  } else {
    result = false;
  }
  return result;
};
