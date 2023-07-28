declare module "d" {
  export interface DataWithKey {
    [key: string]: { displayName: string; 
      userName: string 
    };
  }
  export interface DataWithoutKey {
    displayName: string;
    userName: string;
  }
}
declare module 'login'{
  export interface LeftSidebar{
    username:string|null|undefined;
    displayName:string|null|undefined;
  }
  export interface LoginPage{
    handleGoogleSignUp:(e:React.MouseEvent<HTMLElement>)=>void
}
}
