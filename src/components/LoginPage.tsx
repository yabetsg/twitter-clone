import twitter from "../assets/z.png"
export const LoginPage = ()=>{
    return(
        <div className="flex items-center bg-gray-700 sm:h-screen max-md:bg-black">
            <div className="flex flex-col items-center text-white bg-black  rounded-xl  max-sm:h-screen min-w-[600px] max-w-[80vw] mx-auto justify-center min-h-[400px] max-h-[90vh] h-[600px]">
            <span><img src={twitter} alt="twitter logo" /></span>
            <form className="flex flex-col items-center min-w-[364px] min-h-[400px] gap-6">
                <div className="text-3xl font-bold">Sign in to Twitter</div>
                <button type="submit" className="min-w-[300px] text-black bg-white rounded-2xl h-9">Sign in with Google</button>
                <div>or</div>
                <input  type="text" className="bg-black border p-3 min-h-[40px] border-white min-w-[300px] rounded-lg" placeholder="Username"/>
                <input type="password" className="bg-black border p-3 min-h-[40px] border-white min-w-[300px] rounded-lg" placeholder="Password"/>
                <button type="submit" className="text-black bg-white rounded-2xl min-h-[40px]  min-w-[300px]">Log in</button>
                <div>Dont have an account? <span><a href="" className="text-sm text-blue-400">Sign up</a></span></div>
            </form>
        </div>
        </div>
    )
}