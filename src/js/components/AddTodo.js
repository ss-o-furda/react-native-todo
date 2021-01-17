import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export function AddTodo({ onSubmit }) {
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState("");

  const handleXButton = () => {
    setValue("");
    setInputError("");
  };

  const handleSubmit = () => {
    if (value) {
      onSubmit(value);
      setValue("");
    } else {
      setInputError("Empty todo");
    }
  };

  useEffect(() => {
    setInputError("");
  }, [value]);

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={
          inputError ? { ...styles.input, ...styles.inputError } : styles.input
        }
        onChangeText={setValue}
        value={value}
        placeholder={"Insert todo..."}
        autoCorrect={false}
        onSubmitEditing={handleSubmit}
        blurOnSubmit={false}
      />
      <AppButton color={THEME.redColor} onPress={handleXButton}>
        <Feather name="delete" size={15} color="white" />
      </AppButton>
      <AppButton color="blue" onPress={handleSubmit}>
        <AntDesign name="addfile" size={15} color="white" />
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    marginTop: 5,
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    width: "65%",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: THEME.mainBlueColor,
  },
  inputError: {
    borderBottomColor: THEME.redColor,
  },
});
