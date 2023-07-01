import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import UserStack from "./userStack";
import AuthStack from "./authStack";

const Router = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(true);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return user ? <UserStack /> : <AuthStack />;
};

export default Router;
