import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useSelector } from "react-redux";

const ConnectionInfo = () => {
    const isConneted = useSelector(state => state.network.isConnected);
  return (
    <View
      style={[  
        styles.container,
        {
          backgroundColor: isConneted ? "green" : "red",
        },
      ]}
    >
      <Text>{isConneted ? "You are online" : "You are offline"}</Text>
    </View>
  );
};

export default ConnectionInfo;
