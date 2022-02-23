import React, { useState, useEffect } from "react";
import { Animated } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { Text } from "../../../../components/typography/text.components";
import { colors } from "../../../../infrastructure/theme/colors";
import { Spacer } from "../../../../components/spacer/spacer.components";

import { useDispatch, useSelector } from "react-redux";
import {
  confirmedCodeSuccess,
  sendConfirmationCode,
} from "../../../../services/redux/actions/code.actions";

import {
  ConfirmationCodeBackground,
  ResendButton,
  ResendButtonContainer,
  CodeText,
} from "./styles/confirmation-code.styles";

const CELL_COUNT = 6;

const { Value } = Animated;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

export const ConfirmationCodeScreen = ({ route, navigation }) => {
  const { email, emailCensored, codeType, routeName } = route.params;

  const code = useSelector((state) => state.code.confirmationCode);
  const timer = useSelector((state) => state.code.timer);
  const type = useSelector((state) => state.code.codeType);
  const isTiming = useSelector((state) => state.code.isTiming);

  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isTiming) {
      dispatch(sendConfirmationCode(email, codeType));
    }
  }, []);

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);

    // run animation on next event loop tick because
    // we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <CodeText
        key={index}
        style={{
          // IOS
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 0.0,

          // Android
          elevation: 3,
        }}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </CodeText>
    );
  };

  return (
    <ConfirmationCodeBackground>
      <Text variant="code_title">Enter Confirmation Code</Text>
      <Text variant="code_message">Your email was sent to {emailCensored}</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={(newText) => {
          setValue(newText);

          if (error !== "") {
            setError("");
          }

          if (newText.length === CELL_COUNT) {
            console.log(type);
            console.log(codeType);
            if (newText === code && type === codeType) {
              dispatch(confirmedCodeSuccess());

              if (routeName === "") {
                navigation.pop(1);
              } else {
                navigation.navigate(routeName);
              }
            } else {
              setError("Incorrect code. Try again or click Resend code.");
            }
          }
        }}
        cellCount={CELL_COUNT}
        rootStyle={{
          height: 40,
          marginTop: 30,
          marginBottom: 10,
          paddingHorizontal: 0,
        }}
        keyboardType="number-pad"
        autoFocus={true}
        renderCell={renderCell}
      />

      {error !== "" && <Text variant="input_invalid">{error}</Text>}

      <Spacer size="large" />

      <ResendButtonContainer>
        <ResendButton
          title={() => (
            <Text
              variant="code_resend_button"
              style={{
                color:
                  timer !== 0 ? colors.text.lightestgray : colors.text.primary,
              }}
            >
              Resend code
            </Text>
          )}
          disabled={timer !== 0}
          onPress={() => dispatch(sendConfirmationCode(email, codeType))}
        />
        {timer !== 0 && <Text variant="code_timer">{timer}s</Text>}
      </ResendButtonContainer>
    </ConfirmationCodeBackground>
  );
};
