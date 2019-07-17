import React from "react";
import styled from "styled-components";

const NameWrapper = styled.Text`
  text-align: center;
  font-size: 16;
  font-weight: 700;
  padding: 10px 0;
`;

export default function VenueName(props) {
  const { name } = props;
  return <NameWrapper>{name}</NameWrapper>;
}
