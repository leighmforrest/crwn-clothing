import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";

const config = {
  apiKey: "AIzaSyDqk2cJCMwzZEdy0t47Pb6hC504_BfO0-4",
  authDomain: "crwn-clothing-19125.firebaseapp.com",
  databaseURL: "https://crwn-clothing-19125.firebaseio.com",
  projectId: "crwn-clothing-19125",
  storageBucket: "",
  messagingSenderId: "873152252360",
  appId: "1:873152252360:web:5516359e7d50a7737fd8fd"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
