import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBlacklistFilter } from "redux-persist-transform-filter";
// Imports: Redux Root Reducer
import appReducer from "../reducers";
import {
  createNetworkMiddleware,
  reducer as network,
} from "react-native-offline";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
// Imports: Redux Root Saga
import { rootSaga } from "../sagas";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();
const networkMiddleware = createNetworkMiddleware({
  regexActionType: /FETCH.*REQUEST/,
  actionTypes: ['CREATE_POST','MY_POST'],
  queueReleaseThrottle: 200,
});
const loginBlacklistFilter = createBlacklistFilter("LoginReducer", [
  "isLoading",
]);
const createPostBlacklistFilter = createBlacklistFilter("CreatePostReducer", [
  "isLoading",
]);
const myPosyBlacklistFilter = createBlacklistFilter("MyPostReducer", [
  "isLoading",
]);
// Middleware: Redux Persist Config

const persistConfig = {
  timeout: 0,
  // Root?
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  transforms: [
    loginBlacklistFilter,
    createPostBlacklistFilter,
    myPosyBlacklistFilter,
  ],
  blacklist: ["network"],
  // Whitelist (Save Specific Reducers)
  stateReconciler: autoMergeLevel2,
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, appReducer);

// Redux: Store
const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(networkMiddleware, sagaMiddleware, createLogger()),
    // offline(offlineConfig)
  )
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);
// Exports
export { store, persistor };
