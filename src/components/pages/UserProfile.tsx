import React, { useContext, useEffect, useState } from "react";
import defaultPfp from "../../assets/default.png";
import backIcon from "../../assets/back.svg";
import { AppContext } from "../../contexts/AppContext";
import { fetchUserTweets } from "../../backend/services/tweetServices";
import { ITweet } from "tweet";
import { Tweet } from "../tweets/Tweet";
import uniqid from "uniqid";
import {
  checkIfUserHasFollowed,
  deleteFollowData,
  getData,
  setFollowingData,
  updateUserData,
} from "../../backend/services/userServices";
import { UserData } from "profile";
const UserProfile = () => {
  const {
    setUserProfileActive,
    showCommentSection,
    userProfileInfo,
    userId,
  } = useContext(AppContext);

  const [tweetContent, setTweetContent] = useState<ITweet[]>([]);
  const [followed, setFollowed] = useState(false);
  const [followingCount, setFollowingsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  const handleFollow = () => {
    const currentUserId = userId ? userId : "";
    const followedUserId = userProfileInfo.userid;
    checkIfUserHasFollowed(currentUserId, followedUserId)
      .then((followed) => {
        if (followed) {
          setFollowingData(
            currentUserId,
            followedUserId,
            userProfileInfo.displayName,
            userProfileInfo.username
          ).catch((error) => console.log(error));
          updateUserData(followedUserId, "followersCount", followersCount - 1);
          deleteFollowData(currentUserId, followedUserId);

          getData("users", currentUserId)
            .then((data) => {
              if (data.exists()) {
                const userData = data.data() as UserData;
                updateUserData(
                  currentUserId,
                  "followingCount",
                  userData.followingCount - 1
                );
              }
            })
            .catch((error) => console.log(error));
          setFollowersCount((prevCount) => prevCount - 1);
          setFollowed(false);
        } else {
          setFollowingData(
            currentUserId,
            followedUserId,
            userProfileInfo.displayName,
            userProfileInfo.username
          ).catch((error) => console.log(error));
          updateUserData(followedUserId, "followersCount", followersCount + 1);
          setFollowersCount((prevCount) => prevCount + 1);
          setFollowed(true);
          getData("users", currentUserId)
            .then((data) => {
              if (data.exists()) {
                const userData = data.data() as UserData;
                updateUserData(
                  currentUserId,
                  "followingCount",
                  userData.followingCount + 1
                );
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchUserTweets(userProfileInfo.userid, setTweetContent);
    const currentUserId = userId ? userId : "";
    const followedUser = userProfileInfo.userid;
    checkIfUserHasFollowed(currentUserId, followedUser)
      .then((followed) => {
        if (followed) {
          setFollowed(true);
        } else {
          setFollowed(false);
        }
      })
      .catch((error) => console.log(error));

    getData("users", followedUser)
      .then((data) => {
        if (data.exists()) {
          const userData = data.data() as UserData;
          setFollowersCount(userData.followersCount);
          setFollowingsCount(userData.followingCount);
        }
      })
      .catch((error) => console.log(error));
  }, [userId, userProfileInfo.userid, followersCount]);




  return (
    <>
      <section className="flex flex-col ">
        <div className="flex items-center gap-10 px-2 py-2">
          <span
            onClick={() => {
              setUserProfileActive(false);
              showCommentSection(false);
            }}
          >
            <img className="w-5 h-5" src={backIcon} alt="back" />
          </span>
          <div className="text-xl font-bold">Post</div>
        </div>
        <div className="bg-gray-500 h-36">
          <div className="relative top-16 left-6">
            <img
              src={defaultPfp}
              alt=""
              className="max-w-[150px] max-h-[150px] rounded-full"
            ></img>
          </div>
        </div>
        {followed ? (
          <button
            onClick={handleFollow}
            className="z-30 flex self-end justify-center w-24 p-1 m-2 font-semibold text-center text-white rounded-full before:content-['Following'] hover:before:content-['Unfollow'] hover:text-[rgb(244,33,47)]  hover:bg-opacity-30 hover:outline-[rgb(103,7,15)] hover:bg-red-900 cursor-pointer outline outline-gray-500"
          ></button>
        ) : (
          <button
            onClick={handleFollow}
            className="z-30 flex self-end justify-center w-20 p-1 m-2 font-semibold text-center text-black bg-white rounded-full outline outline-white"
          >
            Follow
          </button>
        )}
      </section>

      <section className="flex flex-col gap-8 px-5 mt-16">
        <div>
          <div className="text-lg font-bold">{userProfileInfo.displayName}</div>
          <div className="text-gray-500 text-md">
            @{userProfileInfo.username}
          </div>
        </div>
        <div className="flex gap-6">
          <div className="text-gray-500">
            <span className="text-white">{followingCount}</span> Following
          </div>
          <div className="text-gray-500">
            <span className="text-white">{followersCount}</span> Followers
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
        {" "}
        {tweetContent.map((value) => {
          const key = uniqid();
          return (
            <Tweet
              userid={value.userId}
              displayNameT={userProfileInfo.displayName}
              usernameT={userProfileInfo.displayName}
              key={key}
              content={value.content}
              likes={value.likes}
              retweets={value.retweets}
              comments={value.comments}
              tweetId={value.tweetId}
            />
          );
        })}
      </section>
    </>
  );
};
export default UserProfile;
