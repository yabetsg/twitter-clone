import { useEffect, useState } from "react"

// const getSavedValue = (key: string, initialVal: string): string|null => {
//     const valueString = localStorage.getItem(key);
    
//     return valueString;
// }
export const useLocalStorage=(key:string):[string | null, (value: string) => void] => {

    const [loggedIn, setLoggedIn] = useState<string>(localStorage.getItem(key) as string);

    useEffect(()=>{
        localStorage.setItem(key,loggedIn)
    },[loggedIn]);

    return [loggedIn,setLoggedIn];
}