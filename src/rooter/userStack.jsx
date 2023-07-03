import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Sefer from "../screens/Sefer";
import SeferDetay from "../screens/SeferDetay";
import Odeme from "../screens/Odeme";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sefer" component={Sefer} />
        <Stack.Screen name="SeferDetay" component={SeferDetay} />
        <Stack.Screen name="Odeme" component={Odeme} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
