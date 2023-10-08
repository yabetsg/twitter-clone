import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

export const googleAuth = async (): Promise<User | null> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  try {
    await signInWithPopup(auth, provider).catch((error) => console.log(error));
    const user = new Promise<User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
