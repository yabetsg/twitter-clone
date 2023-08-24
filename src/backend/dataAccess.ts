import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { app } from "./firebase-config";
import { getDate } from "../utils/dateFormatter";

export const setUserData =  async(collection:string,document:string,displayName:string|null|undefined,userName:string) =>{
    const db = getFirestore(app);
    await setDoc(doc(db,collection,document),{
      displayName:displayName,
      userName:userName,
    })
  }

export const setTweetData =async (collection:string,document:string,content:string,userId:string|null) => {
      const db = getFirestore(app);
      await setDoc(doc(db,collection,document),{
          content:content,
          userId:userId,
          date: getDate()
      })
}
 export const getData = async (collection:string,document:string)=>{
    const db = getFirestore(app);
    const docData = await getDoc(doc(db,collection,document))
    return docData;
  }
  export const readTweet = ()=>{
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
  }
  

export const checkIfUserExists = async (userid: string | undefined) => {
    const newUserId = userid !== undefined ? userid : "";
    let result = false;
    if ((await getData("users",newUserId)).exists()) {
      result = true;
    } else {
      result = false;
    }
    return result;
  };