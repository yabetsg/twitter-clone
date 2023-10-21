import { FormEvent, useContext, useEffect, useState } from "react";
import defaultPfp from "../../assets/default.png";
import { AppContext } from "../../contexts/AppContext";
import backIcon from "../../assets/back.svg";
import comment from "/src/assets/comment.svg";
import like from "/src/assets/like.svg";
import retweet from "/src/assets/retweet.svg";
import analytics from "/src/assets/analytics.svg";

import { ITweet } from "tweet";
import {
  checkIfUserhasLiked,
  updateTweetField,
  deleteLikedData,
  setLikesData,
  checkIfUserhasRetweeted,
  deleteRetweetedData,
  setRetweetsData,
  getComments,
  setCommentsData,
} from "../../backend/services/tweetServices";
import { getData } from "../../backend/services/userServices";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Tweet } from "../tweets/Tweet";
import uniqid from "uniqid";

export const CommentSection = () => {
  const {
    showCommentSection,
    setCommentContent,
    commentContent,
    username,
    displayName,
  } = useContext(AppContext);
  const [likesCount, setLikesCount] = useState(commentContent.likes);
  const [retweetCount, setRetweetCount] = useState(commentContent.retweets);
  const [commentCount, setCommentCount] = useState(commentContent.comments);
  const [userId] = useLocalStorage("userId", "");
  const [comments, setComments] = useState<ITweet[]>([]);
  const [commentInput, setCommentInput] = useState<string>("");
  


  const handleLikes = () => {
    const tweetId = commentContent.tweetId;
    checkIfUserhasLiked(userId, tweetId)
      .then((hasLiked) => {
        if (hasLiked) {
          setLikesCount(likesCount - 1);
          updateTweetField(tweetId, "likes", likesCount - 1);
          deleteLikedData(userId, tweetId);
          const shareLikeCount = likesCount-1;
          const content = commentContent.content;
          const displayNameT = commentContent.displayNameT;
          const usernameT = commentContent.displayNameT;
          const retweets = commentContent.retweets;
          setCommentContent({
            tweetId,
            content,
            displayNameT,
            usernameT,
            shareLikeCount,
            retweets,
            comments,
          });
        } else {
          setLikesCount(likesCount + 1);
          updateTweetField(tweetId, "likes", likesCount + 1);
          const shareLikeCount = likesCount+1;
          const content = commentContent.content;
          const displayNameT = commentContent.displayNameT;
          const usernameT = commentContent.displayNameT;
          const retweets = commentContent.retweets;
          setCommentContent({
            tweetId,
            content,
            displayNameT,
            usernameT,
            shareLikeCount,
            retweets,
            comments,
          });
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
    const tweetId = commentContent.tweetId;
   

    checkIfUserhasRetweeted(userId, tweetId)
      .then((hasRetweeted) => {
        if (hasRetweeted) {
          setRetweetCount(retweetCount - 1);
          updateTweetField(tweetId, "retweets", retweetCount - 1);
          deleteRetweetedData(userId, tweetId);
          const shareRetweetCount = retweetCount-1;
          const content = commentContent.content;
          const displayNameT = commentContent.displayNameT;
          const usernameT = commentContent.displayNameT;
          const retweets = commentContent.retweets;
          setCommentContent({
            tweetId,
            content,
            displayNameT,
            usernameT,
            shareRetweetCount,
            retweets,
            comments,
          });
        } else {
          setRetweetCount(retweetCount + 1);
          updateTweetField(tweetId, "retweets", retweetCount + 1);
          const shareRetweetCount = retweetCount+1;
          const content = commentContent.content;
          const displayNameT = commentContent.displayNameT;
          const usernameT = commentContent.displayNameT;
          const retweets = commentContent.retweets;
          setCommentContent({
            tweetId,
            content,
            displayNameT,
            usernameT,
            shareRetweetCount,
            retweets,
            comments,
          });
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

  const handleReply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentId = uniqid();
    const tweetId = commentContent.tweetId;
    const content = commentContent.content;
    const displayNameT = commentContent.displayNameT;
    const usernameT = commentContent.displayNameT;
    const likes = commentContent.likes;
    const retweets = commentContent.retweets;
    setCommentsData(
      commentId,
      tweetId,
      commentInput,
      userId,
      username,
      displayName
    )
      .then(() => setCommentInput(""))
      .catch((error) => console.log(error));
    setCommentCount((prevComment) => prevComment + 1);

    updateTweetField(tweetId, "comments", commentCount + 1);
    const shareCommentCount = commentCount+1;
    setCommentContent({
      tweetId,
      content,
      displayNameT,
      usernameT,
      likes,
      retweets,
      shareCommentCount,
    });
  };

  useEffect(() => {
    const fetchComments = async () => {
      const tweetid = commentContent.tweetId;
      const commentData: ITweet[] = [];
      const commentsSnapshot = await getComments(tweetid);
      commentsSnapshot.forEach((doc) => {
        const comment = doc.data() as ITweet;
        commentData.push(comment);
      });
      setComments(commentData);
    };

    fetchComments().catch((error) => console.log(error));
  }, [commentContent.tweetId,commentCount]);


 
  return (
    <main>
      <section className="p-4">
        <div className="flex items-center gap-10 pb-5">
          <span onClick={() => showCommentSection(false)}>
            <img className="w-5 h-5" src={backIcon} alt="back" />
          </span>
          <div className="text-xl font-bold">Post</div>
        </div>

        <div className="flex py-3">
          <div>
            <img
              src={defaultPfp}
              alt=""
              className="max-w-[50px] max-h-[50px] rounded-full"
            ></img>
          </div>

          <div>
            <div className="text-center  gap-0 hover:bg-[rgb(28,28,29)]  pl-3 ">
              <div className="h-fit w-fit">{commentContent.displayNameT}</div>
              <div className="text-gray-500">@{commentContent.usernameT}</div>
            </div>
          </div>
        </div>
        <div className="pt-3 text-lg font-light">{commentContent.content}</div>
        <div className="py-2 text-sm font-medium text-gray-500">
          Oct. 12 2012
        </div>
        <div className="flex flex-col border-b mb-2 border-[rgb(47,51,54)]"></div>
        <div className="flex justify-around ">
          <div className="flex gap-3">
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
        <div className="flex flex-col border-b border-[rgb(47,51,54)] mt-2"></div>
      </section>

      <section>
        <form
          action=""
          className="flex flex-col border-b border-[rgb(47,51,54)]"
          onSubmit={handleReply}
        >
          <div className="px-4">
            <div className="absolute mt-4">
              <img
                src={defaultPfp}
                alt=""
                className="max-w-[50px] max-h-[50px] rounded-full"
              ></img>
            </div>
            <div className="pt-4 pl-16">
              <input
                type="text"
                placeholder="Post your reply"
                className="w-[90%] pt-2 text-xl bg-inherit outline-none"
                onChange={(e) => setCommentInput(e.target.value)}
                value={commentInput}
              />
            </div>
            <div className="flex justify-end p-2">
              <button
                className="bg-[rgb(29,155,240)] rounded-full w-24 h-8 font-medium"
                type="submit"
              >
                Reply
              </button>
            </div>
          </div>
        </form>
      </section>

      <section>
        {comments.map((value) => {
          const key = uniqid();
          return (
            <Tweet
              key={key}
              userid={value.userId}
              tweetId={value.tweetId}
              content={value.content}
              displayNameT={value.displayName}
              usernameT={value.username}
              likes={value.likes}
              retweets={value.retweets}
              comments={0}
            ></Tweet>
          );
        })}
      </section>
    </main>
  );
};
