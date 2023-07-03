import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const SeferDetay = ({ route }) => {
  const { sefer } = route.params;
  const [yeniSefer, setYeniSefer] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [showGenderPopup, setShowGenderPopup] = useState(false);

  const navigation = useNavigation();

  const handleSeatSelection = (seat) => {
    setShowGenderPopup(true);
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      if (selectedSeats.length < 5) {
        const updatedSeats = [...selectedSeats, seat];
        setSelectedSeats(updatedSeats);
      } else {
        Alert.alert("Maksimum 5 koltuk seçebilirsiniz.");
      }
    }
  };

  const handleGenderSelection = (gender) => {
    setShowGenderPopup(false);
    setSelectedGender(gender);
  };

  const handleSatinAl = () => {
    if (selectedGender && selectedSeats.length > 0) {
      setYeniSefer({
        ...sefer,
        selectedSeats: selectedSeats,
        selectedGender: selectedGender,
      });
      navigation.navigate("Odeme", { yeniSefer });
    } else {
      return Alert.alert(
        "Koltuk Seçilmedi!",
        "Lütfen cinsiyet ve en az 1 en fazla 5 koltuk seçiniz!"
      );
    }
  };

  return (
    <SafeAreaView className="m-4">
      <ScrollView>
        <Text className="text-rose-500 font-bold text-center text-2xl py-4">
          Lütfen Koltuk Seçiniz
        </Text>

        <View className="flex-row flex-wrap justify-center">
          {Array.from({ length: 52 }, (_, index) => {
            const seatNumber = index + 1;
            const isSelected = selectedSeats.includes(seatNumber);
            return (
              <View>
                {isSelected && showGenderPopup && (
                  <View className="absolute z-50 left-5 top-16 flex justify-center items-center rounded-xl ">
                    <View className="bg-gray-500 w-6 h-6 rotate-45 "></View>
                    <View className="absolute top-3 flex-row justify-center items-center w-24 h-16">
                      <TouchableOpacity
                        onPress={() => handleGenderSelection("male")}
                        className="bg-blue-400  w-1/2 h-full flex justify-center items-center rounded-l-xl"
                      >
                        <Icon name="face-man" size={36} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleGenderSelection("female")}
                        className="bg-red-400 w-1/2 h-full flex justify-center items-center rounded-r-xl"
                      >
                        <Icon name="face-woman" size={36} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  key={seatNumber}
                  onPress={() => handleSeatSelection(seatNumber)}
                  className="w-16 h-16 border rounded-xl justify-center items-center mb-4 mr-4"
                  style={{
                    backgroundColor: isSelected
                      ? selectedGender === "male"
                        ? "#3B82F6"
                        : "#F87171"
                      : "lightgray",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{seatNumber}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View className="w-full mt-8">
          <Button
            icon=""
            mode="contained"
            className="bg-rose-500 text-white w-full"
            onPress={handleSatinAl}
          >
            Satın Al
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeferDetay;
