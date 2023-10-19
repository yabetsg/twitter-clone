import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  collection,
  orderBy,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

import { app } from "../config/firebase-config";

export const getData = async (collection: string, document: string) => {
  const db = getFirestore(app);
  const docData = await getDoc(doc(db, collection, document));
  return docData;
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
    followersCount: 0,
    followingCount: 0,
  });
};

export const updateUserData = (
  userId: string,
  fieldName: string,
  newValue: number
) => {
  const db = getFirestore(app);
  const docRef = doc(db, "users", userId);
  const updateObject = {
    [fieldName]: newValue,
  };
  updateDoc(docRef, updateObject).catch((error) => console.log(error));
};

export const deleteFollowData = (userId: string, followingUserId: string) => {
  const db = getFirestore(app);
  deleteDoc(doc(db, "follows", userId, "users", followingUserId)).catch(
    (error) => console.log(error)
  );
};

export const setFollowingData = async (
  userId: string,
  followingUserId: string,
  displayName: string | null | undefined,
  username: string | null | undefined
) => {
  const db = getFirestore(app);
  const ref = doc(db, "follows", userId, "users", followingUserId);
  await setDoc(ref, {
    displayName: displayName,
    username: username,
  });
};

export const checkIfUserHasFollowed = async (
  userId: string,
  followingUserId: string
) => {
  const db = getFirestore(app);
  let result = false;
  const ref = doc(db, "follows", userId, "users", followingUserId);
  if ((await getDoc(ref)).exists()) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

export const getFollowingData = async() => {
  const db = getFirestore(app);
  // const q = query(
  //   collection(db, "follows")
  // );
  
  //   console.log("im being ran");
    
  //   onSnapshot(q,(snapshot)=>{
  //     snapshot.docChanges().forEach((change)=>{
  //       console.log(change.doc.data())
  //     })
      
  //   })
  const querySnapshot = await getDocs(collection(db, "follows","users"));
  return querySnapshot;
};
