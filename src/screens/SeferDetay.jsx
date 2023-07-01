import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
const SeferDetay = ({ route }) => {
  const { sefer } = route.params;
  const [yeniSefer, setYeniSefer] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const navigation = useNavigation();
  
  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const handleSatinAl = () => {
    setYeniSefer({ ...sefer, selectedSeats: selectedSeats });
    navigation.navigate();
  };

  return (
    <View className="mx-4">
      <Text className="text-rose-500 font-bold text-center text-2xl py-4">
        Lütfen Koltuk Seçiniz
      </Text>

      <View className="flex-row flex-wrap justify-center">
        {Array.from({ length: 24 }, (_, index) => {
          const seatNumber = index + 1;
          const isSelected = selectedSeats.includes(seatNumber);
          return (
            <TouchableOpacity
              key={seatNumber}
              onPress={() => handleSeatSelection(seatNumber)}
              className="w-16 h-16 border rounded-xl justify-center items-center mb-4 mr-4"
              style={{
                borderColor: isSelected ? "lightcoral" : "gray",
              }}
            >
              <Text style={{ fontSize: 16 }}>{seatNumber}</Text>
              {isSelected && (
                <Icon name="check-circle" size={24} color="lightcoral" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex-row-reverse w-full mt-8">
        <Button
          icon=""
          mode="contained"
          className="bg-rose-500 text-white"
          onPress={handleSatinAl}
        >
          Satın Al
        </Button>
      </View>
    </View>
  );
};

export default SeferDetay;
