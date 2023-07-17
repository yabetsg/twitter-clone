import defaultimg from "/src/assets/default.png"
export const HomePage = () => {
  return (
    <div className="z-50 w-[40%] text-white bg-black ml-[25%]  border-gray-500 border-x">
        <section className="flex flex-col">  
      <header className="p-3 text-xl font-bold">Home</header>
      <div className="flex justify-around p-5 border-b border-gray-500">
        <button>For you</button>
        <button>Following</button>
      </div> 

      </section>

        <section>
            <form action="" className="flex flex-col">
                
                <div className="pl-7">
                    <input type="text" placeholder="What is happening?!" className="p-5 text-xl bg-inherit"/>
                </div>
                <div className="flex justify-end p-5"><button className="bg-[rgb(29,155,240)] rounded-xl w-24 h-8">Tweet</button></div>
            </form>
        </section>

    </div>
  );
};
