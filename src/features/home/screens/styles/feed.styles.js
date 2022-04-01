import styled from "styled-components/native";
import LottieView from "lottie-react-native";

export const FeedBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const ListEmptyBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[3]};
`;

export const CardContainer = styled.View`
  flex: 1;
  background-color: black;
`;

export const RefreshLoadingIcon = styled(LottieView)`
  position: absolute;
  top: -5px;
  left: 0;
  right: 0;
`;
