declare module "data" {
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
  export interface User{
    username:string|null|undefined;
    displayName:string|null|undefined;
    handleGoogleSignUp:(e:React.MouseEvent<HTMLElement>)=>void;
    handleGoogleSignIn:(e:React.MouseEvent<HTMLElement>)=>void;
    handleLogout:(e:React.MouseEvent<HTMLElement>)=>void;
  }
  
}
