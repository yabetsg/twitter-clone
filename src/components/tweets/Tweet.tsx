import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import defaultPfp from "../../assets/default.png";
import { AppContext } from "../../contexts/AppContext";
import comment from "/src/assets/comment.svg";
import like from "/src/assets/like.svg";
import retweet from "/src/assets/retweet.svg";
import analytics from "/src/assets/analytics.svg";
import { TweetProps } from "props";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ITweet } from "tweet";
import { CommentModal } from "../comments/CommentModal";
import {
  checkIfUserhasLiked,
  updateTweetField,
  deleteLikedData,
  setLikesData,
  checkIfUserhasRetweeted,
  deleteRetweetedData,
  setRetweetsData,
  setTweetData,
} from "../../backend/services/tweetServices";
import { getData } from "../../backend/services/userServices";
export const Tweet = ({
  tweetId,
  content,
  displayName,
  username,
  likes,
  retweets,
  comments,
}: TweetProps) => {
  const [likesCount, setLikesCount] = useState(likes);
  const [retweetCount, setretweetCount] = useState(retweets);
  const [commentCount, setCommentCount] = useState(comments);
  const [userId] = useLocalStorage("userId", "");
  const [displayCommentModal, setDisplayCommentModal] = useState(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const likesRef = useRef<HTMLDivElement>(null);

  const handleLikes = () => {
    const tweetId = likesRef.current?.id ? likesRef.current?.id : "";
    checkIfUserhasLiked(userId, tweetId)
      .then((hasLiked) => {
        if (hasLiked) {
          setLikesCount(likesCount - 1);
          updateTweetField(tweetId, "likes", likesCount - 1);
          deleteLikedData(userId, tweetId);
        } else {
          setLikesCount(likesCount + 1);
          updateTweetField(tweetId, "likes", likesCount + 1);
          getData("tweets", tweetId)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const tweetData = snapshot.data() as ITweet;
                setLikesData(
                  userId,
                  tweetId,
                  tweetData.content,
                  likesCount
                ).catch((error) => console.log(error));
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleRetweet = () => {
    const tweetId = likesRef.current?.id ? likesRef.current?.id : "";
    checkIfUserhasRetweeted(userId, tweetId)
      .then((hasRetweeted) => {
        if (hasRetweeted) {
          setretweetCount(retweetCount - 1);
          updateTweetField(tweetId, "retweets", retweetCount - 1);
          deleteRetweetedData(userId, tweetId);
        } else {
          setretweetCount(retweetCount + 1);
          updateTweetField(tweetId, "retweets", retweetCount + 1);
          getData("tweets", tweetId)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const tweetData = snapshot.data() as ITweet;
                setRetweetsData(
                  userId,
                  tweetId,
                  tweetData.content,
                  retweetCount + 1
                ).catch((error) => console.log(error));
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleComment = () => {
    setDisplayCommentModal(true);
  };
  const handleReply = () => {
    console.log(commentContent);

    setTweetData("comments", tweetId, commentContent, userId)
      .then(() => setCommentContent(""))
      .catch((error) => console.log(error));
    setCommentCount(commentCount + 1);
  };

  return (
    <div
      className="border-b border-[rgb(47,51,54)] p-2"
      id={tweetId}
      ref={likesRef}
    >
      {displayCommentModal && (
        <CommentModal
          tweetId={tweetId}
          tweetContent={content}
          username={username ? username : ""}
          displayName={displayName ? displayName : ""}
          handleReply={handleReply}
          handleChange={setCommentContent}
        ></CommentModal>
      )}

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
        <div className="flex gap-3" onClick={handleComment}>
          <img className="w-5 h-5" src={comment} alt="" />

          <span className="text-sm text-gray-500">
            {commentCount > 0 && commentCount}
          </span>
        </div>
        <div className="flex gap-3" onClick={handleRetweet}>
          <img className="w-5 h-5" src={retweet} alt="" />
          <span className="text-sm text-gray-500">
            {retweetCount > 0 && retweetCount}
          </span>
        </div>
        <div className="flex gap-3" onClick={handleLikes}>
          <img className="w-5 h-5" src={like} alt="" />
          <span className="text-sm text-gray-500">
            {likesCount > 0 && likesCount}
          </span>
        </div>
        <img className="w-5 h-5" src={analytics} alt="" />
      </div>
    </div>
  );
};
