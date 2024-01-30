import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState([]);
  const [userExpenses, setUserExpenses] = useState([]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

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

  const expensesCollectionRef = collection(db, "expenses");
  const getUserExpenses = async () => {
    try {
      const expensesquery = query(
        expensesCollectionRef,
        where("userId", "==", auth?.currentUser?.uid)
      );
      const queryExpenseSnapshot = await getDocs(expensesquery);
      const authUserExpenses = queryExpenseSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const uid = auth.currentUser.uid;
      console.log(uid)
      setUserExpenses(authUserExpenses);
      console.log("User expenses: ", authUserExpenses);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      const expenseRef = doc(db, "expenses", expenseId);
      await deleteDoc(expenseRef);
      getUserExpenses();
      console.log("Document deleted succesfully");
    } catch(err) {
      console.error("Error deleting document: ", err)
    }
  }

  const resetExpenses = async () => {
    try {
      const expenseQuerySnapshot = await getDocs(
        query(expensesCollectionRef, where("userId", "==", auth?.currentUser?.uid))
      );

      const deletePromises = [];
      expenseQuerySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });

      await Promise.all(deletePromises);
      getUserExpenses();
      console.log("Resetting expenses Succesful.")
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);

      if (currentUser) {
        await getUserData();
        await getUserExpenses();
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        signIn,
        logOut,
        user,
        getUserData,
        dataCollectionRef,
        userData,
        getUserExpenses,
        expensesCollectionRef,
        userExpenses,
        deleteExpense,
        resetExpenses,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
