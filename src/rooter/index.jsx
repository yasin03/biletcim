import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import UserStack from "./userStack";
import AuthStack from "./authStack";

const Router = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(firebase.auth().currentUser);
  }, []);

  return user ? <UserStack /> : <AuthStack />;
};

export default Router;
