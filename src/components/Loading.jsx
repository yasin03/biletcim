import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => (
  <View className="absolute w-full h-full flex justify-center items-center bg-black opacity-10">
    <ActivityIndicator size="large" color="#f43f5e" />
  </View>
);

export default Loading;

