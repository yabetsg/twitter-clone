import './App.css'

import { LoginPage } from './components/pages/LoginPage'

// import {
//   getDatabase,
//   ref,
//   set
// } from "firebase/database";


import { googleAuth } from './backend/auth'
import { app } from './backend/firebase-config';
// import { useAuthUser } from './hooks/useAuthUser';
import { MainContent } from './components/pages/MainContent';
// import { useState } from 'react';
// import { User, UserInfo } from 'firebase/auth';
import { LeftSidebar } from './components/sidebars/LeftSidebar';
import { RightSidebar } from './components/sidebars/RightSidebar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { HomePage } from './components/pages/HomePage';
app;

function App() {
  
  // const [user, setUser] = useState<unknown>(localStorage.getItem('user'));

  // function writeUserData() {
  //   const db = getDatabase();
  //   set(ref(db, 'users/'), {
  //     username: 'name',
     
  //   }).catch(error=>console.log(error)
  //   );
    
  // }
  

  return (
    <HomePage/>
  )
}

export default App
