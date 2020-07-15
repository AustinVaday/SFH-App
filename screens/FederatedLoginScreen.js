import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Button, Icon } from "react-native-elements";

const FederatedLoginScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.mainTitle}>Signs For Humanity</Text>
      <Text style={styles.messageStyle}>Deaf. Hearing. Together.</Text>
      <View style={styles.fedButtons}>
        <Button
          title="Continue with Facebook"
          titleStyle={{
            padding: 10,
            fontSize: 20,
            fontFamily: "open-sans",
          }}
          buttonStyle={{
            margin: 10,
            height: 60,
            backgroundColor: "#4267B2",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.17,
            shadowRadius: 5.49,

            elevation: 12,
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
            fontFamily: "open-sans",
          }}
          buttonStyle={{
            margin: 10,
            height: 60,
            backgroundColor: "#DB4437",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.17,
            shadowRadius: 5.49,

            elevation: 12,
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
              fontFamily: "open-sans",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
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
              fontFamily: "open-sans",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
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
    fontSize: 50,
    paddingBottom: 30,
    fontFamily: "alfaSlabOne",
    color: Colors.primaryColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  messageStyle: {
    paddingBottom: 60,
    fontFamily: "open-sans-bold",
    fontSize: 25,
    color: "#b3b3b3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
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
