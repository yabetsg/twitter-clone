import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

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
  });
};
