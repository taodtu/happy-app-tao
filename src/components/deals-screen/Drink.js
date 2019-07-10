import React from "react";
import styled from "styled-components";

const DrinkWrapper = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
`;

export default function Drink(props) {
  const { drink } = props;
  return <DrinkWrapper>{drink}</DrinkWrapper>;
}
