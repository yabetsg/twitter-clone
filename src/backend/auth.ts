import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
// import { useState } from "react";


export const googleAuth = async ()=>{
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try{
      await signInWithPopup(auth, provider).catch(error=>console.log(error));
    const user = new Promise((resolve)=>{
      const unsubscribe = onAuthStateChanged(auth,(user)=>{
        unsubscribe();
        resolve(user);
      }); 
    });
     return user;
    }catch(error){
      console.log(error);
    }
    
   
  }
