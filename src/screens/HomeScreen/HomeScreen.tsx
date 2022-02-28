import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import ConnectionInfo from "../../components/ConnectionInfo/ConnectionInfo";
import styles from "./styles";

function HomeScreen(props: any) {
  return (
    <>
      <ConnectionInfo />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("CreatePostScreen")}
          style={styles.postButton}
        >
          <Text style={styles.buttonTextStyle}>Create Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("MyPostScreen")}
          style={styles.postButton}
        >
          <Text style={styles.buttonTextStyle}>My Post</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const mapStateToProps = (state: any) => {
  let network = state?.network;
  return { network };
};

export default connect(mapStateToProps, null)(HomeScreen);
