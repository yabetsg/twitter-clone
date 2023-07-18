export const RightSidebar =()=>{
    return(
        <main className="text-white bg-black w-[35%] flex flex-col items-center gap-4">
            <div className="fixed w-[35%] bg-black flex justify-center">
            <input type="text" placeholder="Search Twitter" className="w-3/4 p-3 mt-2 bg-gray-800 outline-none rounded-2xl"/>
            </div>
            <section className="bg-[rgb(22,24,28)] mt-16 w-3/4 rounded-xl font-bold p-4 flex flex-col gap-2">
                <header>Get Verified</header>
                <p>Subsribe to unlock new features.</p>
                <button className="bg-[rgb(29,155,240)] rounded-2xl w-28 h-8">Get Verified</button>
            </section>
            

            <section className="bg-[rgb(22,24,28)] w-3/4 rounded-xl flex flex-col gap-2 text-sm">
                <header className="px-3 pt-4 text-xl font-extrabold">What's happening</header>
                <div className="hover:bg-[rgb(32,36,43)] p-3">
                    <p className="text-gray-600">Trending in United States</p>
                    <p className="font-semibold">The 16</p>
                    <p className="font-light text-gray-600">190k Tweets</p>
                </div>

                <div className="hover:bg-[rgb(32,36,43)] p-3">
                    <p className="text-gray-600">Trending in United States</p>
                    <p className="font-semibold">The 16</p>
                    <p className="font-light text-gray-600">190k Tweets</p>
                </div>

                <div className="hover:bg-[rgb(32,36,43)] p-3">
                    <p className="text-gray-600">Trending in United States</p>
                    <p className="font-semibold">The 16</p>
                    <p className="font-light text-gray-600">190k Tweets</p>
                </div>

                <div className="hover:bg-[rgb(32,36,43)] p-4">
                    <p className="text-gray-600">Trending in United States</p>
                    <p className="font-semibold">The 16</p>
                    <p className="font-light text-gray-600">190k Tweets</p>
                </div>
                <div className="hover:bg-[rgb(32,36,43)] p-3">
                    <p className="text-gray-600">Trending in United States</p>
                    <p className="font-semibold">The 16</p>
                    <p className="font-light text-gray-600">190k Tweets</p>
                </div>
                <div className="hover:bg-[rgb(32,36,43)] p-3">
                    <p className="text-gray-600">Trending in United States</p>
                    <p className="font-semibold">The 16</p>
                    <p className="font-light text-gray-600">190k Tweets</p>
                </div>
                <div className="hover:bg-[rgb(32,36,43)] p-3">
                    <p className="text-gray-600">Trending in United States</p>
                    <p className="font-semibold">The 16</p>
                    <p className="font-light text-gray-600">190k Tweets</p>
                </div>
            </section>

        </main>
    )
}