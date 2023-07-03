import React, { useState } from "react";
import { Alert, TouchableOpacity, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { CreditCardInput } from "react-native-credit-card-input";
import { Root, Popup } from "popup-ui";

const Odeme = ({ route }) => {
  const { yeniSefer } = route.params;
  console.log(yeniSefer);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = (formData) => {
    setCardNumber(formData.values.number);
    setExpiryDate(formData.values.expiry);
    setCvv(formData.values.cvc);
  };

  const handleSatinAl = () => {};

  const _onFocus = (field) => console.log("focusing", field);
  return (
    <View className="mx-4">
      <Text className="text-center text-xl font-semibold mt-4">
        Ödeme Sayfası
      </Text>
      <Text>{yeniSefer}</Text>
      <CreditCardInput
        autoFocus
        labels={{ number: "KART NUMARASI", expiry: "S.K.T.", cvc: "CVC/CCV" }}
        allowScroll={true}
        onChange={handlePayment}
        onFocus={_onFocus}
      />
      <View className="flex-row-reverse w-full mt-8">
        <Button
          icon=""
          mode="contained"
          className="bg-rose-500 text-white w-full"
          onPress={handleSatinAl}
        >
          Satın Al
        </Button>
      </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              Popup.show({
                type: "Success",
                title: "Upload complete",
                button: false,
                textBody: "Congrats! Your upload successfully done",
                buttonText: "Ok",
                callback: () => Popup.hide(),
              })
            }
          >
            <Text>Open Popup</Text>
          </TouchableOpacity>
        </View>

    </View>
  );
};

export default Odeme;
