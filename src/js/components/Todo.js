import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { THEME } from "../theme";
import { AppText } from "./ui/AppText";
import { AppTextBold } from "./ui/AppTextBold";

export function Todo({ todo, onRemove, onOpen }) {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => onOpen(todo.id)}
      onLongPress={() => onRemove(todo.id)}
    >
      <View style={styles.todo}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: THEME.todoBorderColor,
    borderRadius: 5,
    marginBottom: 10,
  },
});
