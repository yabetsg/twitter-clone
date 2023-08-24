import { ForYouProps } from "props";

export const ForYouPage = ({
  handleTweetSubmit,
  inputRef,
  content,
}: ForYouProps) => {
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
      <div>
        <section>{content}</section>
      </div>
    </>
  );
};
