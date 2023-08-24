declare module "data" {
  export interface DataWithKey {
    [key: string]: { displayName: string; userName: string };
  }
  export interface DataWithoutKey {
    displayName: string;
    userName: string;
  }
}
declare module "login" {
  export interface User {
    username: string | null | undefined;
    displayName: string | null | undefined;
    handleGoogleSignUp: (e: React.MouseEvent<HTMLElement>) => void;
    handleGoogleSignIn: (e: React.MouseEvent<HTMLElement>) => void;
    handleLogout: (e: React.MouseEvent<HTMLElement>) => void;
    showProfile: (value:boolean) => void;
    profileActive:boolean,
    userId:string|null
  }
}
declare module "props"{
  export interface ProfileProps{
    username:string | null | undefined;
    displayName:string | null | undefined;
  }
  export interface ForYouProps{
    handleTweetSubmit:(e: FormEvent<HTMLFormElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    content:Tweet;
  }
  export interface TweetProps{
    content:string;
    displayName:string | null | undefined;
    username:string | null | undefined;
  }
}
