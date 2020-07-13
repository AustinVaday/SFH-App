import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Button, Icon } from "react-native-elements";

const FederatedLoginScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.mainTitle}>Signs For Humanity</Text>
      <View style={styles.fedButtons}>
        <Button
          title="Continue with Facebook"
          titleStyle={{
            padding: 10,
            fontSize: 20,
          }}
          buttonStyle={{
            margin: 10,
            height: 60,
            backgroundColor: "#4267B2",
          }}
          icon={
            <Icon name="logo-facebook" type="ionicon" size={40} color="white" />
          }
        />
        <Button
          title="Continue with Google"
          titleStyle={{
            padding: 10,
            fontSize: 20,
          }}
          buttonStyle={{
            margin: 10,
            height: 60,
            backgroundColor: "#DB4437",
          }}
          icon={
            <Icon name="logo-google" type="ionicon" size={40} color="white" />
          }
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsStyle}>
          <Button
            title="Login"
            titleStyle={{
              fontSize: 15,
              color: "black",
            }}
            type="clear"
            onPress={() => {
              props.navigation.navigate({ routeName: "Login" });
            }}
          />
        </View>
        <View style={styles.buttonsStyle}>
          <Button
            title="Sign up with email"
            titleStyle={{
                fontSize: 15,
                color: "black",
              }}
            type="clear"
            onPress={() => {
              props.navigation.navigate({ routeName: "Signup" });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryColor,
  },
  mainTitle: {
      fontSize: 40,
      paddingBottom: 150
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonsStyle: {
    paddingHorizontal: 8,
  },
  fedButtons: {
    width: "80%",
    margin: 5,
  },
});

export default FederatedLoginScreen;
