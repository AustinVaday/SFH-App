import React from "react";
import { Image, Modal, View } from "react-native";

const Loader = (props) => {
  const { loading } = props;

  return (
    <Modal transparent={true} animationType={"none"} visible={loading}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(65, 69, 64, 0.95)",
            borderRadius: 15,
          }}
        >
          <Image
            source={require("../../../assets/loading/loader.gif")}
            style={{ width: 80, height: 80 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
