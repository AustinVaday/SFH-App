import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Navigation } from "./src/infrastructure/navigation";
import { ThemeProvider } from "styled-components/native";
import { Provider as PaperProvider } from "react-native-paper";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Toast, { SuccessToast, ErrorToast } from "react-native-toast-message";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./src/services/redux/reducers";

import { colors } from "./src/infrastructure/theme/colors";

import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";

import { theme } from "./src/infrastructure/theme";

const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      contentContainerStyle={{ backgroundColor: colors.bg.success }}
      leadingIconContainerStyle={{ backgroundColor: colors.bg.success }}
      leadingIconStyle={{ tintColor: colors.icon.primary }}
      trailingIconContainerStyle={{ backgroundColor: colors.bg.success }}
      trailingIconStyle={{ tintColor: colors.icon.primary }}
      text1Style={{
        fontSize: 15,
        color: colors.text.white,
      }}
      text2Style={{
        fontSize: 15,
        color: colors.text.white,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{ backgroundColor: colors.bg.error }}
      leadingIconContainerStyle={{ backgroundColor: colors.bg.error }}
      leadingIconStyle={{ tintColor: colors.icon.primary }}
      trailingIconContainerStyle={{ backgroundColor: colors.bg.error }}
      trailingIconStyle={{ tintColor: colors.icon.primary }}
      text1Style={{
        fontSize: 15,
        color: colors.text.white,
      }}
      text2Style={{
        fontSize: 15,
        color: colors.text.white,
      }}
    />
  ),
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const [openSansLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  if (!openSansLoaded) {
    return null;
  } else {
    return (
      <>
        <ThemeProvider theme={theme}>
          <PaperProvider>
            <ActionSheetProvider>
              <Provider store={store}>
                <Navigation />
              </Provider>
            </ActionSheetProvider>
          </PaperProvider>
        </ThemeProvider>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        <ExpoStatusBar style="auto" />
      </>
    );
  }
}
