import { useEffect, useState } from "react"
export const useLocalStorage=(key:string):[string | null, (value: string) => void] => {

    const [loggedIn, setLoggedIn] = useState<string>(localStorage.getItem(key) as string);

    useEffect(()=>{
        localStorage.setItem(key,loggedIn)
    },[key, loggedIn]);

    return [loggedIn,setLoggedIn];
}