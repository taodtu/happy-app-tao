import React from "react";
import styled from "styled-components";

const EmojiWrapper = styled.Text`
  flex: 1;
  justify-content: center;
  padding-left: 70px;
  margin-horizontal: auto;
`;

export default function Emoji(props) {
  const { type } = props;
  return <EmojiWrapper>{type}</EmojiWrapper>;
}
