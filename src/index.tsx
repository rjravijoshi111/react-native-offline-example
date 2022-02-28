import React from "react";
import Navigator from "./navigation";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store, persistor } from "./reducers/store";
import { PersistGate } from "redux-persist/integration/react";
import { ReduxNetworkProvider, NetworkProvider } from "react-native-offline";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <NetworkProvider>
          <ReduxNetworkProvider>
            <PersistGate loading={null} persistor={persistor}>
              <Navigator />
            </PersistGate>
          </ReduxNetworkProvider>
        </NetworkProvider>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
