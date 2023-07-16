import twittericon from "/src/assets/twitter.svg"
import homeicon from "/src/assets/homeicon.svg"
import profileicon from "/src/assets/profile.svg"
import exploreicon from "/src/assets/explore.svg"
export const LeftSidebar = () =>{
    return(
        <div className="flex flex-col items-center w-1/4 text-white bg-black border-r border-red-300">
            <div className="flex p-4 mr-44">
                <img className="w-7 h-7" src={twittericon} alt="twitter icon" />
            </div>
            <nav>
                <div className="flex gap-5 p-5 text-xl">
                    <span><img className="w-7 h-7" src={homeicon} alt="" /></span>
                     Home
                </div>

                <div className="flex gap-5 p-5 text-xl">
                    <span><img className="w-7 h-7" src={exploreicon} alt="" /></span>
                     Explore
                </div>

                <div className="flex gap-5 p-5 text-xl">
                    <span><img className="w-7 h-7" src={profileicon} alt="" /></span>
                     Profile
                </div>

                <div className="flex justify-center gap-5 p-5 text-xl">
                    <button className="bg-[rgb(29,155,240)] rounded-3xl w-52 h-12">Tweet</button>
                </div>
            </nav>
            
        </div>
    )
}