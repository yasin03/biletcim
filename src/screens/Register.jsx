import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createUserWithEmailAndPassword } from "@react-native-firebase/app";
import { authentication } from "../config/firebase";

const Register = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();
  

  const signUp = async () => {
    if (email === "" || password === "") {
      Alert.alert("Email ve Password giriniz!");
      return;
    }

    await createUserWithEmailAndPassword(authentication, email, password)
      .then(() => {
        /*         const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName:values.fullName,
        }) */
         Popup.show({
           type: "success",
           title: "Dikkat!",
           textBody: "Başarıyla kaydedildi!",
           buttonText: "Tamam",
           okButtonStyle: { backgroundColor: "#F87171" },
           callback: () => {
             Popup.hide();
             navigation.navigate("Login");
           },
         });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("That email address is invalid!");
        }

        Alert.alert(error.message);
      });
  };

  return (
    <View className="flex-1 justify-center items-center mx-4">
      <View className="absolute top-0 w-full p-16 rounded-bl-[200] rounded-br-[200] bg-rose-500 mb-36">
        <Text className="text-xl font-semibold text-white text-center">
          Bilet almanın yepyeni yolunu Biletcim ile keşfedin!
        </Text>
      </View>
      <View className="w-9/12">
        <TextInput
          placeholder="Email"
          className="border border-gray-300 bg-white pl-3 py-3  rounded-md"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <View className="relative w-9/12 mt-4">
        <TextInput
          secureTextEntry={hidePassword ? true : false}
          placeholder="Password"
          className=" border border-gray-300 bg-white pl-3 py-3 rounded-md"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          style={{ position: "absolute", top: 10, right: 15 }}
        >
          <Icon name={hidePassword ? "eye-slash" : "eye"} size={25} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="flex justify-center items-center cursor-pointer shadow-lg bg-rose-500 py-3 w-9/12 rounded-md mt-8"
        onPress={signUp}
      >
        <Text className="font-semibold text-lg text-white">Kayıt Ol</Text>
      </TouchableOpacity>

      <View className="flex-row justify-start items-center gap-2 mt-2">
        <Text className=" text-md">Zaten Üye misiniz?</Text>
        <TouchableOpacity
          className=" cursor-pointer "
          onPress={() => navigation.replace("Login")}
        >
          <Text className="font-semibold text-md text-rose-500">
            Giriş Yapın!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
