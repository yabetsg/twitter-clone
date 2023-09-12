import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import defaultPfp from "../../assets/default.png";
import { AppContext } from "../../contexts/AppContext";
import comment from "/src/assets/comment.svg";
import like from "/src/assets/like.svg";
import retweet from "/src/assets/retweet.svg";
import analytics from "/src/assets/analytics.svg";
import { TweetProps } from "props";
import {
  checkIfUserhasLiked,
  checkIfUserhasRetweeted,
  deleteLikedData,
  deleteRetweetedData,
  getData,
  setLikesData,
  setRetweetsData,
  updateLikes,
  updateRetweets,
} from "../../backend/dataAccess";
import { signOut } from "firebase/auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ITweet } from "tweet";
export const Tweet = ({
  tweetId,
  content,
  displayName,
  username,
  likes,
  retweets,
}: TweetProps) => {
  const [likeDisplay, setLikeDisplay] = useState(likes);
  const [retweetDisplay, setRetweetDisplay] = useState(retweets);
  const [userId] = useLocalStorage("userId", "");
  const likesRef = useRef<HTMLDivElement>(null);

  const handleLikes = () => {
    const tweetId = likesRef.current?.id ? likesRef.current?.id : "";
    checkIfUserhasLiked(userId, tweetId)
      .then((hasLiked) => {
        if (hasLiked) {
          setLikeDisplay(likeDisplay - 1);
          updateLikes(tweetId, likeDisplay - 1);
          deleteLikedData(userId, tweetId);
        } else {
          setLikeDisplay(likeDisplay + 1);
          updateLikes(tweetId, likeDisplay + 1);
          getData("tweets", tweetId)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const tweetData = snapshot.data() as ITweet;
                setLikesData(
                  userId,
                  tweetId,
                  tweetData.content,
                  likeDisplay
                ).catch((error) => console.log(error));
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleRetweet = ()=>{
    const tweetId = likesRef.current?.id ? likesRef.current?.id : "";
    checkIfUserhasRetweeted(userId,tweetId).then((hasRetweeted)=>{
        if(hasRetweeted){
            setRetweetDisplay(retweetDisplay-1);
            updateRetweets(tweetId,retweetDisplay-1);
            deleteRetweetedData(userId,tweetId);
        }else{
          setRetweetDisplay(retweetDisplay+1);
          updateRetweets(tweetId,retweetDisplay+1);
          getData("tweets",tweetId).then((snapshot)=>{
            if(snapshot.exists()){
              const tweetData = snapshot.data() as ITweet;
              setRetweetsData(userId,tweetId,tweetData.content,retweetDisplay+1).catch(error=>console.log(error));
            }
          }).catch(error=>console.log(error));
        }
    }).catch(error=>console.log(error));
  }

  return (
    <div
      className="border-b border-[rgb(47,51,54)] p-2"
      id={tweetId}
      ref={likesRef}
    >
      <div className="flex py-3">
        <div>
          <img
            src={defaultPfp}
            alt=""
            className="max-w-[50px] max-h-[50px] rounded-full"
          ></img>
        </div>

        <div>
          <div className="text-center flex gap-2 hover:bg-[rgb(28,28,29)]  pl-3">
            <div className="h-fit w-fit">{displayName}</div>
            <div className="text-gray-500">@{username}</div>
          </div>
          <div className="pl-3 font-extralight">{content}</div>
        </div>
      </div>
      <div className="flex justify-around ">
        <img className="w-5 h-5" src={comment} alt="" />
        <div className="flex gap-3" onClick={handleRetweet}>
        <img className="w-5 h-5" src={retweet} alt="" />
        <span  className="text-sm text-gray-500">
          {retweetDisplay>0&&retweetDisplay}
        </span>
        </div>
        <div className="flex gap-3" onClick={handleLikes}>
          <img className="w-5 h-5" src={like} alt="" />
          <span className="text-sm text-gray-500">
            {likeDisplay > 0 && likeDisplay}
          </span>
        </div>
        <img className="w-5 h-5" src={analytics} alt="" />
      </div>
    </div>
  );
};
