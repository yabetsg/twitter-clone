import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";

export const googleAuth = ()=>{
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider).catch(error=>console.log(error));
    onAuthStateChanged(auth,(user)=>{
    if(user){
      console.log(user);
      
      
    }else{
      console.log('signed out');
      
    }
  })
  
  }