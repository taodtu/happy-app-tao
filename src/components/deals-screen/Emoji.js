import React from "react";
import styled from "styled-components";

const EmojiWrapper = styled.Text`
  flex: 1;
`;

export default function Emoji(props) {
  const { type } = props;
  return <EmojiWrapper>{type}</EmojiWrapper>;
}
