import React from "react";
import styled from "styled-components";

const ImageWrapper = styled.Image``;

export default function Image(props) {
  const { image } = props;
  return (
    <ImageWrapper>
      <Image source={image} style={{ height: 200, width: 600 }} />
    </ImageWrapper>
  );
}
