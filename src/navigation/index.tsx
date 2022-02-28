import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import CreatePostScreen from "../screens/CreatePostScreen/CreatePostScreen";
import MyPostScreen from "../screens/MyPostScreen/MyPostScreen";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { logout } from "../screens/LoginScreen/actions";

const RootStack = createStackNavigator();

const Navigator = () => {
  const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  };
  const dispatch = useDispatch();
  let accessToken = useSelector((state) => state?.LoginReducer?.accessToken);
  return (
    <RootStack.Navigator
      screenOptions={TransitionScreenOptions}
      defaultScreenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        accessToken && accessToken != "" ? "HomeScreen" : "LoginScreen"
      }
    >
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerBackTitle: "",
          headerRight: () => (
            <Button
              onPress={() => {
                dispatch(logout());
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{ name: "LoginScreen" }],
                  })
                );
              }}
              title="Logout"
            />
          ),
        })}
      />
      <RootStack.Screen
        options={{ headerBackTitle: "" }}
        name="CreatePostScreen"
        component={CreatePostScreen}
      />
      <RootStack.Screen
        options={{ headerBackTitle: "" }}
        name="MyPostScreen"
        component={MyPostScreen}
      />
    </RootStack.Navigator>
  );
};
export default Navigator;
