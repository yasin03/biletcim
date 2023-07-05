import React, { useEffect, useState } from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";
import UserStack from "./userStack";
import AuthStack from "./authStack";

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("login").then((id) => {
      setIsLogin(true);
    });
  }, []);

  return isLogin ? <UserStack /> : <AuthStack />;
};

export default Router;
