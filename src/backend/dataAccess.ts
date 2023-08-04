import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebase-config";

export const setUserData =  async(collection:string,document:string,displayName:string|null,userName:string) =>{
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
          userId:userId
      })
}
 export const getData = async (collection:string,document:string)=>{
    const db = getFirestore(app);
    const docData = await getDoc(doc(db,collection,document))
    return docData;
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