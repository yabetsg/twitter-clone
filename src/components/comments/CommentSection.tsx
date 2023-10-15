import { useContext, useEffect, useRef, useState } from "react";
import defaultPfp from "../../assets/default.png";
import { AppContext } from "../../contexts/AppContext";
import backIcon from "../../assets/back.svg";
import comment from "/src/assets/comment.svg";
import like from "/src/assets/like.svg";
import retweet from "/src/assets/retweet.svg";
import analytics from "/src/assets/analytics.svg";
import { TweetProps } from "props";
import { Comment, ITweet } from "tweet";
import {
  checkIfUserhasLiked,
  updateTweetField,
  deleteLikedData,
  setLikesData,
  checkIfUserhasRetweeted,
  deleteRetweetedData,
  setRetweetsData,
  setTweetData,
  getComments,
} from "../../backend/services/tweetServices";
import { getData } from "../../backend/services/userServices";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Tweet } from "../tweets/Tweet";

export const CommentSection = () => {
  const { showCommentSection, setCommentContent, commentContent } =
    useContext(AppContext);
  const [likesCount, setLikesCount] = useState(commentContent.likes);
  const [retweetCount, setretweetCount] = useState(commentContent.retweets);
  const [commentCount, setCommentCount] = useState(commentContent.comments);
  const [userId] = useLocalStorage("userId", "");
  const [comments, setComments] = useState<ITweet[]>([]);
  const [commentProfile, setCommentProfile] = useState<{
    displayName: string;
    userName: string;
  }>({ displayName: "", userName: "" });
  const tweetRef = useRef<HTMLDivElement>(null);

  const handleLikes = () => {
    const tweetId = tweetRef.current?.id ? tweetRef.current?.id : "";
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
    const tweetId = tweetRef.current?.id ? tweetRef.current?.id : "";
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

  // const handleReply = () => {
  //   console.log(commentContent);

  //   setTweetData("comments", tweetId, commentContent, userId)
  //     .then(() => setCommentContent(""))
  //     .catch((error) => console.log(error));
  //   setCommentCount(commentCount + 1);
  // };
 

  useEffect(() => {
    const fetchComments = async() => {
      const tweetid = commentContent.tweetId;
      const commentData:ITweet[] = []
      const commentsSnapshot = await getComments(tweetid);
      commentsSnapshot.forEach((doc)=>{
        const comment = doc.data() as ITweet;
        commentData.push(comment);
      })
      setComments(commentData);
    };

    fetchComments().catch((error)=>console.log(error));
  }, [commentContent.tweetId]);
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
                className="w-[90%] pt-2 text-xl bg-inherit outline-none "
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
        {comments.map((value, index) => {
          return (
            <Tweet
              key={index}
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
