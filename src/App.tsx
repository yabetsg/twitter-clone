import './App.css'

import { HomePage } from './components/pages/HomePage'
import { LoginPage } from './components/pages/LoginPage'
import { LeftSidebar } from './components/sidebars/LeftSidebar'
import { RightSidebar } from './components/sidebars/RightSidebar'
import {
  getDatabase,
  ref,
  child,
  get,
  set
} from "firebase/database";
import { FirebaseApp, FirebaseError, initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup,onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA35iNbPZJZbW5y1JPBITSBklmxi0z2UUI",
  authDomain: "twitter-clone-5defd.firebaseapp.com",
  projectId: "twitter-clone-5defd",
  storageBucket: "twitter-clone-5defd.appspot.com",
  messagingSenderId: "164851367329",
  appId: "1:164851367329:web:10add9a8afcfc848b1dfe0",
  measurementId: "G-4HY8SWMEBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function App() {
  function writeUserData() {
    const db = getDatabase();
    set(ref(db, 'users/'), {
      username: 'name',
     
    }).catch(error=>console.log(error)
    );
    
  }
  const googleAuth = ()=>{
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider).catch(error=>console.log(error)
  );
  onAuthStateChanged(auth,(user)=>{
    if(user){
     //
      
    }else{
      console.log('signed out');
      
    }
  })
  
  
  }

  return (
    <div className="flex">

      {/* <button className="text-white bg-black" onClick={googleAuth}>Submit</button> */}
      <LoginPage/>
    {/* <LeftSidebar/>
    <HomePage/>
    <RightSidebar/> */}
    </div>
  )
}

export default App
