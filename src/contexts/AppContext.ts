import { createContext } from "react";
import {  User } from "login";
  
export const AppContext = createContext<User>({
    username: undefined,
    displayName: undefined,
    handleGoogleSignUp: function (): void {
        throw new Error("Function not implemented.");
    },
    handleGoogleSignIn: function (): void {
        throw new Error("Function not implemented.");
    },
    handleLogout: function (): void {
        throw new Error("Function not implemented.");
    },
    showProfile: function (): void {
        throw new Error("Function not implemented.");
    },
    personalProfileActive: false,
    userId: null,
    commentsActive: false,
    showCommentSection: function (): void {
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
    setCommentContent: function (): void {
        throw new Error("Function not implemented.");
    },
    userProfileActive: false,
    setUserProfileActive: function (): void {
        throw new Error("Function not implemented.");
    },
    userProfileInfo: {
        userid: "",
        displayName: undefined,
        username: undefined
    },
    setUserProfileInfo: function (): void {
        throw new Error("Function not implemented.");
    }
});