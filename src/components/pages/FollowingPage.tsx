import { ForYouProps } from "props";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import {
  getData,
  getFollowingData,
  getUserTweet,
} from "../../backend/services/userServices";
import { ITweet } from "tweet";
import { fetchUserTweets } from "../../backend/services/tweetServices";
import { Tweet } from "../tweets/Tweet";
import uniqid from "uniqid";

export const FollowingPage = ({ handleTweetSubmit, inputRef }: ForYouProps) => {
  const { userId } = useContext(AppContext);
  const [followingContent, setFollowingContent] = useState<Array<ITweet>>([]);

  useEffect(() => {
    const currentUserId = userId ? userId : "";
    const followingIds: string[] = [];
    getFollowingData(currentUserId)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const followingId = doc.id;
          followingIds.push(followingId);
        });

        const tweets: ITweet[] = [];
        const promises:Promise<void>[] = [];
        followingIds.forEach((id) => {
          const promise = getUserTweet(id)
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                const tweetData = doc.data() as ITweet;
                tweets.push(tweetData);
              });
            })
            .catch((error) => console.log(error));
            promises.push(promise)
          });
          Promise.all(promises).then(()=>{
            setFollowingContent(tweets);
            
          }).catch((error)=>console.log(error));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);
  return (
    <>
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

      <section>
        {followingContent.map((value) => {
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
            ></Tweet>
          );
        })}
      </section>
    </>
  );
};
