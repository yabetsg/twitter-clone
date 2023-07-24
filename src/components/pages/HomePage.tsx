import React, { useState } from "react";
import { LoginPage } from "./LoginPage";
import { MainContent } from "../../components/pages/MainContent";
import { LeftSidebar } from "../../components/sidebars/LeftSidebar";
import { RightSidebar } from "../../components/sidebars/RightSidebar";
import { googleAuth } from "../../backend/auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { app } from "../../backend/firebase-config";
import { getDatabase, set, ref, get, child } from "firebase/database";
import { User } from "firebase/auth";


export const HomePage = () => {
  localStorage.clear();
  const [loggedIn, setLoggedIn] = useLocalStorage("user");
  const [userId, setUserId] = useLocalStorage("userId");
  const [displayName, setDisplayName] = useState<string | null | undefined>("");
  const [username, setUsername] = useState<string | null | undefined>("");

  const checkIfUserExists = async (userid: string | undefined) => {
    const dbRef = ref(getDatabase());
    const newUserId = userid !== undefined ? userid : "";
    let result = false;
    await get(child(dbRef, "users/" + newUserId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          result = true;
        } else {
          result = false;
        }
      })
      .catch((error) => console.log(error));
    return result;
  };

  const handleGoogleSignUp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    //authentication

    googleAuth()
      .then(async (res) => {
        await checkIfUserExists(res?.uid).then((exists) => {
          if (exists) {
            console.log("account exists");
          } else {
            createNewUser(res?.uid,res);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const createNewUser = (userid: string | undefined, AuthRes: User | null) => {
    const db = getDatabase();
    const newUserId = userid !== undefined ? userid : "";
    set(ref(db, "users/" + newUserId), {
      name: "john doe",
    }).catch((error) => {
      console.log(error);
    });
    setDisplayName(AuthRes?.displayName);
    const userAt = `${
      AuthRes?.displayName !== undefined && AuthRes?.displayName !== null
        ? AuthRes.displayName
        : ""
    }`;
    const newUserAt =
      userAt.replace(/\s/g, "") + Math.floor(Math.random() * 1000).toString();
    setUsername(newUserAt);
    AuthRes ? setLoggedIn("logged_in") : null;
    AuthRes ? setUserId(AuthRes.uid) : null;
    getProfile()
  };

  const getProfile = ()=>{
    const dbRef = ref(getDatabase());
    const newUserId = userId!==null?userId:'';
    get(child(dbRef, "users/" + newUserId))
      .then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val() as {[key: string]: { name: string }}
            for(const key of Object.keys(data)){
                const info = data[key]
                console.log(info);
            }
        } else {
         console.log('x');
         
        }
      }).catch((error)=>{
        console.log(error);
        
      })
  }

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
