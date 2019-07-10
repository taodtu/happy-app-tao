import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { dealsObj } from "../data/deals-data";
import DealCard from "./deals-screen/DealCard";

const MainView = styled.View`
  flex: 1;
  background-color: #eac5d8;
  align-items: center;
  justify-content: space-around;
`;

export default class HomeScreen extends Component {
  state = { deals: dealsObj.dealsArr };
  render() {
    const { deals } = this.state;
    return (
      <MainView>
        {/*map over deals and create a card for each deal */}
        {deals.map(venue => {
          const {
            name,
            venueImg,
            drink,
            price,
            quantity,
            timerImg,
            type
          } = venue;
          return (
            <DealCard
              venueName={name}
              timerImg={timerImg}
              venueImg={venueImg}
              drink={drink}
              price={price}
              quantity={quantity}
              type={type}
              key={name}
            />
          );
        })}
      </MainView>
    );
  }
}
