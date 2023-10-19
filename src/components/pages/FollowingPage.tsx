import { ForYouProps } from "props";
import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";


export const FollowingPage = ({ handleTweetSubmit, inputRef }: ForYouProps) => {

  const {userId} = useContext(AppContext);

  useEffect(()=>{
    // const currentUserId = userId?userId:"";
    // getFollowingData().then((snapshot)=>{
    //   snapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // }).catch((error)=>console.log(error))
  },[])
  return (
    <>
      <section className="mt-28">
        <form
          action=""
          className="flex flex-col border-b border-[rgb(47,51,54)]"
          onSubmit={handleTweetSubmit}
        >
          <div className="pl-7">
            <input
              ref={inputRef}
              type="text"
              placeholder="What is happening?!"
              className="w-[90%] p-5 text-xl bg-inherit outline-none "
            />
          </div>
          <div className="flex justify-end p-3">
            <button
              className="bg-[rgb(29,155,240)] rounded-xl w-24 h-8"
              type="submit"
            >
              Tweet
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
