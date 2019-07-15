import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DealCard from "../deals-screen/DealCard";
import QRCode from "react-native-qrcode";
import { LinearGradient } from "expo-linear-gradient";

export default function PromoScreen(props) {
  /*getting items from props*/
  const { navigation } = props;

  const name = navigation.getParam("name", "No Name");
  const venueImg = navigation.getParam("venueImg", "No Venue Image");
  const drink = navigation.getParam("drink", "No Drink");
  const price = navigation.getParam("price", "No Price");
  const quantity = navigation.getParam("quantity", "No Quantity");
  const type = navigation.getParam("type", "No Type");
  const couponID = navigation.getParam("couponID", "No Coupon ID");
  const duration = navigation.getParam("duration");

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#fdd96e", "#fdc41c", "#f0a202"]}>
        <QRCode value={couponID} size={300} bgColor="#1cbbf3" fgColor="white" />
        <DealCard
          venueName={name}
          drink={drink}
          price={price}
          quantity={quantity}
          type={type}
          duration={duration}
        />
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdd96e",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
