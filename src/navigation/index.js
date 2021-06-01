import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  App: AppNavigator,
});

export default createAppContainer(SwitchNavigator);
