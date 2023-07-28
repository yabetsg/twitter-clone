import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebase-config";

export const setData =  async(userId:string,displayName:string|null,userName:string) =>{
    const db = getFirestore(app);
    await setDoc(doc(db,"users",userId),{
      displayName:displayName,
      userName:userName,
    })
  }
 export const getData = async (userid:string)=>{
    const db = getFirestore(app);
    const docData = await getDoc(doc(db,"users",userid))
    return docData;
  }