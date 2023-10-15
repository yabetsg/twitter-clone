import './App.css'

import { LoginPage } from './components/pages/LoginPage'

// import {
//   getDatabase,
//   ref,
//   set
// } from "firebase/database";



import { app } from './backend/config/firebase-config';


import { HomePage } from './components/pages/HomePage';
app;

function App() {
  return (
    <HomePage/>
  )
}

export default App
