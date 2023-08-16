import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import ProfilePage from "./ProfilePage";
import { AppContext } from "../../contexts/AppContext";
import { setTweetData } from "../../backend/dataAccess";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import uniqid from "uniqid";
// import {
//   collection,
//   getDocs,
//   getFirestore,
//   query,
//   where,
// } from "firebase/firestore";
// import { app } from "../../backend/firebase-config";
import { Tweet } from "../tweets/Tweet";
import { fetchCurrentUserTweets } from "../../backend/tweets";


export const MainContent = () => {
  const { profileActive, username, displayName } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [userId] = useLocalStorage("userId", "");
  const handleTweetSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tweet = inputRef.current ? inputRef.current.value : "";
    inputRef.current ? (inputRef.current.value = "") : null;
    setTweetData("tweets", uniqid(), tweet, userId).catch((error) =>
      console.log(error)
    );
  };
  const [tweetContent, setTweetContent] = useState<Array<string>>([]);

  // const fetchUserTweet = () => {
  //   fetchCurrentUserTweets(userId)
  //     .then((querySnapshot) => {
  //       const matchingDocuments: { tweetId: string; data: any }[] = [];
  //       querySnapshot.forEach((doc) => {
  //         matchingDocuments.push({ tweetId: doc.id, data: doc.data() });
  //       });
  //       const tweetContents = matchingDocuments.map(
  //         (collection: {
  //           data: { content: string; userId: string };
  //           tweetId: string;
  //         }) => collection.data.content
  //       );
  //       setTweetContent([...tweetContents]);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  useEffect(()=>{
    fetchCurrentUserTweets(userId,setTweetContent);
  },[tweetContent])
  return (
    <>
      <div className="w-[45%]  text-white bg-black ml-[25%]  border-[rgb(47,51,54)] border-x border-collapse">
        {!profileActive ? (
          <>
            <section className="fixed flex flex-col bg-black w-[44.9%] opacity-95">
              <header className="p-3 text-xl font-bold ">Home</header>
              <div className="flex justify-around p-5 border-b border-[rgb(47,51,54)]">
                <button>For you</button>
                <button>Following</button>
              </div>
            </section>

            <section className="mt-28">
              <form
                action=""
                className="flex flex-col border-b border-[rgb(47,51,54)]"
                onSubmit={handleTweetSubmit}
              >
                <div className="pl-7">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="What is happening?!"
                    className="w-[90%] p-5 text-xl bg-inherit outline-none "
                  />
                </div>
                <div className="flex justify-end p-3">
                  <button
                    className="bg-[rgb(29,155,240)] rounded-xl w-24 h-8"
                    type="submit"
                  >
                    Tweet
                  </button>
                </div>
              </form>
            </section>

            <section className="">
              <div>
              <section>
        {tweetContent.map((value, index) => {
          return <Tweet key={index} content={value} />;
        })}
      </section>
              </div>
            </section>
          </>
        ) : (
          <ProfilePage displayName={displayName} username={username} />
        )}
      </div>
    </>
  );
};
