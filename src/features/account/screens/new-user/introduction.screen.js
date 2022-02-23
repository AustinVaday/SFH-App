import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { Text } from "../../../../components/typography/text.components";
import { Spacer } from "../../../../components/spacer/spacer.components";
import { colors } from "../../../../infrastructure/theme/colors";
import useLoader from "../../../../services/hooks/loader/useLoader";

import { updateUser } from "../../../../services/firebase/auth";

import {
  SlideContainer,
  SlideImage,
  IntroductionBackground,
  NextButtonContainer,
  DoneButtonContainer,
} from "./styles/introduction.styles";

const slides = [
  {
    key: "one",
    title: "Title 1",
    description: "Description.\nSay something cool",
    image: require("../../../../assets/images/empty-notifications.png"),
    backgroundColor: colors.bg.secondary,
  },
  {
    key: "two",
    title: "Title 2",
    description: "Description.\nSay something cool",
    image: require("../../../../assets/images/empty-notifications.png"),
    backgroundColor: colors.bg.secondary,
  },
  {
    key: "three",
    title: "Title 3",
    description: "Description.\nSay something cool",
    image: require("../../../../assets/images/empty-notifications.png"),
    backgroundColor: colors.bg.secondary,
  },
];

export const IntroductionScreen = ({ route }) => {
  const { displayName, username } = route.params;

  const [loader, showLoader, hideLoader] = useLoader();

  const insets = useSafeAreaInsets();

  const renderItem = ({ item }) => {
    return (
      <SlideContainer
        style={{
          paddingTop: insets.top + 25,
          backgroundColor: item.backgroundColor,
        }}
      >
        <SlideImage source={item.image} />
        <Text variant="appintro_title">{item.title}</Text>
        <Spacer size="huge" />
        <Text variant="appintro_description">{item.description}</Text>
      </SlideContainer>
    );
  };

  const onDone = () => {
    showLoader();

    try {
      setTimeout(() => updateUser(displayName, username, hideLoader), 500);
    } catch (error) {
      hideLoader();

      Toast.show({
        type: "infoError",
        props: {
          message: error.message,
        },
        visibilityTime: 2000,
        topOffset: 45,
      });
    }
  };

  return (
    <IntroductionBackground>
      {loader}
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        keyExtractor={(item) => item.key}
        onDone={onDone}
        bottomButton={true}
        activeDotStyle={{ backgroundColor: colors.bg.primary }}
        renderNextButton={() => (
          <NextButtonContainer>
            <Text variant="appintro_next">Next</Text>
          </NextButtonContainer>
        )}
        renderDoneButton={() => (
          <DoneButtonContainer>
            <Text variant="appintro_done">Done</Text>
          </DoneButtonContainer>
        )}
      />
    </IntroductionBackground>
  );
};
