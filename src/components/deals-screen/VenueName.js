import React from "react";
import styled from "styled-components";

const NameWrapper = styled.Text`
  align-self: flex-end;
`;

export default function VenueName(props) {
  const { name } = props;
  return <NameWrapper>{name}</NameWrapper>;
}
