import { useContext } from "react";
import defaultPfp from "../../assets/default.png";
import { AppContext } from "../../contexts/AppContext";
import comment from "/src/assets/comment.svg"
import like from "/src/assets/like.svg"
import retweet from "/src/assets/retweet.svg"
import analytics from "/src/assets/analytics.svg"
export const Tweet = ({content}:{content:string}) => {
  const {displayName,username} = useContext(AppContext)
  return (
    <div className="border-b border-[rgb(47,51,54)] p-2">
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
          <img className="w-5 h-5" src={like} alt="" />
          <img className="w-5 h-5" src={analytics} alt="" />
          </div>
    </div>
  )
}

