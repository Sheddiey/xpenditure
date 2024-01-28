import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState([]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const authUid = auth?.currentUser?.uid;
  const dataCollectionRef = collection(db, "userData");
  const getUserData = async () => {
    try {
      const dataQuery = query(
        dataCollectionRef,
        where("userId", "==", auth?.currentUser?.uid)
      );
      const querySnapshot = await getDocs(dataQuery);
      const AuthUserData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserData(AuthUserData);
      console.log("User data", AuthUserData);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);

      if (currentUser) {
        await getUserData();
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, signIn, logOut, user, getUserData, dataCollectionRef, userData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
