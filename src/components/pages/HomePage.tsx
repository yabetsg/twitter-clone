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
interface DataWithKey {

  [key: string]: { displayName: string; userName: string };
}
interface DataWithoutKey {
  displayName: string;
  userName: string;
}

export const HomePage = () => {
  // localStorage.clear()
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
    const db = getDatabase();
    const userAt = `${
      AuthRes?.displayName !== undefined && AuthRes?.displayName !== null
        ? AuthRes.displayName
        : ""
    }`;
    const newUserAt =
      userAt.replace(/\s/g, "") + Math.floor(Math.random() * 1000).toString();
    const newUserId = userid !== undefined ? userid : "";
    const newDisplayName = displayName !== undefined ? displayName : "";

    set(ref(db, "users/" + newUserId), {
      displayName: newDisplayName,
      userName: newUserAt,
    }).catch((error) => {
      console.log(error);
    });
    // setDisplayName(AuthRes?.displayName);

    // setUsername(newUserAt);
    AuthRes ? setLoggedIn("logged_in") : null;
    AuthRes ? setUserId(AuthRes.uid) : null;
    getProfile();
  };
  function isDataWithKey(data: DataWithKey | DataWithoutKey): data is DataWithKey {
    return userId?userId in data:false;
  }
  
  const getProfile = () => {
    const dbRef = ref(getDatabase());
    const newUserId = userId !== null ? userId : "";
    const store: string[] = [];
    // console.log('hi');

    get(child(dbRef, "users/" + newUserId))
      .then((snapshot) => {

        
        if (snapshot.exists()) {
         
          const data = snapshot.val() as DataWithKey| DataWithoutKey;
          console.log(data.displayName);
          
        
          
          if (isDataWithKey(data)) {
            for (const key of Object.keys(data)) {
              const info = data[key];
              info != undefined ? setDisplayName(info.displayName) : "";
              info != undefined ? setUsername(info.userName) : "";
              console.log("here");
            }
          } else {
            setDisplayName(data.displayName);
            setUsername(data.userName);
            console.log("here2");
          }
        } else {
          console.log("x");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);
  // useEffect(()=>{
  //   //
  // },[]);

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
