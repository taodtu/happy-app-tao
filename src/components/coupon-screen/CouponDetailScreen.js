import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DealCard from "../deals-screen/DealCard";
import QRCode from "react-native-qrcode";

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

  return (
    <View style={styles.container}>
      <QRCode value={couponID} size={300} bgColor="purple" fgColor="white" />
      <DealCard
        venueName={name}
        venueImg={venueImg}
        drink={drink}
        price={price}
        quantity={quantity}
        type={type}
      />
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
