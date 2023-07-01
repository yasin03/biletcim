import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loading from "../components/Loading";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const _handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View className="flex-1 justify-center items-center mx-4">
          <View className="absolute top-0 w-full p-10 rounded-bl-full rounded-br-full bg-rose-500">
            <Text className="text-3xl font-semibold text-white text-center mt-12 pb-8">
              Biletcim Hoşgeldiniz!
            </Text>
          </View>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={_handleSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string().required("Email is required"),
              password: Yup.string().required("Password is required"),
            })}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <View className="w-9/12 mt-40">
                  <TextInput
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    className="border border-gray-300 bg-white pl-3 py-3  rounded-md"
                  />
                  {errors.email && (
                    <Text className="text-red-500 mb-1 ml-1">
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View className="relative w-9/12 mt-4">
                  <TextInput
                    secureTextEntry={hidePassword ? true : false}
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
                  {errors.password && (
                    <Text className="text-red-500 mb-1 ml-1">
                      {errors.password}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  className="flex justify-center items-center cursor-pointer shadow-lg bg-rose-500 py-3 w-9/12 rounded-md mt-8"
                  onPress={handleSubmit}
                >
                  <Text className="font-semibold text-lg text-white">
                    Login
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
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
        </View>
      )}
    </>
  );
};

export default Login;
