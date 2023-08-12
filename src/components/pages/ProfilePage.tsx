import React, { useEffect, useState } from "react";
import { ProfileProps } from "props";
import defaultPfp from "../../assets/default.png";
import { Tweet } from "../tweets/Tweet";
import { fetchCurrentUserTweets } from "../../backend/dataAccess";
import { useLocalStorage } from "../../hooks/useLocalStorage";
export const ProfilePage = ({ displayName, username }: ProfileProps) => {
  const [tweetContent, setTweetContent] = useState<Array<string>>([]);
  const [userId] = useLocalStorage("userId", "");
  const fetchUserTweet = () => {
    fetchCurrentUserTweets(userId)
      .then((querySnapshot) => {
        const matchingDocuments: { tweetId: string; data: any }[] = [];
        querySnapshot.forEach((doc) => {
          matchingDocuments.push({ tweetId: doc.id, data: doc.data() });
        });
        const tweetContents = matchingDocuments.map(
          (collection: {
            data: { content: string; userId: string };
            tweetId: string;
          }) => collection.data.content
        );
        setTweetContent([...tweetContents]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchUserTweet();
  }, []);

  return (
    <>
      <section className="flex flex-col ">
        <div className="bg-gray-500 h-36">
          <div className="relative top-16 left-6">
            <img
              src={defaultPfp}
              alt=""
              className="max-w-[150px] max-h-[150px] rounded-full"
            ></img>
          </div>
        </div>
        <button className="flex self-end px-3 py-2 m-2 rounded-full outline outline-white">
          Set up Profile
        </button>
      </section>

      <section className="flex flex-col gap-8 px-5 mt-16">
        <div>
          <div className="text-lg font-bold">{displayName}</div>
          <div className="text-gray-500 text-md">@{username}</div>
        </div>
        <div className="flex gap-6">
          <div className="text-gray-500">
            <span className="text-white">0</span> Following
          </div>
          <div className="text-gray-500">
            <span className="text-white">0</span> Followers
          </div>
        </div>
      </section>

      <section className="border-b border-[rgb(47,51,54)] flex">
        <nav className="flex flex-1 h-20 py-6">
          <button className="flex-1 hover:bg-[rgb(28,28,29)] max-h-14 h-14">
            Tweets
          </button>
          <button className="flex-1 hover:bg-[rgb(28,28,29)]  max-h-14 h-14">
            Replies
          </button>
          <button className="flex-1 hover:bg-[rgb(28,28,29)]  max-h-14 h-14">
            Media
          </button>
          <button className="flex-1 hover:bg-[rgb(28,28,29)]  max-h-14 h-14">
            Likes
          </button>
        </nav>
      </section>

      <section>
        {tweetContent.map((value, index) => {
          return <Tweet key={index} content={value} />;
        })}
      </section>
    </>
  );
};

export default ProfilePage;
