import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import Loading from "../components/Loading";
import { formatDate } from "../utils/FormatDate";

const Home = () => {
  const [checked, setChecked] = useState("tek");
  const [nereden, setNereden] = useState();
  const [nereye, setNereye] = useState();
  const [dateGidis, setDateGidis] = useState(formatDate(new Date()));
  const [dateDonus, setDateDonus] = useState(formatDate(new Date()));
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

  const handleGidis = (selectedDate) => {
    setShow(false);
    setDateGidis(formatDate(selectedDate));
  };

  const handleDonus = (selectedDate) => {
    setShow(false);
    setDateDonus(formatDate(selectedDate));
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
    dateGidis,
    dateDonus,
  };
  console.log("gidiş : " + dateGidis);
  const handleSearch = () => {
    if (nereden && nereye) {
      setLoading(true);
      navigation.navigate("Sefer", { sefer });

    } else {
      return Alert.alert(
        "Kalkış yeri seçilmedi!",
        "Lütfen hareket yerini ve varış yerini seçiniz!"
      );
    }
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
              dropdownStyle={{
                borderRadius: 10,
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
            <Button
              onPress={showDatepicker}
              mode="outlined"
              className="border-black-500 py-1"
            >
              <Text className="text-black">Gidiş Tarihi </Text>
              <Text className="text-rose-500">{dateGidis}</Text>
            </Button>

            {show && (
              <DateTimePicker
                display="spinner"
                value={new Date()}
                mode={mode}
                is24Hour={true}
                onChange={handleGidis}
              />
            )}
          </View>
          <View className={`w-full mt-4 ${checked === "tek" && "hidden"}`}>
            <Button
              onPress={showDatepicker}
              mode="outlined"
              className="border-black-500 py-1"
            >
              <Text className="text-black">Dönüş Tarihi </Text>
              <Text className="text-rose-500">{dateDonus}</Text>
            </Button>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
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
              className="bg-rose-500 text-white w-full"
              onPress={handleSearch}
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
