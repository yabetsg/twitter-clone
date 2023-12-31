import React, { useEffect, useState } from "react";
import { LoginPage } from "./LoginPage";
import { MainContent } from "../../components/pages/MainContent";
import { LeftSidebar } from "../../components/sidebars/LeftSidebar";
import { RightSidebar } from "../../components/sidebars/RightSidebar";
import { googleAuth } from "../../backend/auth/auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { User } from "firebase/auth";
import { DataWithKey, DataWithoutKey } from "data";

import { AppContext } from "../../contexts/AppContext";
import {
  checkIfUserExists,
  getData,
  setUserData,
} from "../../backend/services/userServices";
export const HomePage = () => {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [loggedIn, setLoggedIn] = useLocalStorage("user", "");
  const [displayName, setDisplayName] = useState<string | null | undefined>("");
  const [username, setUsername] = useState<string | null | undefined>("");
  const [personalProfileActive, setPersonalProfileActive] =
    useState<boolean>(false);
  const [commentsActive, setCommentActive] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<{
    tweetId: string;
    content: string;
    displayNameT: string;
    usernameT: string;
    likes: number;
    retweets: number;
    comments: number;
  }>({
    tweetId: "",
    content: "",
    displayNameT: "",
    usernameT: "",
    likes: 0,
    retweets: 0,
    comments: 0,
  });

  const [userProfileActive, setUserProfileActive] = useState(false);
  const [userProfileInfo, setUserProfileInfo] = useState<{
    userid: string;
    displayName: string | undefined | null;
    username: string | undefined | null;
  }>({ userid: "", displayName: "", username: "" });

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
    setPersonalProfileActive(value);
  };

  const showCommentSection = (value: boolean) => {
    setCommentActive(value);
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
        personalProfileActive,
        userId,
        commentsActive,
        showCommentSection,
        commentContent,
        setCommentContent,
        userProfileActive,
        setUserProfileActive,
        userProfileInfo,
        setUserProfileInfo,
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
