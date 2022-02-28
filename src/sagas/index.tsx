import { fork, all } from "redux-saga/effects";
import { CreatePostWatcher } from "../screens/CreatePostScreen/saga";
import { UserLoginWatcher } from "../screens/LoginScreen/saga";
import { MyPostWatcher } from "../screens/MyPostScreen/saga";
import { networkSaga } from "react-native-offline";

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    UserLoginWatcher(),
    CreatePostWatcher(),
    MyPostWatcher(),
    fork(networkSaga, { pingInterval: 20000 }),
  ]);
}
