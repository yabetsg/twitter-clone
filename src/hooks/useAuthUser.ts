import { useState } from "react";
// import { googleAuth } from "../backend/auth";
import { User } from "firebase/auth";
export const useAuthUser= async(googleAuth:Promise<User|null>)=>{
    const [user,setUser] = useState<string | null | undefined>();
    const userValue = await googleAuth;
    setUser(userValue?.displayName)
    return [user,setUser];
}