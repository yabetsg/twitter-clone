import { MouseEvent, SetStateAction, createContext } from "react";
import { LeftSidebar } from "../components/sidebars/LeftSidebar";
import {  User } from "login";
import { ITweet } from "tweet";
import { UserProfileInfo } from "profile";
  
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
    personalProfileActive: false,
    userId: null,
    commentsActive: false,
    showCommentSection: function (value: boolean): void {
        throw new Error("Function not implemented.");
    },
    commentContent: {
        tweetId: "",
        content: "",
        displayNameT: "",
        usernameT: "",
        likes: 0,
        retweets: 0,
        comments: 0
    },
    setCommentContent: function (value: any): void {
        throw new Error("Function not implemented.");
    },
    userProfileActive: false,
    setUserProfileActive: function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    },
    userProfileInfo: {
        userid: "",
        displayName: undefined,
        username: undefined
    },
    setUserProfileInfo: function (value: SetStateAction<{ userid: string; displayName: string | null | undefined; username: string | null | undefined; }>): void {
        throw new Error("Function not implemented.");
    }
});