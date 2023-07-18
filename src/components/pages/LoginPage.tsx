import twittericon from "/src/assets/twittericon.png"
import googleicon from "/src/assets/googleicon.svg"
export const LoginPage = ()=>{
    return(
        <div className="flex text-[rgb(231,233,234)] items-center bg-gray-700 sm:h-screen max-sm:bg-black max-[300px]:w-80 max-sm:w-screen  max-sm:h-screen w-screen">
            <div className="flex flex-col items-center text-white bg-black  rounded-xl  w-[600px] max-w-[80vw] mx-auto justify-center min-h-[400px] max-h-[90vh] h-[600px]">
            <span className="pb-4"><img src={twittericon} alt="twitter logo" /></span>
            <form className="flex flex-col items-center max-w-[364px] min-h-[400px] gap-6">
                <div className="text-3xl font-bold">Sign in to Twitter</div>
                <button type="submit" className="min-w-[300px] font-normal text-sm flex justify-center items-center gap-2 text-black bg-white rounded-2xl h-9"><span className=""><img className="w-5 h-5" src={googleicon} alt="" /></span>Sign in with Google</button>
                <div className="flex justify-center w-full gap-2"><span className="self-center w-full h-[1px] bg-gray-600"></span>or<span className="self-center w-full h-[1px] bg-gray-600"></span></div>
                <input  type="text" className="bg-black box-border outline-none focus:border-blue-500 focus:border-2 border-2 p-3 min-h-[40px] border-gray-600 min-w-[300px] rounded-md" placeholder="Username"/>
                <input type="password" className="bg-black outline-none focus:border-blue-500 focus:border-2 border-2 p-3 min-h-[40px] border-gray-600 min-w-[300px] rounded-md " placeholder="Password"/>
                <button type="submit" className="text-black bg-white rounded-2xl min-h-[40px]  min-w-[300px] font-semibold">Log in</button>
                <div>Dont have an account? <span><a href="" className="text-sm text-blue-400">Sign up</a></span></div>
            </form>
        </div>
        </div>
    )
}