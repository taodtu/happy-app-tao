import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DealCard from "../deals-screen/DealCard";
import QRCode from "react-native-qrcode";
export default function PromoScreen(props) {
  const { navigation } = props;
  const name = navigation.getParam("name");
  console.log(name);
  return (
    <View style={styles.container}>
      <QRCode value="qr" size={200} bgColor="purple" fgColor="white" />
      <DealCard />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3a73b7",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
