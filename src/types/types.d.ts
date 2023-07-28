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
