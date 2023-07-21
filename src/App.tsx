import './App.css'

import { LoginPage } from './components/pages/LoginPage'

// import {
//   getDatabase,
//   ref,
//   set
// } from "firebase/database";


import { googleAuth } from '../src/backend/auth'
import { app } from './backend/firebase-config';
// import { useAuthUser } from './hooks/useAuthUser';
import { HomePage } from './components/pages/HomePage';
// import { useState } from 'react';
// import { User, UserInfo } from 'firebase/auth';
import { LeftSidebar } from './components/sidebars/LeftSidebar';
import { RightSidebar } from './components/sidebars/RightSidebar';
import { useLocalStorage } from './hooks/useLocalStorage';
app;

function App() {
  // const [user, setUser] = useState<unknown>(localStorage.getItem('user'));
  const [loggedIn,setLoggedIn] = useLocalStorage('user');
  // function writeUserData() {
  //   const db = getDatabase();
  //   set(ref(db, 'users/'), {
  //     username: 'name',
     
  //   }).catch(error=>console.log(error)
  //   );
    
  // }
  

  return (
    <div className="flex">
    {loggedIn==='logged_in'?<><LeftSidebar/><HomePage/><RightSidebar/></>:
    <LoginPage handleSignUp={(e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        googleAuth().then((res)=>{
           res?setLoggedIn('logged_in'):null;
        }).catch((error)=>console.log(error)
        )
      }}/>}
    </div>
  )
}

export default App
