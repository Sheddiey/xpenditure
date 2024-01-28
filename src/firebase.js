import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBgN_QXQjmxC3BLE9wl7GofrvRHiOoO1tI",
  authDomain: "xpenditure-af200.firebaseapp.com",
  projectId: "xpenditure-af200",
  storageBucket: "xpenditure-af200.appspot.com",
  messagingSenderId: "689539806134",
  appId: "1:689539806134:web:b8138b402378bddef54717"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
