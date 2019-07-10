import React from "react";
import styled from "styled-components";

const ImageWrapper = styled.Image`
  height: 50;
  aspect-ratio: 1;
  top: 3;
  left: 8;
  flex: 1;
`;

export default function TimerImage(props) {
  const { image } = props;
  return <ImageWrapper source={image} />;
}
