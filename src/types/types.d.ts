declare module "data" {
  export interface DataWithKey {
    [key: string]: { displayName: string; userName: string };
  }
  export interface DataWithoutKey {
    displayName: string;
    userName: string;
  }
}
declare module "profile" {
  export interface UserProfileInfo {
    userid: string;
    displayName: string | null | undefined;
    username: string | null | undefined;
  }
  export interface UserData{
    displayName: displayName,
    userName: userName,
    followersCount: 0,
    followingCount: 0,
  }
}
declare module "login" {
  export interface User {
    username: string | null | undefined;
    displayName: string | null | undefined;
    handleGoogleSignUp: (e: React.MouseEvent<HTMLElement>) => void;
    handleGoogleSignIn: (e: React.MouseEvent<HTMLElement>) => void;
    handleLogout: (e: React.MouseEvent<HTMLElement>) => void;
    showProfile: (value: boolean) => void;
    personalProfileActive: boolean;
    userId: string | null;
    commentsActive: boolean;
    showCommentSection: (value: boolean) => void;
    commentContent:  {tweetId: string;
    content: string;
    displayNameT: string;
    usernameT: string;
    likes: number;
    retweets: number;
    comments: number;};
    setCommentContent: React.Dispatch<React.SetStateAction<ITweet>>;
    userProfileActive: boolean;
    setUserProfileActive: React.Dispatch<React.SetStateAction<boolean>>;
    userProfileInfo: {
      userid: string;
      displayName: string | null | undefined;
      username: string | null | undefined;
    };
    setUserProfileInfo: React.Dispatch<
      React.SetStateAction<{
        userid: string;
        displayName: string | null | undefined;
        username: string | null | undefined;
      }>
    >;
  }
}

declare module "tweet" {
  export interface ITweet {
    userId: string;
    tweetId: string;
    content: string;
    displayName: string;
    username: string;
    likes: number;
    retweets: number;
    comments: number;
  }

  
}
declare module "props" {
  export interface ProfileProps {
    username: string | null | undefined;
    displayName: string | null | undefined;
  }
  export interface ForYouProps {
    handleTweetSubmit: (e: FormEvent<HTMLFormElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    content?: Tweet;
  }
  // export interface FollowingProps{
  //   handleTweetSubmit: (e: FormEvent<HTMLFormElement>) => void;
  //   inputRef: React.RefObject<HTMLInputElement>;
  // }
  export interface TweetProps {
    userid: string;
    tweetId: string;
    content: string;
    displayNameT: string | null | undefined;
    usernameT: string | null | undefined;
    likes: number;
    retweets: number;
    comments: number;
  }
  export interface CommentModalProps {
    tweetId: string;
    tweetContent: string;
    username: string;
    displayName: string;
    handleReply: () => void;
    handleChange: (input: string) => Dispatch<SetStateAction<string>>;
    handleModalDisplay: () => void;
  }
}


declare module "comment"{
  export interface Comment {
    commentId: string;
    userId: string;
    tweetId: string;
    content: string;
    displayName: string;
    username: string;
    likes: number;
    retweets: number;
    comments: number;
  }
  export interface CommentContent{
    tweetId: string;
    content: string;
    displayNameT: string;
    usernameT: string;
    likes: number;
    retweets: number;
    comments: number;
  }
}
