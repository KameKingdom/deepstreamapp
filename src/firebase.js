import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrDQfVrmyQtzyhC8EA3gHLIqzh-N0g0Ac",
  authDomain: "deep-stream-8a085.firebaseapp.com",
  projectId: "deep-stream-8a085",
  storageBucket: "deep-stream-8a085.appspot.com",
  messagingSenderId: "927725373077",
  appId: "1:927725373077:web:a51b56a527f6fcf03e7d9c",
  measurementId: "G-RTXDHEQ2MM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const storage = getStorage(app);

export { app, auth, provider, db, analytics, storage, firebaseConfig };
