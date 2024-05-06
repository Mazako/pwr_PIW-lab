import {initializeApp} from "firebase/app";
import {Auth, GoogleAuthProvider, signInWithRedirect, signInWithPopup} from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore";
import {getStorage, ref} from "firebase/storage"

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app, 'gs://tranquil-travelers.appspot.com');
export const hotelsRef = collection(db, 'hotels');
export const usersRef = collection(db, 'users');

export const googleLogin = (auth: Auth) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    return signInWithPopup(auth, provider);
};

