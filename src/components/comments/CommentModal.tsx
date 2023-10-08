import { CommentModalProps } from "props";
import defaultPfp from "../../assets/default.png";

export const CommentModal = ({
  tweetId,
  tweetContent,
  username,
  displayName,
  handleReply,
  handleChange,
}: CommentModalProps) => {
  return (
    <div className="fixed pt-10 inset-0 z-50   bg-[rgba(156,163,175,0.3)] max-sm:p-0">
      <div
        id={tweetId}
        className="max-w-[600px] p-3 mx-auto bg-black rounded-lg opacity-100 max-[598px]:w-full max-sm:h-full "
      >
        <div>
          <img
            src={defaultPfp}
            alt=""
            className="max-w-[40px] max-h-[40px] rounded-full relative top-10"
          ></img>
          <div className="text-center flex gap-2 hover:bg-[rgb(28,28,29)]  pl-12">
            <div className="h-fit w-fit">{displayName}</div>
            <div className="text-gray-500">@{username}</div>
          </div>
          <div className="pl-12 font-extralight">{tweetContent}</div>
          <div className="pl-12 text-[rgb(113,118,123)] mt-3">
            Replying to <span className="text-blue-400">@{username}</span>
          </div>
        </div>

        <div>
          <div className="flex">
            <img
              src={defaultPfp}
              alt=""
              className="max-w-[40px] max-h-[40px] rounded-full mt-3"
            ></img>
            <div className="">
              <input
                type="text"
                name=""
                id=""
                placeholder="Tweet your reply"
                className="p-5 text-xl outline-none bg-inherit"
                onChange={(input) => {
                  handleChange(input.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleReply}
            className="bg-[rgb(29,155,240)] p-1 px-3  rounded-full"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};
