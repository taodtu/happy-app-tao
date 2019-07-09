import React from "react";
import styled from "styled-components";

const ImageWrapper = styled.Image`
  height: 120;
  width: 120;
`;

export default function VenueImage(props) {
  const { image } = props;
  return <ImageWrapper source={image} />;
}
