import React from "react";
import styled from "styled-components";

const NameWrapper = styled.Text`
  text-align: center;
`;

export default function VenueName(props) {
  const { name } = props;
  return <NameWrapper>{name}</NameWrapper>;
}
