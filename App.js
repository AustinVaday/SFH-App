import React from "react";
import { LogBox } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./src/services/redux/reducers";
import { QueryClient, QueryClientProvider } from "react-query";

import { Navigation } from "./src/infrastructure/navigation";
import { ThemeProvider } from "styled-components/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import {
  NewMessageToast,
  InfoToast,
  InfoErrorToast,
  InfoSuccessToast,
} from "./src/components/utilities/toast-message-type.components";

import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";

import { AlfaSlabOne_400Regular } from "@expo-google-fonts/alfa-slab-one";

import { theme } from "./src/infrastructure/theme";

// this is just temporary due to upgraded Expo 43, this warning
// keeps appearing, its annoying as doing code. Even tho,
// I did not use AsyncStorage. This will be removed if its fixed
LogBox.ignoreLogs(["AsyncStorage"]);

const toastConfig = {
  newMessage: ({ props, onPress }) => NewMessageToast(props, onPress),
  infoMessage: ({ props }) => InfoToast(props),
  infoError: ({ props }) => InfoErrorToast(props),
  infoSuccess: ({ props }) => InfoSuccessToast(props),
};

// for Redux debugging purposes
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

const store = createStore(rootReducer, applyMiddleware(thunk));

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } },
});

export default function App() {
  const [openSansLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    AlfaSlabOne_400Regular,
  });

  if (!openSansLoaded) {
    return null;
  } else {
    return (
      <>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <ActionSheetProvider>
              <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                  <BottomSheetModalProvider>
                    <Navigation />
                  </BottomSheetModalProvider>
                </QueryClientProvider>
              </Provider>
            </ActionSheetProvider>
          </SafeAreaProvider>
        </ThemeProvider>

        <Toast config={toastConfig} />
        <ExpoStatusBar animated={true} style="auto" />
      </>
    );
  }
}
