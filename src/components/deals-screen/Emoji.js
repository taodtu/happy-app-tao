import React from "react";
import styled from "styled-components";

const EmojiWrapper = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
`;

export default function Emoji(props) {
  const { type } = props;
  return <EmojiWrapper>🍾</EmojiWrapper>;
}
