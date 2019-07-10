import React from "react";
import styled from "styled-components";

const VenueImageWrapper = styled.Image`
  height: 90;
  width: 90;
  flex: 1;
  align-self: flex-end;
`;

export default function VenueImage(props) {
  const { venueImg } = props;
  return <VenueImageWrapper source={venueImg} />;
}
