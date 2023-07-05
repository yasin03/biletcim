import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

import { Popup } from "react-native-popup-confirm-toast";
import { useNavigation } from "@react-navigation/native";

const Odeme = ({ route }) => {
  const { yeniSefer } = route.params;

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const navigation = useNavigation();

  const handlePayment = (formData) => {
    setCardNumber(formData.values.number);
    setExpiryDate(formData.values.expiry);
    setCvv(formData.values.cvc);
  };

  const handleSatinAl = () => {
    if (cardNumber && expiryDate && cvv) {
      Popup.show({
        type: "success",
        title: "Dikkat!",
        textBody: "Satın alma işleminiz başarıyla gerçekleştirildi!",
        buttonText: "Tamam",
        okButtonStyle: { backgroundColor: "#F87171" },
        callback: () => {
          Popup.hide();
          navigation.navigate("Home");
        },
      });
    } else {
      Popup.show({
        type: "confirm",
        title: "Dikkat!",
        textBody: "Lütfen kart bilgilerini giriniz!",
        buttonText: "Tamam",
        okButtonStyle: { backgroundColor: "#F87171" },
        callback: () => {
          Popup.hide();
          navigation.navigate("Home");
        },
      });
    }
  };

  return (
    <View className="mx-4">
      <Text className="text-center text-xl font-semibold mt-4">
        Ödeme Sayfası
      </Text>
      <Text>{yeniSefer}</Text>

      <View className="flex-row-reverse w-full mt-8">
        <Button
          icon=""
          mode="contained"
          className="bg-rose-500 text-white w-full"
          onPress={() => handleSatinAl()}
        >
          Satın Al
        </Button>
      </View>
    </View>
  );
};

export default Odeme;
