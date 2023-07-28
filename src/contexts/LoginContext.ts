import { MouseEvent, createContext } from "react";
import { LeftSidebar } from "../components/sidebars/LeftSidebar";
import {  User } from "login";
  
export const LoginContext = createContext<User>({
    username: undefined,
    displayName: undefined,
    handleGoogleSignUp: (e: React.MouseEvent<HTMLElement>) => {
        throw new Error("Function not implemented.");
    },
    handleGoogleSignIn: (e: React.MouseEvent<HTMLElement>)=> {
        throw new Error("Function not implemented.");
    }
});