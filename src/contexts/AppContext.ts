import { MouseEvent, createContext } from "react";
import { LeftSidebar } from "../components/sidebars/LeftSidebar";
import {  User } from "login";
  
export const AppContext = createContext<User>({
    username: undefined,
    displayName: undefined,
    handleGoogleSignUp: (e: React.MouseEvent<HTMLElement>) => {
        throw new Error("Function not implemented.");
    },
    handleGoogleSignIn: (e: React.MouseEvent<HTMLElement>)=> {
        throw new Error("Function not implemented.");
    },
    handleLogout:(e: React.MouseEvent<HTMLElement>)=> {
        throw new Error("Function not implemented.");
    },
    showProfile:(value:boolean)=> {
        throw new Error("Function not implemented.");
    },
    profileActive:false,
    userId:""
});