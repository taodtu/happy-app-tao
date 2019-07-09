import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import VenueImage from "./VenueImage";
import VenueName from "./VenueName";
import styled from "styled-components";

const Card = styled.View`
  width: 300;
`;

export default function DealCard(props) {
  const { image, venueName } = props;
  return (
    <Card>
      <VenueName name={venueName} />
      <VenueImage image={image} />
    </Card>
  );
}
