import React from "react";
import styled from "styled-components";

const ImageWrapper = styled.Image`
  height: 90;
  width: 90;
  flex: 1;
`;

export default function TimerImage(props) {
  const { image } = props;
  return <ImageWrapper source={image} />;
}
