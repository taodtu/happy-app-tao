import React from "react";
import styled from "styled-components";

const VenueImageWrapper = styled.Image`
  height: 100;
  width: 100;
  margin: 25px;
  flex: 1;
  align-self: flex-end;
`;

export default function VenueImage(props) {
  const { venueImg } = props;
  return <VenueImageWrapper source={venueImg} />;
}
