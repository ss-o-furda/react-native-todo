import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import { View, StyleSheet, TextInput, Modal } from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export function EditModal({ isVisible, onCancel, value, onSave }) {
  const [title, setTitle] = useState(value);
  const [inputError, setInputError] = useState("");

  const handleTodoEdit = () => {
    if (!title) {
      setInputError("Empty field...");
    } else {
      onSave(title);
    }
  };

  const cancelHandler = () => {
    setTitle(value);
    onCancel();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <View style={styles.wrapper}>
        <TextInput
          style={
            inputError
              ? { ...styles.input, ...styles.inputError }
              : styles.input
          }
          placeholder="Type new name..."
          value={title}
          onChangeText={(text) => {
            setInputError("");
            setTitle(text);
          }}
        />
        <View style={styles.buttons}>
          <AppButton
            color={THEME.redColor}
            onPress={cancelHandler}
            style={styles.buttons}
          >
            <FontAwesome name="remove" size={24} color="#fff" />
          </AppButton>
          <AppButton
            color="blue"
            onPress={handleTodoEdit}
            style={styles.buttons}
          >
            <FontAwesome name="save" size={24} color="#fff" />
          </AppButton>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.mainBlueColor,
    borderBottomWidth: 2,
    width: "80%",
  },
  inputError: {
    borderBottomColor: THEME.redColor,
  },
  buttons: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
