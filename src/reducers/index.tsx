import { combineReducers } from "redux";
import CreatePostReducer from "../screens/CreatePostScreen/reducer";
import LoginReducer from "../screens/LoginScreen/reducer";
import MyPostReducer from "../screens/MyPostScreen/reducer";
import { reducer as network } from "react-native-offline";

const appReducer = combineReducers({
  LoginReducer: LoginReducer,
  CreatePostReducer: CreatePostReducer,
  MyPostReducer: MyPostReducer,
  network,
});

export default appReducer;
