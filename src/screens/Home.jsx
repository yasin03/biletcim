import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-paper";
import Loading from "../components/Loading";

const Home = () => {
  const [checked, setChecked] = useState("tek");
  const [nereden, setNereden] = useState();
  const [nereye, setNereye] = useState();
  const [dateGidis, setDateGidis] = useState(new Date());
  const [dateDonus, setDateDonus] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(false);
  }, [loading, dateGidis, dateDonus]);

  const sehirler = [
    "İzmir",
    "İstanbul",
    "Adana",
    "Ankara",
    "Afyon",
    "Bursa",
    "Eskişehir",
  ];

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatDateGidis = dateGidis.toLocaleDateString("tr-TR", options);
  const formatDateDonus = dateDonus.toLocaleDateString("tr-TR", options);
  console.log(formatDateGidis + formatDateDonus);

  const handleGidis = (event, selectedDate) => {
    console.log(selectedDate);
    setShow(false);
    setDateGidis(selectedDate);
  };
  const handleDonus = (event, selectedDate) => {
    
    setShow(false);
    setDateDonus(selectedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const sefer = {
    checked,
    nereden,
    nereye,
    formatDateGidis,
    formatDateDonus,
  };
  return (
    <View>
      {loading ? (
        <Loading />
      ) : (
        <View className="flex justify-center items-center mx-4 mt-12">
          <View className="flex flex-row justify-between items-center ">
            <View className="flex-row items-center">
              <Text>Gidiş</Text>
              <RadioButton
                value="tek"
                status={checked === "tek" ? "checked" : "unchecked"}
                onPress={() => setChecked("tek")}
              />
            </View>
            <View className="flex-row items-center">
              <Text>Gidiş-Dönüş</Text>
              <RadioButton
                value="cift"
                status={checked === "cift" ? "checked" : "unchecked"}
                onPress={() => setChecked("cift")}
              />
            </View>
          </View>
          <View className="flex-row mt-4 w-full justify-around items-center">
            <Text className="mr-2 font-semibold text-xl">Nereden</Text>
            <SelectDropdown
              data={sehirler}
              buttonStyle={{
                borderRadius: 10,
                borderBottomColor: "grey",
                borderBottomWidth: 2,
                backgroundColor: "white",
              }}
              onSelect={(selectedItem, index) => {
                setNereden(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <View className="flex-row mt-4 w-full justify-around items-center">
            <Text className="mr-2 font-semibold text-xl">Nereye</Text>
            <SelectDropdown
              data={sehirler}
              buttonStyle={{
                borderRadius: 10,
                borderBottomColor: "grey",
                borderBottomWidth: 2,
                backgroundColor: "white",
              }}
              onSelect={(selectedItem, index) => {
                setNereye(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <View className="mt-4 w-full">
            <Button onPress={showDatepicker} mode="outlined" className="p-3">
              <Text className="">Gidiş Tarihi </Text>
              <Text className="text-rose-500">
                {dateGidis.toLocaleDateString()}
              </Text>
            </Button>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateGidis}
                mode={mode}
                is24Hour={true}
                onChange={handleGidis}
              />
            )}
          </View>
          <View className={`w-full mt-4 ${checked === "tek" && "hidden"}`}>
            <Button onPress={showDatepicker} mode="outlined" className="px-4">
              <Text className="">Dönüş Tarihi </Text>
              <Text className="text-rose-500">{formatDateDonus}</Text>
            </Button>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateDonus}
                mode={mode}
                is24Hour={true}
                onChange={handleDonus}
              />
            )}
          </View>
          <View className="flex-row-reverse w-full mt-8">
            <Button
              icon="magnify"
              loading={loading ? true : false}
              mode="contained"
              className="bg-rose-500 text-white"
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  navigation.navigate("Sefer", { sefer });
                }, 3000);
              }}
            >
              Ara
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;
