import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { dealsObj } from "../data/deals-data";
import DealCard from "./deals-screen/DealCard";
import CardImage from "./deals-screen/CardImage";

const MainView = styled.View`
  flex: 1;
  background-color: #eac5d8;
  align-items: center;
  justify-content: space-around;
`;

export default class HomeScreen extends Component {
  state = { deals: dealsObj };
  render() {
    const { deals } = this.state;
    return (
      <MainView>
        {deals.map(venue => {
          return (
            <>
              <Text>{venue.venue}</Text>
              {console.log("anything")}
              <CardImage image={venue.image} />
            </>
          );
        })}
      </MainView>
    );
  }
}
