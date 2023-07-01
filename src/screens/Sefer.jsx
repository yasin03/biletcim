import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { Text, List, MD3Colors, Avatar } from "react-native-paper";
import { DataTable } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

const seferler = [
  {
    id: 1,
    firma: "Kamil Koç",
    img: "kamilkoc.png",
    tarih: "28.06.2023",
    saat: "15:45",
    bosKoltuk: 12,
    fiyat: 370,
  },
  {
    id: 2,
    firma: "Has Turizm",
    img: "has.png",
    tarih: "29.06.2023",
    saat: "16:45",
    bosKoltuk: 10,
    fiyat: 250,
  },
  {
    id: 3,
    firma: "Pamukkale",
    img: "pamukkale.png",
    tarih: "30.06.2023",
    saat: "12:35",
    bosKoltuk: 12,
    fiyat: 400,
  },
  {
    id: 1,
    firma: "Kamil Koç",
    img: "kamilkoc.png",
    tarih: "28.06.2023",
    saat: "15:45",
    bosKoltuk: 12,
    fiyat: 370,
  },
  {
    id: 2,
    firma: "Has Turizm",
    img: "has.png",
    tarih: "29.06.2023",
    saat: "16:45",
    bosKoltuk: 10,
    fiyat: 250,
  },
  {
    id: 3,
    firma: "Pamukkale",
    img: "pamukkale.png",
    tarih: "30.06.2023",
    saat: "12:35",
    bosKoltuk: 12,
    fiyat: 400,
  },
  {
    id: 1,
    firma: "Kamil Koç",
    img: "kamilkoc.png",
    tarih: "28.06.2023",
    saat: "15:45",
    bosKoltuk: 12,
    fiyat: 370,
  },
  {
    id: 2,
    firma: "Has Turizm",
    img: "has.png",
    tarih: "29.06.2023",
    saat: "16:45",
    bosKoltuk: 10,
    fiyat: 250,
  },
  {
    id: 3,
    firma: "Pamukkale",
    img: "pamukkale.png",
    tarih: "30.06.2023",
    saat: "12:35",
    bosKoltuk: 12,
    fiyat: 400,
  },
  {
    id: 1,
    firma: "Kamil Koç",
    img: "kamilkoc.png",
    tarih: "28.06.2023",
    saat: "15:45",
    bosKoltuk: 12,
    fiyat: 370,
  },
  {
    id: 2,
    firma: "Has Turizm",
    img: "has.png",
    tarih: "29.06.2023",
    saat: "16:45",
    bosKoltuk: 10,
    fiyat: 250,
  },
  {
    id: 3,
    firma: "Pamukkale",
    img: "pamukkale.png",
    tarih: "30.06.2023",
    saat: "12:35",
    bosKoltuk: 12,
    fiyat: 400,
  },
];

const Sefer = ({ route }) => {
  const [page, setPage] = useState();
  const navigation = useNavigation();
  const { sefer } = route.params;

  console.log(sefer);

  return (
    <SafeAreaView className="mx-4">
      <ScrollView>
        <View className="bg-rose-200 py-6 rounded-bl-[100] rounded-br-[100]">
          <View className="flex-row justify-between p-2 px-8">
            <Text className="font-bold text-xl text-rose-800">
              {sefer?.nereden}
            </Text>
            <Icon name="exchange-alt" size={36} />
            <Text className="font-bold text-xl text-rose-800">
              {sefer?.nereye}
            </Text>
          </View>
          <Text className="font-semibold text-xl text-center">
            {sefer?.formatDateGidis}
          </Text>
          <Text className="font-semibold text-xl text-center">
            {sefer?.formatDateDonus}
          </Text>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Firma</DataTable.Title>
            <DataTable.Title numeric>Saat</DataTable.Title>
            <DataTable.Title numeric>Boş Koltuk</DataTable.Title>
            <DataTable.Title numeric>Fiyat</DataTable.Title>
          </DataTable.Header>
          {seferler.map((sefer, index) => (
            <DataTable.Row
              key={index}
              className="bg-white rounded-md mb-4 border border-rose-300 py-6 shadow-lg"
              onPress={() => {
                navigation.navigate("SeferDetay", { sefer });
              }}
            >
              <View className="w-20 h-12">
                <Image
                  className="w-full h-full object-fit"
                  source={require(`../../assets/logo/kamilkoc.png`)}
                />
              </View>

              <DataTable.Cell numeric>{sefer.saat}</DataTable.Cell>
              <DataTable.Cell numeric>{sefer.bosKoltuk}</DataTable.Cell>
              <DataTable.Cell numeric>{sefer.fiyat} ₺</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sefer;
