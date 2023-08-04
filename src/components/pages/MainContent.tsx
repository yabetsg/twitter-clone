import { FormEvent, useContext, useRef } from "react";
import ProfilePage from "./ProfilePage";
import { AppContext } from "../../contexts/AppContext";
import { setTweetData } from "../../backend/dataAccess";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const MainContent = () => {
  const { profileActive, username, displayName } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [userId,setUserId]= useLocalStorage("userId");
  const handleTweetSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const tweet = inputRef.current? inputRef.current.value:"";
        inputRef.current? inputRef.current.value = '':null;
        setTweetData("tweets","1231",tweet,userId).catch((error)=>console.log(error))
  }
  return (
    <>
      <div className="w-[45%]  text-white bg-black ml-[25%]  border-[rgb(47,51,54)] border-x border-collapse">
        {!profileActive ? (
          <>
            <section className="fixed flex flex-col bg-black w-[44.9%] opacity-95">
              <header className="p-3 text-xl font-bold ">Home</header>
              <div className="flex justify-around p-5 border-b border-[rgb(47,51,54)]">
                <button>For you</button>
                <button>Following</button>
              </div>
            </section>

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

            <section className="">
              <div>
                Odio accusantium ullam at soluta
                eligendi iste sapiente corporis dolorem voluptates repellat
                quas, animi omnis labore? Ex vel officiis repudiandae fugit
                eligendi sequi mollitia magnam aliquam blanditiis voluptate cum
                nisi quidem molestias exercitationem, temporibus est beatae
                omnis laudantium possimus excepturi sed aspernatur modi?
                Accusamus, et earum. Amet vel voluptatem illum nobis accusantium
                reiciendis, nemo deserunt, quaerat perspiciatis autem velit
                praesentium aspernatur consectetur soluta minima nostrum magnam
                accusamus, harum nam. Quibusdam dolor mollitia laborum natus ea
                sapiente? Sequi minus est hic nemo ab delectus voluptas, ullam
                veritatis, doloribus magnam voluptatum vero reprehenderit
                accusantium excepturi labore inventore. Atque explicabo nesciunt
                temporibus, omnis a consectetur quis. Eaque, rem officiis?
                Recusandae itaque ipsam numquam ea dignissimos accusamus quam
                cupiditate quae incidunt distinctio voluptatem dolorem cum nisi
                blanditiis tenetur harum, quaerat a labore id natus explicabo
                sed ex dolor magnam. Unde! Numquam, tempore debitis,
                reprehenderit omnis eius suscipit deleniti pariatur, modi iste
                aliquam possimus fugiat ex expedita architecto doloremque
                sapiente neque! Minima quae dignissimos rem, modi voluptatibus
                omnis perspiciatis molestiae ex? At, minima? Distinctio, sunt
                dolores! Placeat aspernatur, suscipit provident, fugit neque
                ipsa reiciendis harum in nisi facere doloribus quis iure alias
                voluptas est error possimus earum, natus doloremque odio? Ullam.
                Distinctio nesciunt ratione sit, ducimus amet voluptatum fugit
                alias odit ullam. Velit officiis odit eius ipsum praesentium
                iusto, beatae laudantium veniam autem modi ea facilis illum
                reprehenderit, expedita deserunt non. Ea commodi mollitia amet
                nemo ex. Odio ut, id iusto, architecto ad expedita autem
                consectetur deleniti assumenda dolorum deserunt. Laboriosam odio
                soluta vitae vero consequatur inventore repellendus! Reiciendis,
                impedit nihil. Velit rem quae molestias consequatur, illo nihil
                vitae. Dolores delectus qui ullam corporis nemo, aut voluptatem
                non voluptatum consequatur aperiam facere commodi accusamus
                laborum et vero saepe, placeat minima dolor! Nam accusantium
                quod omnis natus dolore sequi molestiae obcaecati exercitationem
                minus nobis illum voluptatibus asperiores veritatis, a
                consequuntur repellat impedit enim, ab maiores sit deleniti aut.
                Quasi, tenetur vel! Vero? Nisi voluptatem odio minima minus et
                sit officiis, assumenda at nam ad deserunt debitis iusto,
                beatae, delectus vitae. Id incidunt ex optio porro eaque nemo
                dolorum voluptas iure perspiciatis eos?
              </div>
            </section>
          </>
        ) : (
          <ProfilePage displayName={displayName} username={username} />
        )}
      </div>
    </>
  );
};
