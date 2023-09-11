import React, { useEffect, useState } from "react";
import { LoginPage } from "./LoginPage";
import { MainContent } from "../../components/pages/MainContent";
import { LeftSidebar } from "../../components/sidebars/LeftSidebar";
import { RightSidebar } from "../../components/sidebars/RightSidebar";
import { googleAuth } from "../../backend/auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { User } from "firebase/auth";
import { DataWithKey, DataWithoutKey } from "data";
import {
  getData,
  setUserData,
  checkIfUserExists,
} from "../../backend/dataAccess";
import { AppContext } from "../../contexts/AppContext";

export const HomePage = () => {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [loggedIn, setLoggedIn] = useLocalStorage("user", "");
  const [displayName, setDisplayName] = useState<string | null | undefined>("");
  const [username, setUsername] = useState<string | null | undefined>("");
  const [profileActive, setProfileActive] = useState<boolean>(false);

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
  const handleGoogleSignIn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    googleAuth()
      .then(async (res) => {
        await checkIfUserExists(res?.uid).then((exists) => {
          if (exists) {
            setLoggedIn("logged_in");
            res ? localStorage.setItem("id", res?.uid) : null;
            res ? setUserId(res?.uid) : "null";
          } else {
            console.log("account doesn't exist");
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoggedIn("logged_out");
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
    setUserData("users", newUserId, newDisplayName, newUserAt).catch((error) =>
      console.log(error)
    );

    AuthRes ? setLoggedIn("logged_in") : null;
    AuthRes ? setUserId(AuthRes.uid) : null;
    AuthRes ? localStorage.setItem("id", AuthRes.uid) : null;
    getProfile();
  };

  function isDataWithKey(
    data: DataWithKey | DataWithoutKey
  ): data is DataWithKey {
    return userId ? userId in data : false;
  }

  const getProfile = () => {
    const newUserId = userId !== null ? userId : "";

    getData("users", newUserId)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as DataWithKey | DataWithoutKey;
          if (isDataWithKey(data)) {
            for (const key of Object.keys(data)) {
              const info = data[key];
              info !== undefined ? setDisplayName(info.displayName) : "";
              info !== undefined ? setUsername(info.userName) : "";
            }
          } else {
            setDisplayName(data.displayName);
            setUsername(data.userName);
          }
        } else {
          //
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showProfile = (value: boolean) => {
    setProfileActive(value);
  };
  useEffect(() => {
    getProfile();
  }, [userId]);

  return (
    <AppContext.Provider
      value={{
        displayName,
        username,
        handleGoogleSignUp,
        handleGoogleSignIn,
        handleLogout,
        showProfile,
        profileActive,
        userId,
      }}
    >
      <div className="flex">
        {loggedIn === "logged_in" ? (
          <>
            <LeftSidebar />
            <MainContent />
            <RightSidebar />
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    </AppContext.Provider>
  );
};
