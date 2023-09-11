import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import defaultPfp from "../../assets/default.png";
import { AppContext } from "../../contexts/AppContext";
import comment from "/src/assets/comment.svg";
import like from "/src/assets/like.svg";
import retweet from "/src/assets/retweet.svg";
import analytics from "/src/assets/analytics.svg";
import { TweetProps } from "props";
import { getData, setLikesData, updateData } from "../../backend/dataAccess";
import { signOut } from "firebase/auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
export const Tweet = ({
  tweetId,
  content,
  displayName,
  username,
  likes,
  
}: TweetProps) => {
  const [likeDisplay, setLikeDisplay] = useState(likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [userId] = useLocalStorage("userId", "");
  const likesRef = useRef<HTMLDivElement>(null);
  
  const handleLikes = () => {
    const tweetId = likesRef.current?.id?likesRef.current?.id:"";
    const newUserId = userId ? userId : "";
    console.log(userId)
    console.log(tweetId)
    setLikesData(userId,tweetId,"hjhfjh",10).catch(error=>console.log(error));
    if(hasLiked){
      setLikeDisplay(likeDisplay - 1)
      updateData(tweetId,likeDisplay-1);
    }else{
      setLikeDisplay(likeDisplay + 1);
      updateData(tweetId,likeDisplay+1);
    }
    setHasLiked(prevState=>!prevState);
   
  };

  
  return (
    <div className="border-b border-[rgb(47,51,54)] p-2" id={tweetId} ref={likesRef}>
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
        <img className="w-5 h-5" src={retweet} alt="" />
        <div className="flex gap-3" onClick={handleLikes}>
          <img className="w-5 h-5" src={like} alt=""  />
          <span className="text-sm text-gray-500">{likeDisplay>0&&likeDisplay}</span>
        </div>
        <img className="w-5 h-5" src={analytics} alt="" />
      </div>
    </div>
  );
};
