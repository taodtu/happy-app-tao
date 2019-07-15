import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import VenueName from "./VenueName";
import Drink from "./Drink";
import Price from "./Price";
import Quantity from "./Quantity";
import VenueImage from "./VenueImage";
import Emoji from "./Emoji";
import styled from "styled-components";
import CountDown from "react-native-countdown-component";

const Card = styled.View`
  width: 300;
  background: #1cbbf3;
  height: 130;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`;

const DealWrapper = styled.View`
  margin: 10px;
  flex: 2;
  background: #b9f0f8;
  padding-left: 3px;
  margin-vertical: 18px;
  margin-left: 30px;
`;

const CountdownWrapper = styled.View`
  padding-left: 15px;
`;

export default function DealCard(props) {
  const {
    active,
    venueName,
    drink,
    price,
    quantity,
    venueImg,
    type,
    duration
  } = props;

  return (
    <Card>
      <CountdownWrapper>
        <CountDown
          until={duration}
          size={20}
          timeToShow={["M", "S"]}
          digitStyle={{ backgroundColor: "#feeec1" }}
          digitTxtStyle={{ color: "#1cbbf3" }}
          timeLabels={{ m: "Mins", s: "Secs" }}
        />
      </CountdownWrapper>

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
