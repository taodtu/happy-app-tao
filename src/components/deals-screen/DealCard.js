import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import TimerImage from "./TimerImage";
import VenueName from "./VenueName";
import Drink from "./Drink";
import Price from "./Price";
import Quantity from "./Quantity";
import VenueImage from "./VenueImage";
import Emoji from "./Emoji";
import styled from "styled-components";

const Card = styled.View`
  width: 300;
  background: #7fbeeb;
  height: 120;
  z-index: 0;
  flex-direction: row;
`;

export default function DealCard(props) {
  const { timerImg, venueName, drink, price, quantity, venueImg, type } = props;
  return (
    <Card>
      <TimerImage image={timerImg} />
      <VenueName name={venueName} />
      {/* <VenueImage venueImg={venueImg} /> */}
      <Drink drink={drink} />
      <Price price={price} />
      <Emoji type={type} />
      <Quantity quantity={quantity} />
    </Card>
  );
}
