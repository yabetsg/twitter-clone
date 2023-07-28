import React, { useEffect, useState } from "react";
import { LoginPage } from "./LoginPage";
import { MainContent } from "../../components/pages/MainContent";
import { LeftSidebar } from "../../components/sidebars/LeftSidebar";
import { RightSidebar } from "../../components/sidebars/RightSidebar";
import { googleAuth } from "../../backend/auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { app } from "../../backend/firebase-config";
import { getDatabase, set, ref, get, child } from "firebase/database";
import { User } from "firebase/auth";
import { DataWithKey, DataWithoutKey } from "d";
import { collection, doc, getDoc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

export const HomePage = () => {
  localStorage.clear()
  const [loggedIn, setLoggedIn] = useLocalStorage("user");
  const [userId, setUserId] = useLocalStorage("userId");
  const [displayName, setDisplayName] = useState<string | null | undefined>("");
  const [username, setUsername] = useState<string | null | undefined>("");

  const checkIfUserExists = async (userid: string | undefined) => {
    const dbRef = ref(getDatabase());
    const newUserId = userid !== undefined ? userid : "";
    let result = false;
    if((await getData(newUserId)).exists()){
      result = true;
    }else{
      result = false;
    }
    
    // await get(child(dbRef, "users/" + newUserId))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       result = true;
    //     } else {
    //       result = false;
    //     }
    //   })
    //   .catch((error) => console.log(error));
    return result;
  };

  const handleGoogleSignUp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    googleAuth()
      .then(async (res) => {
        await checkIfUserExists(res?.uid).then((exists) => {
          if (exists) {
            console.log("account exists");
          } else {
            createNewUser(res?.uid, res?.displayName, res);
            
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const createNewUser = (
    userid: string | undefined,
    displayName: string | undefined | null,
    AuthRes: User | null
  ) => {
    const userAt = `${
      AuthRes?.displayName !== undefined && AuthRes?.displayName !== null
        ? AuthRes.displayName
        : ""
    }`;
    const newUserAt =
      userAt.replace(/\s/g, "") + Math.floor(Math.random() * 1000).toString();
    const newUserId = userid !== undefined ? userid : "";
    const newDisplayName = displayName !== undefined ? displayName : "";
    setData(newUserId,newDisplayName,newUserAt).catch((error)=>console.log(error))
   
    AuthRes ? setLoggedIn("logged_in") : null;
    AuthRes ? setUserId(AuthRes.uid) : null;
    getProfile();
  };

  const setData =  async(userId:string,displayName:string|null,userName:string) =>{
    const db = getFirestore(app);
    await setDoc(doc(db,"users",userId),{
      displayName:displayName,
      userName:userName,
    })
  }
  const getData = async (userid:string)=>{
    const db = getFirestore(app);
    const docData = await getDoc(doc(db,"users",userid))
    return docData;
  }

  function isDataWithKey(data: DataWithKey | DataWithoutKey): data is DataWithKey {
    return userId?userId in data:false;
  }
  
  const getProfile = () => {

    const newUserId = userId !== null ? userId : "";


    getData(newUserId).then((snapshot)=>{
      if (snapshot.exists()) {
        const data = snapshot.data() as DataWithKey| DataWithoutKey;
        console.log(data);
        
        if (isDataWithKey(data)) {
          for (const key of Object.keys(data)) {
            const info = data[key];
            info != undefined ? setDisplayName(info.displayName) : "";
            info != undefined ? setUsername(info.userName) : "";
          }
        } else {
          setDisplayName(data.displayName);
          setUsername(data.userName);
         
        }
      } else {
        // 
      }
    }).catch((error)=>{
      console.log(error);
    })
    
  };
  useEffect(() => {
    getProfile();
  }, [userId]);
 

  return (
    <div className="flex">
      {loggedIn === "logged_in" ? (
        <>
          <LeftSidebar displayName={displayName} username={username} />
          <MainContent />
          <RightSidebar />
        </>
      ) : (
        <LoginPage handleGoogleSignUp={handleGoogleSignUp} />
      )}
    </div>
  );
};
