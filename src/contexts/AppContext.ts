import { MouseEvent, createContext } from "react";
import { LeftSidebar } from "../components/sidebars/LeftSidebar";
import {  User } from "login";
import { ITweet } from "tweet";
  
export const AppContext = createContext<User>({
    username: undefined,
    displayName: undefined,
    handleGoogleSignUp: function (e: MouseEvent<HTMLElement, globalThis.MouseEvent>): void {
        throw new Error("Function not implemented.");
    },
    handleGoogleSignIn: function (e: MouseEvent<HTMLElement, globalThis.MouseEvent>): void {
        throw new Error("Function not implemented.");
    },
    handleLogout: function (e: MouseEvent<HTMLElement, globalThis.MouseEvent>): void {
        throw new Error("Function not implemented.");
    },
    showProfile: function (value: boolean): void {
        throw new Error("Function not implemented.");
    },
    profileActive: false,
    userId: null,
    commentsActive: false,
    showCommentSection: function (value: boolean): void {
        throw new Error("Function not implemented.");
    },
    commentContent: {tweetId:"",
    content:"",
    displayName:"",
    username:"",
    likes:0,
    retweets:0,
    comments:0,
},
    setCommentContent: function (value): void {
        throw new Error("Function not implemented.");
    }
});