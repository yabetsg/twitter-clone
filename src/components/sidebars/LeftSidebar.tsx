import twittericon from "/src/assets/twitter.svg";
import homeicon from "/src/assets/homeicon.svg";
import profileicon from "/src/assets/profile.svg";
import exploreicon from "/src/assets/explore.svg";
import notificationicon from "/src/assets/notification.svg";
import bookmarkicon from "/src/assets/bookmarks.svg";
import messageicon from "/src/assets/messages.svg";
import moreicon from "/src/assets/more.svg";
import defaultimg from "/src/assets/default.png";
import { AppContext } from "../../contexts/AppContext";
import { useContext, useState } from "react";

export const LeftSidebar = () => {
  const { displayName, username, handleLogout, showProfile } =
    useContext(AppContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogoutModal = () => {
    setShowLogoutModal((prev) => !prev);
  };

  return (
    <div className="fixed flex flex-col items-center w-1/4 h-screen text-white bg-black ">
      <div className="flex p-4 mr-44 hover:rounded-full hover:bg-[rgb(28,28,29)]">
        <img className="w-7 h-7" src={twittericon} alt="twitter icon" />
      </div>
      <nav>
        <div
          className="flex gap-5 p-5 text-xl hover:bg-[rgb(28,28,29)] hover:rounded-full cursor-pointer "
          onClick={() => showProfile(false)}
        >
          <span className="">
            <img className="w-7 h-7" src={homeicon} alt="" />
          </span>
          <div className="max-lg:hidden">Home</div>
        </div>

        <div className="flex gap-5 p-5 text-xl hover:bg-[rgb(28,28,29)] hover:rounded-full cursor-pointer">
          <span>
            <img className="w-7 h-7" src={exploreicon} alt="" />
          </span>
          <div className="max-lg:hidden">Explore</div>
        </div>

        <div className="flex gap-5 p-5 text-xl hover:bg-[rgb(28,28,29)] hover:rounded-full cursor-pointer">
          <span>
            <img className="w-7 h-7" src={notificationicon} alt="" />
          </span>
          <div className="max-lg:hidden">Notifications</div>
        </div>

        <div className="flex gap-5 p-5 text-xl hover:bg-[rgb(28,28,29)] hover:rounded-full cursor-pointer">
          <span>
            <img className="w-7 h-7" src={messageicon} alt="" />
          </span>
          <div className="max-lg:hidden">Message</div>
        </div>

        <div className="flex gap-5 p-5 text-xl hover:bg-[rgb(28,28,29)] hover:rounded-full cursor-pointer">
          <span>
            <img className="w-7 h-7" src={bookmarkicon} alt="" />
          </span>
          <div className="max-lg:hidden">Bookmark</div>
        </div>

        <div
          className="flex gap-5 p-5 text-xl hover:bg-[rgb(28,28,29)] hover:rounded-full cursor-pointer"
          onClick={() => showProfile(true)}
        >
          <span>
            <img className="w-7 h-7" src={profileicon} alt="" />
          </span>
          <div className="max-lg:hidden">Profile</div>
        </div>

        <div className="flex gap-5 p-5 text-xl hover:bg-[rgb(28,28,29)] hover:rounded-full cursor-pointer">
          <span>
            <img className="w-8 h-8" src={moreicon} alt="" />
          </span>
          <div className="max-lg:hidden">More</div>
        </div>

        <div className="flex items-center justify-center gap-5 p-5 text-xl">
          <button className="bg-[rgb(29,155,240)] rounded-3xl w-[208px] h-12 hover:bg-[rgb(15,132,210)] font-semibold">
            Tweet
          </button>
        </div>
      </nav>
      <div className="w-inherit h-[146px] flex items-center justify-center flex-col gap-3">
        {showLogoutModal && (
          <button
            onClick={handleLogout}
            className="max-w-[200px] w-[300px] text-white rounded-full bg-red-500 h-9"
          >
            Logout
          </button>
        )}
        <button
          className="flex  hover:bg-[rgb(28,28,29)] hover:rounded-full min-w-[192px] p-2"
          onClick={handleLogoutModal}
        >
          <div>
            <img
              className="max-w-[45px] max-h-[40px] rounded-full"
              src={defaultimg}
              alt=""
            ></img>
          </div>
          <div className="text-center hover:bg-[rgb(28,28,29)] hover:rounded-full pl-3">
            <div className="h-fit w-fit">{displayName}</div>
            <div className="text-gray-500">@{username}</div>
          </div>
        </button>
      </div>
    </div>
  );
};
