import React from "react";
import styled from "styled-components";

const EmojiWrapper = styled.Text`
  flex: 1;
  font-size: 30;
  justify-content: center;
  margin-horizontal: auto;
`;

export default function Emoji(props) {
  const { type } = props;
  console.log(type);
  return <EmojiWrapper>🍾</EmojiWrapper>;
}
