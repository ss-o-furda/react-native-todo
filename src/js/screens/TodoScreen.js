import React, { useState, useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export function TodoScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { todos, updateTodo, removeTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

  const todo = todos.find((t) => t.id === todoId);

  const handleSave = (title) => {
    updateTodo(todo.id, title);
    setIsModalVisible(false);
  };

  return (
    <View>
      <EditModal
        isVisible={isModalVisible}
        onCancel={(_) => setIsModalVisible(false)}
        value={todo.title}
        onSave={(title) => handleSave(title)}
      />

      <AppCard style={styles.card}>
        <AppText style={styles.title}>{todo.title}</AppText>
        <AppButton color="blue" onPress={(_) => setIsModalVisible(true)}>
          <FontAwesome name="edit" size={18} color="white" />
        </AppButton>
      </AppCard>

      <View style={styles.buttonsView}>
        <View style={styles.button}>
          <AppButton
            onPress={(_) => changeScreen(null)}
            color={THEME.greyColor}
          >
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>

        <View style={styles.button}>
          <AppButton color={THEME.redColor} onPress={() => removeTodo(todo.id)}>
            <AntDesign name="delete" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: Dimensions.get("window").width / 3,
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
