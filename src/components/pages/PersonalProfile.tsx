import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { ProfileProps } from "props";
import defaultPfp from "../../assets/default.png";
import { Tweet } from "../tweets/Tweet";

import { useLocalStorage } from "../../hooks/useLocalStorage";

import { ITweet } from "tweet";
import { fetchUserTweets } from "../../backend/services/tweetServices";
import { getData, setUserData } from "../../backend/services/userServices";
import uniqid from "uniqid";
import { AppContext } from "../../contexts/AppContext";
import { UserData } from "profile";
export const PersonalProfile = ({ displayName, username }: ProfileProps) => {
  const [tweetContent, setTweetContent] = useState<Array<ITweet>>([]);
  const [displaySetupModal, setDisplaySetupModal] = useState<boolean>(false);

  const [userId] = useLocalStorage("userId", "");

  const [formTitle, setFormTitle] = useState<string>("Change your username");
  const [formPlaceholder, setFormPlaceholder] =
    useState<string>("Enter new username");
  const [displayButton, setDisplayButton] = useState<boolean>(false);
  const [newUserInfo, setNewUserInfo] = useState<{
    username: string | undefined;
    displayName: string | undefined;
  }>();
  const [userValue, setUserValue] = useState("");
  const [followingCount,setFollowingsCount] = useState(0);
  const [followersCount,setFollowersCount] = useState(0);
  // const {} = useContext(AppContext);

  useEffect(() => {
    getData('users',userId).then((snapshot)=>{
      const userData = snapshot.data() as UserData;
      setFollowingsCount(userData.followingCount);
      setFollowersCount(userData.followersCount);
    }).catch((error)=>console.log(error));
    fetchUserTweets(userId, setTweetContent);
  }, [userId]);



  const handleNextBtn = () => {
    setFormTitle("Change your display name");
    setFormPlaceholder("Enter new display name");
    setDisplayButton((prevState) => !prevState);

    setNewUserInfo({ username: userValue, displayName: "" });
    setUserValue("");
  };
  const handleSetupForm = (event: SyntheticEvent) => {
    event.preventDefault();

    setNewUserInfo((prevState) => ({
      username: prevState?.username,
      displayName: userValue,
    }));
    setUserValue("");
    setDisplaySetupModal((prevState) => !prevState);
  };

  useEffect(() => {
    if (newUserInfo?.displayName || newUserInfo?.username) {
      const newDisplayName = newUserInfo?.displayName;
      const newUserName = newUserInfo?.username
        ? newUserInfo?.username
        : "error";

      setUserData("users", userId, newDisplayName, newUserName).catch((error) =>
        console.log(error)
      );
    }
  }, [newUserInfo?.displayName, newUserInfo?.username, userId]);
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
        <button
          className="z-30 flex self-end px-3 py-2 m-2 rounded-full outline outline-white"
          onClick={() => {
            setDisplaySetupModal((prevState) => !prevState);
          }}
        >
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

      {displaySetupModal ? (
        <section className="">
          <form onSubmit={handleSetupForm}>
            <div className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-gray-800 z-40 top-1/2 left-1/2 max-sm:w-full max-sm:h-full text-center rounded-lg flex flex-col gap-8 p-20 justify-center">
              <div className="text-2xl font-extrabold text-white ">
                {formTitle}
              </div>
              <input
                className="p-3 text-black rounded-full placeholder:p-2"
                placeholder={formPlaceholder}
                value={userValue}
                onChange={(e) => setUserValue(e.target.value)}
              ></input>

              {!displayButton ? (
                <button
                  className="bg-[rgb(29,155,240)] px-8 py-3 self-center rounded-full text-lg font-semibold"
                  onClick={handleNextBtn}
                >
                  Next
                </button>
              ) : null}
              {displayButton ? (
                <button className="bg-[rgb(29,155,240)] px-8 py-3 self-center rounded-full text-lg font-semibold">
                  Done
                </button>
              ) : null}
            </div>
          </form>
        </section>
      ) : null}

      <section>
        {tweetContent.map((value) => {
          const key = uniqid();
          return (
            <Tweet
              userid={value.userId}
              displayNameT={displayName}
              usernameT={username}
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

export default PersonalProfile;
