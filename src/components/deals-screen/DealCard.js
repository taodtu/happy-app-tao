import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import React from "react";
import Image from "./CardImage";
import CardImage from "./CardImage";

const Card = styled.View``;

export default function DealCard(props) {
  const {image} = props;
  return (
    <Card>
      <CardImage image={image} />
    </Card>
  );
}
