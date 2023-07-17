import twittericon from "/src/assets/twitter.svg";
import homeicon from "/src/assets/homeicon.svg";
import profileicon from "/src/assets/profile.svg";
import exploreicon from "/src/assets/explore.svg";
import notificationicon from "/src/assets/notification.svg";
import bookmarkicon from "/src/assets/bookmarks.svg";
import messageicon from "/src/assets/messages.svg";
import moreicon from "/src/assets/more.svg";
import defaultimg from "/src/assets/default.png";
export const LeftSidebar = () => {
  return (
    <div className="fixed flex flex-col items-center w-1/4 h-screen text-white bg-black ">
      <div className="flex p-4 mr-44">
        <img className="w-7 h-7" src={twittericon} alt="twitter icon" />
      </div>
      <nav>
        <div className="flex gap-5 p-5 text-xl">
          <span>
            <img className="w-7 h-7" src={homeicon} alt="" />
          </span>
          Home
        </div>

        <div className="flex gap-5 p-5 text-xl">
          <span>
            <img className="w-7 h-7" src={exploreicon} alt="" />
          </span>
          Explore
        </div>

        <div className="flex gap-5 p-5 text-xl">
          <span>
            <img className="w-7 h-7" src={notificationicon} alt="" />
          </span>
          Notifications
        </div>

        <div className="flex gap-5 p-5 text-xl">
          <span>
            <img className="w-7 h-7" src={messageicon} alt="" />
          </span>
          Message
        </div>

        <div className="flex gap-5 p-5 text-xl">
          <span>
            <img className="w-7 h-7" src={bookmarkicon} alt="" />
          </span>
          Bookmark
        </div>

        <div className="flex gap-5 p-5 text-xl">
          <span>
            <img className="w-7 h-7" src={profileicon} alt="" />
          </span>
          Profile
        </div>

        <div className="flex gap-5 p-5 text-xl">
          <span>
            <img className="w-8 h-8" src={moreicon} alt="" />
          </span>
          More
        </div>

        <div className="flex justify-center gap-5 p-5 text-xl">
          <button className="bg-[rgb(29,155,240)] rounded-3xl w-52 h-12">
            Tweet
          </button>
        </div>

        <button className="flex pl-5">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src={defaultimg}
              alt=""
            ></img>
          </div>
          <div className="text-center">
            <div>Name</div>
            <div className="pl-3 text-gray-500">@name</div>
          </div>
        </button>
      </nav>
    </div>
  );
};
