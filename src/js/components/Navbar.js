import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import { AppTextBold } from "./ui/AppTextBold";
import { THEME } from "../theme";

export function Navbar(props) {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIOS,
          android: styles.navbarAndroid,
        }),
      }}
    >
      <AppTextBold style={{ ...styles.navbar, ...styles.text }}>
        Welcome to ToDo App
      </AppTextBold>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 50,
    paddingTop: "2%",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    fontSize: 18,
  },
  navbarAndroid: {
    backgroundColor: THEME.mainBlueColor,
  },
  navbarIOS: {
    borderBottomColor: THEME.mainBlueColor,
    borderBottomWidth: 2,
  },
  text: {
    color: Platform.OS === "android" ? "white" : "#2ec6d1",
  },
});
