import React from "react";
import styled from "styled-components";

const PriceWrapper = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
`;

export default function Price(props) {
  const { price } = props;
  return <PriceWrapper>{price}</PriceWrapper>;
}
