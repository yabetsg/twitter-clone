import {
  FormEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ProfilePage from "./ProfilePage";
import { AppContext } from "../../contexts/AppContext";
import { setTweetData } from "../../backend/dataAccess";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import uniqid from "uniqid";
import { Tweet } from "../tweets/Tweet";
import { fetchCurrentUserTweets, fetchForYouTweets } from "../../backend/tweets";
import { ForYouPage } from "./ForYouPage";


export const MainContent = () => {
  const { profileActive, username, displayName } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [userId] = useLocalStorage("userId", "");
  const [renderForYou, setRenderForYou] = useState<boolean>(true);
  const [forYouPageSelected, setForYouPageSelected] = useState<string>(
    "underline underline-offset-[15px] decoration-[rgb(29,155,240)]"
  );
  const [followingPageSelected, setFollowingPageSelected] =
    useState<string>("");
  const handleTweetSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tweet = inputRef.current ? inputRef.current.value : "";
    inputRef.current ? (inputRef.current.value = "") : null;
    setTweetData("tweets", uniqid(), tweet, userId).catch((error) =>
      console.log(error)
    );
  };
  const [tweetContent, setTweetContent] = useState<Array<object>>([]);

  const handlePageSelection = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    if (element.id === "following") {
      setFollowingPageSelected(
        "underline underline-offset-[15px] decoration-[rgb(29,155,240)]"
      );
      setForYouPageSelected("");
    } else if (element.id === "for-you") {
      setFollowingPageSelected("");
      setForYouPageSelected(
        "underline underline-offset-[15px] decoration-[rgb(29,155,240)]"
      );
    }
    
  };
  useEffect(() => {
    fetchForYouTweets(setTweetContent);
  }, [tweetContent]);
  return (
    <>
      <div className="w-[45%]  text-white bg-black ml-[25%]  border-[rgb(47,51,54)] border-x border-collapse">
        {!profileActive ? (
          <>
            <section className="fixed flex flex-col bg-black w-[44.9%] opacity-95">
              <header className="p-3 text-xl font-bold ">Home</header>
              <div className="flex justify-around p-5 border-b border-[rgb(47,51,54)]">
                <button
                  className={forYouPageSelected}
                  id="for-you"
                  onClick={handlePageSelection}
                >
                  For you
                </button>
                <button
                  className={followingPageSelected}
                  id="following"
                  onClick={handlePageSelection}
                >
                  Following
                </button>
              </div>
            </section>

            <ForYouPage
              handleTweetSubmit={handleTweetSubmit}
              inputRef={inputRef}
              content={tweetContent.map((value, index) => {
                return <Tweet key={index} content={value} displayName={undefined} username={undefined} />;
              })}
            ></ForYouPage>
            
          </>
        ) : (
          <ProfilePage displayName={displayName} username={username} />
        )}
      </div>
    </>
  );
};
