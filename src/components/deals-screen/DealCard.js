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
  height: 130;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`;

const DealWrapper = styled.View`
  margin: 10px;
  flex: 2;
  background: #3cdbd3;
  padding-left: 3px;
  margin-vertical: 18px;
  margin-left: 45px;
`;

export default function DealCard(props) {
  const { timerImg, venueName, drink, price, quantity, venueImg, type } = props;
  return (
    <Card>
      <TimerImage image={timerImg} />
      {/* <VenueImage venueImg={venueImg} /> */}
      <DealWrapper>
        <Drink drink={drink} />
        <VenueName name={venueName} />
        <Quantity quantity={quantity} />
        <Price price={price} />
        <Emoji type={type} />
      </DealWrapper>
    </Card>
  );
}
