import {
  getFirestore,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  collection,
  onSnapshot,
  where,
  setDoc,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { app } from "../config/firebase-config";
import { ITweet } from "tweet";
import generateTimestamp from "../../utils/currentTimestamp";

export const fetchUserTweets = (
  userId: string | null,
  tweetHandler: React.Dispatch<React.SetStateAction<ITweet[]>>
) => {
  const tweets: Array<ITweet> = [];
  const tweetPromises: Promise<void>[] = [];
  const db = getFirestore(app);
  const q = query(
    collection(db, "tweets"),
    where("userId", "==", userId),
    orderBy("date", "desc")
  );

  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const tweetData = change.doc.data() as {
        tweetId: string;
        content: string;
        userId: string;
        likes: number;
        retweets: number;
        comments: number;
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
                userId: tweetData.userId,
                tweetId: tweetData.tweetId,
                content: tweetData.content,
                displayName: userData.displayName,
                username: userData.displayName,
                likes: tweetData.likes,
                retweets: tweetData.retweets,
                comments: tweetData.comments,
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
        userid:string,
        tweetId: string;
        content: string;
        userId: string;
        likes: number;
        retweets: number;
        comments: number;
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
                userId:tweetData.userId,
                tweetId: tweetData.tweetId,
                content: tweetData.content,
                displayName: userData.displayName,
                username: userData.userName,
                likes: tweetData.likes,
                retweets: tweetData.retweets,
                comments: tweetData.comments,
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

export const updateTweetField = (
  tweetId: string,
  fieldName: string,
  newValue: number
) => {
  const db = getFirestore(app);
  const docRef = doc(db, "tweets", tweetId);
  const updateObject = {
    [fieldName]: newValue,
  };
  updateDoc(docRef, updateObject)
    .catch((error) => console.log(error));
};

export const checkIfUserhasLiked = async (userid: string, tweetId: string) => {
  const db = getFirestore(app);
  let result = false;
  if ((await getDoc(doc(db, "likes", userid, "tweets", tweetId))).exists()) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

export const checkIfUserhasRetweeted = async (
  userid: string,
  tweetId: string
) => {
  const db = getFirestore(app);
  let result = false;
  if ((await getDoc(doc(db, "retweets", userid, "tweets", tweetId))).exists()) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

export const getComments = async (tweetId: string) => {
  const db = getFirestore(app);
  const q = query(collection(db, "comments"), where("tweetId", "==", tweetId));

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};




export const setTweetData = async (
  collection: string,
  tweetId: string,
  content: string,
  userId: string | null,
  username:string,
  displayName:string
) => {
  const db = getFirestore(app);
  await setDoc(doc(db, collection, tweetId), {
    tweetId: tweetId,
    content: content,
    userId: userId,
    date: generateTimestamp(),
    likes: 0,
    retweets: 0,
    comments: 0,
    username:username,
    displayName:displayName,
  });
};

export const setLikesData = async (
  userId: string,
  tweetId: string,
  content: string,
  likesCount: number
) => {
  const db = getFirestore(app);
  const likeDocRef = doc(db, "likes", userId, "tweets", tweetId);
  try {
    await setDoc(likeDocRef, {
      content: content,
      userId: userId,
      date: generateTimestamp(),
      likes: likesCount,
    });
  } catch (error) {
    console.error( error);
  }
};

export const setCommentsData = async (
  commentId:string,
  tweetId: string,
  content: string,
  userId: string | null,
  username:string| null | undefined,
  displayName:string| null | undefined,
) => {
  const db = getFirestore(app);
  const commentsDocRef = doc(db, "comments", commentId);
  try {
    await setDoc(commentsDocRef, {
      tweetId: tweetId,
      content: content,
      userId: userId,
      date: generateTimestamp(),
      likes: 0,
      retweets: 0,
      comments: 0,
      username:username,
      displayName:displayName,
    });
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};


export const setRetweetsData = async (
  userId: string,
  tweetId: string,
  content: string,
  retweetsCount: number
) => {
  const db = getFirestore(app);
  const retweetDocRef = doc(db, "retweets", userId, "tweets", tweetId);
  try {
    await setDoc(retweetDocRef, {
      content: content,
      userId: userId,
      date: generateTimestamp(),
      retweets: retweetsCount,
    });
    
  } catch (error) {
    console.log(error);
  }
};

export const deleteLikedData = (userid: string, tweetId: string) => {
  const db = getFirestore(app);
  deleteDoc(doc(db, "likes", userid, "tweets", tweetId))
    .catch((error) => console.log(error));
};

export const deleteRetweetedData = (userid: string, tweetId: string) => {
  const db = getFirestore(app);
  deleteDoc(doc(db, "retweets", userid, "tweets", tweetId))
    .catch((error) => console.log(error));
};
