import styled from "styled-components/native";
import { Image } from "react-native-elements";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const ListEmptyBackground = styled.View`
  align-items: center;
  justify-content: center;
  height: ${hp("25%")}px;
  padding: ${(props) => props.theme.space[3]};
`;

export const WordThumbnail = styled(Image)`
  width: 100%;
  height: 150px;
`;

export const WordContainer = styled.View`
  width: 100%;
  align-self: center;
`;

export const BottomBarContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  bottom: 0;
  position: absolute;
`;

export const WordBackground = styled.View`
  padding: 1px;
  width: 33.3%;
`;
