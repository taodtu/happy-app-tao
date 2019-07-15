import React from "react";
import styled from "styled-components";

const NameWrapper = styled.Text`
  text-align: center;
  font-size: 15;
  font-weight: 700;
`;

export default function VenueName(props) {
  const { name } = props;
  return <NameWrapper>The Pilcrow</NameWrapper>;
}
