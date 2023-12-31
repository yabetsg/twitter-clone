import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import  { PersonalProfile } from "./PersonalProfile";
import { AppContext } from "../../contexts/AppContext";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import uniqid from "uniqid";
import { Tweet } from "../tweets/Tweet";

import { ForYouPage } from "./ForYouPage";
import { ITweet } from "tweet";
import {
  setTweetData,
  fetchForYouTweets,
} from "../../backend/services/tweetServices";
import { CommentSection } from "../comments/CommentSection";
import UserProfile from "./UserProfile";
import { FollowingPage } from "./FollowingPage";

export const MainContent = () => {
  const { personalProfileActive, username, displayName, commentsActive, commentContent,userProfileActive,} =
    useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [userId] = useLocalStorage("userId", "");
  const [forYouPageSelected, setForYouPageSelected] = useState<string>(
    "underline underline-offset-[15px] decoration-[rgb(29,155,240)]"
  );
  const [followingPageSelected, setFollowingPageSelected] =
    useState<string>("");
  const [tweetContent, setTweetContent] = useState<Array<ITweet>>([]);
  const [content, setContent] = useState<string>();
  const [loadForYou, setLoadForYou] = useState<boolean>(true);
  const [loadFollowing, setLoadFollowing] = useState<boolean>(false);

  const handleTweetSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tweetId = uniqid();
    const tweet = inputRef.current ? inputRef.current.value : "";
    const userName= username?username:"";
    const name = displayName?displayName:"";
    inputRef.current ? (inputRef.current.value = "") : null;
    setContent(tweet);
    setTweetData("tweets", tweetId, tweet, userId,userName,name).catch((error) =>
      console.log(error)
    );
  };

  const handlePageSelection = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    if (element.id === "following") {
      setFollowingPageSelected(
        "underline underline-offset-[15px] decoration-[rgb(29,155,240)]"
      );
      setForYouPageSelected("");
      setLoadForYou(false);
      setLoadFollowing(true);
      
    } else if (element.id === "for-you") {
      setFollowingPageSelected("");
      setForYouPageSelected(
        "underline underline-offset-[15px] decoration-[rgb(29,155,240)]"
      );
      setLoadForYou(true);
      setLoadFollowing(false);
      
    }
  };

  useEffect(() => {
    
    fetchForYouTweets(setTweetContent);
    
  }, [content,commentContent]);

  useEffect(() => {
    if (commentsActive) {
      setLoadForYou(false);
      // showProfile(false);
    } else if(loadFollowing){
      //
    }else{
      setLoadForYou(true);

    }
  }, [commentsActive, loadForYou, personalProfileActive]);
  return (
    <>
      <div className="w-[45%]  text-white bg-black ml-[25%]  border-[rgb(47,51,54)] border-x border-collapse">
        {!personalProfileActive && !commentsActive && !userProfileActive ? (
          <>
            <section className="fixed flex flex-col bg-black w-[44.9%] opacity-95">
              <header className="p-3 text-xl font-bold ">Home</header>
              <div className="flex justify-around p-5 border-b border-[rgb(47,51,54)]">
                <button
                  className={forYouPageSelected}
                  id="for-you"
                  onClick={handlePageSelection}
                >
                  For you
                </button>
                <button
                  className={followingPageSelected}
                  id="following"
                  onClick={handlePageSelection}
                >
                  Following
                </button>
              </div>
            </section>
            {loadForYou ? (
              <ForYouPage
                handleTweetSubmit={handleTweetSubmit}
                inputRef={inputRef}
                content={tweetContent.map((value) => {
                  const key = uniqid();
                  
                  return (
                    <Tweet
                      key={key}
                      userid={value.userId}
                      content={value.content}
                      displayNameT={value.displayName}
                      usernameT={value.username}
                      likes={value.likes}
                      retweets={value.retweets}
                      tweetId={value.tweetId}
                      comments={value.comments}
                    />
                  );
                })}
              ></ForYouPage>
            ) :<FollowingPage  handleTweetSubmit={handleTweetSubmit}
            inputRef={inputRef} ></FollowingPage>}
          </>
        ) : personalProfileActive ? (
          <PersonalProfile displayName={displayName} username={username} />
        ) : userProfileActive?(
          <UserProfile></UserProfile>
         
        ): commentsActive && <CommentSection></CommentSection>}
      </div>
    </>
  );
};
