import styled from "styled-components/native";
import { Image } from "react-native-elements";

export const CardContainer = styled.View`
  padding: 2px;
  width: 50%;
`;

export const BottomBarContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  bottom: 0;
  position: absolute;
`;

export const Thumbnail = styled(Image)`
  width: 100%;
  height: 300px;
  border-radius: 5px;
`;
