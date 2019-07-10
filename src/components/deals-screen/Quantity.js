import React from "react";
import styled from "styled-components";

const PriceWrapper = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
`;

export default function Quantity(props) {
  const { quantity } = props;
  return <PriceWrapper>{quantity}</PriceWrapper>;
}
