import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { connect, useDispatch } from "react-redux";

import styles from "./styles";
import { userLogin, setLoading } from "./actions";
import { CommonActions } from "@react-navigation/native";

const LoginScreen = (props: any, { navigation }: any) => {
  const [userName, setUserName] = useState("developer25");
  const [userPassword, setUserPassword] = useState("Now@12345");
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();
  const dispatch = useDispatch();

  const handleSubmitPress = () => {
    setErrortext("");
    if (!userName) {
      Alert.alert("Please fill UserName");
      return;
    }
    if (!userPassword) {
      Alert.alert("Please fill Password");
      return;
    }
    props.setLoading(true);
    let data = { username: userName, password: userPassword };
    props.userLogin({
      data,
      onSuccess: () => {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "HomeScreen" }],
          })
        );
      },
      onError: () => {},
    });
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) => setUserName(UserName)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              disabled={props.isLoading}
              onPress={handleSubmitPress}
            >
              {!props.isLoading ? (
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              ) : (
                <ActivityIndicator
                  color="#000"
                  animating={props.isLoading}
                />
              )}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state: any) => {
  let isLoading = state.LoginReducer.isLoading;
  return {
    isLoading,
  };
};

const mapDispatchToProps = {
  userLogin: userLogin,
  setLoading: setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
