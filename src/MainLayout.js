import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Navbar } from "./js/components/Navbar";
import { THEME } from "./js/theme";
import { MainScreen } from "./js/screens/MainScreen";
import { TodoScreen } from "./js/screens/TodoScreen";
import { ScreenContext } from "./js/context/screen/screenContext";

export function MainLayout() {
  const { todoId } = useContext(ScreenContext);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar backgroundColor={THEME.mainBlueColor} />
          <Navbar />
          <View style={styles.content}>
            {todoId ? <TodoScreen /> : <MainScreen />}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingVertical: THEME.paddingVertical,
    paddingHorizontal: THEME.paddingHorizontal,
  },
});
