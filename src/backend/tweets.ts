import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { app } from "./firebase-config";
import { ITweet } from "tweet";

export const fetchCurrentUserTweets = (
  userId: string | null,
  tweetHandler: React.Dispatch<React.SetStateAction<ITweet[]>>
) => {
  const tweets: Array<ITweet> = [];
  const db = getFirestore(app);
  const q = query(
    collection(db, "tweets"),
    where("userId", "==", userId),
    orderBy("userId", "desc")
  );
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const tweetData = change.doc.data() as {
        content: string;
        userId: string;
      };
      if (change.type === "added") {
        tweets.push({
          content: tweetData.content,
          displayName: "",
          username: "",
        });
      }
      if (change.type === "modified") {
        //
      }
      if (change.type === "removed") {
        //
      }
    });

    tweetHandler(tweets);
  });
};

export const fetchForYouTweets = (
  tweetHandler: React.Dispatch<React.SetStateAction<ITweet[]>>
) => {
  const tweetPromises: Promise<void>[] = [];

  const tweets: Array<ITweet> = [];
  const db = getFirestore(app);
  const q = query(collection(db, "tweets"), orderBy("date", "desc"), limit(3));
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const tweetData = change.doc.data() as {
        content: string;
        userId: string;
      };
      const userRef = doc(db, "users", tweetData.userId);
      if (change.type === "added") {
        const tweetPromise = getDoc(userRef)
          .then((doc) => {
            if (doc.exists()) {
              const userData = doc.data() as {
                displayName: string;
                userName: string;
              };
              tweets.push({
                content: tweetData.content,
                displayName: userData.displayName,
                username: userData.userName,
              });
            }
          })
          .catch((error) => console.log(error));

        tweetPromises.push(tweetPromise);
      }
      if (change.type === "modified") {
        //
      }
      if (change.type === "removed") {
        //
      }
    });
    Promise.all(tweetPromises)
      .then(() => {
        tweetHandler(tweets);
      })
      .catch((error) => console.log(error));
  });
};
