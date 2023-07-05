import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Loading from "../components/Loading";
import { Formik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-popup-confirm-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { Alert } from "react-native";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);

        AsyncStorage.setItem("login", user.uid);
        console.log("user ->", user.uid);
        Toast.show({
          type: "success",
          title: "Dikkat!",
          text: "Giriş Yapıldı!",
          backgroundColor: "#22c55e",
          timeColor: "#14532d",
          timing: 2000,
          position: "top",
          onCloseComplete: () => {
            navigation.navigate("Home");
            setEmail("");
            setPassword("");
          },
        });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          Alert.alert(
            "Dikkat!",
            "Geçersiz e-mail adresi tekrar giriş yapınız!"
          );
        }

        if (error.code === "auth/user-not-found") {
          console.log("That user is not found!");
          Alert.alert("Dikkat!", "Kullanıcı bulunamadı lütfen kayıt olunuz!");
        }
        if (error.code === "auth/wrong-password") {
          console.log("The password is incorrcet!");
          Alert.alert("Dikkat!", "Yanlış şifre lütfen tekrar deneyiniz!");
        }

        console.error(error);
      });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <KeyboardAvoidingView className="flex-1 justify-center items-center mx-4">
          <View className="absolute top-0 w-full p-10 rounded-bl-full rounded-br-full bg-rose-500">
            <Text className="text-3xl font-semibold text-white text-center mt-12 pb-8">
              Biletcim Hoşgeldiniz!
            </Text>
          </View>

          <View className="w-9/12 mt-40">
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="border border-gray-300 bg-white pl-3 py-3  rounded-md"
              keyboardType="email-address"
            />
          </View>
          <View className="relative w-9/12 mt-4">
            <TextInput
              secureTextEntry={hidePassword ? true : false}
              value={password}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              className=" border border-gray-300 bg-white pl-3 py-3 rounded-md"
            />

            <TouchableOpacity
              onPress={() => setHidePassword(!hidePassword)}
              style={{ position: "absolute", top: 10, right: 15 }}
            >
              <Icon
                name={hidePassword ? "eye-slash" : "eye"}
                size={25}
                color={"grey"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="flex justify-center items-center cursor-pointer shadow-lg bg-rose-500 py-3 w-9/12 rounded-md mt-8"
            onPress={handleSubmit}
          >
            <Text className="font-semibold text-lg text-white">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex justify-end items-end cursor-pointer  py-3  w-9/12 "
            onPress={() => navigation.replace("Register")}
          >
            <Text className="font-semibold ">Şifremi Unuttum!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex justify-center items-center cursor-pointer shadow-lg border border-rose-300 py-3  w-9/12 rounded-md mt-4"
            onPress={() => navigation.replace("Register")}
          >
            <Text className="font-semibold text-lg">Üye Ol</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Login;
