import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";

import { app } from "./firebase-config";

// export const fetchCurrentUserTweets = async (userId: string | null) => {
//   try {
//     const db = getFirestore(app);
//     const tweetRef = collection(db, "tweets");
//     const q = query(
//       tweetRef,
//       where("userId", "==", userId),
//       orderBy("userId", "desc")
//     );
//     const querySnapshot = await getDocs(q);
//     return querySnapshot;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
 export const fetchCurrentUserTweets = (userId:string|null,tweetHandler:React.Dispatch<React.SetStateAction<string[]>>)=>{
    const tweets:Array<string> = [];
    const db = getFirestore(app);
    const q = query(collection(db, "tweets"), where("userId", "==", userId), orderBy("userId", "desc"));
     onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const tweetData  = change.doc.data() as { content: string; userId: string };
        if (change.type === "added") {
          tweets.push(tweetData.content);
        }
        if (change.type === "modified") {
          //
        }
        if (change.type === "removed") {
          //
        }
      });

      tweetHandler(tweets)
    });
  }