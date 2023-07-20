import './App.css'

import { LoginPage } from './components/pages/LoginPage'

import {
  getDatabase,
  ref,
  set
} from "firebase/database";


import { googleAuth } from './components/backend/auth'


function App() {
  function writeUserData() {
    const db = getDatabase();
    set(ref(db, 'users/'), {
      username: 'name',
     
    }).catch(error=>console.log(error)
    );
    
  }


  return (
    <div className="flex">
      <LoginPage handleSignUp={(e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        googleAuth();

      }}/>
    {/* <LeftSidebar/>
    <HomePage/>
    <RightSidebar/> */}
    </div>
  )
}

export default App
