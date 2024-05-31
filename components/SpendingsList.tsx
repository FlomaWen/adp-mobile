import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Modal,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import spendings from "@/spendings.json";
import categories from "@/categories.json";
import InputsForm from "./InputsForm";
import LoginForm from "./LoginForm";
import { AddIcon, Button, ButtonIcon, ButtonText } from "@gluestack-ui/themed";

interface SpendingsListProps {
  onListExpand: () => void;
  isListExpanded: boolean;
}

const categoryColors = [
  "#556B2F",
  "#2C3E50",
  "#6A5ACD",
  "#8B5F65",
  "#708090",
  "#556B2F",
  "#6B4423",
];

const categorizedColors = categories.map((category, index) => ({
  ...category,
  color: categoryColors[index % categoryColors.length],
}));

const getCategoryById = (id: number) => {
  return categorizedColors.find((category) => category.ID === id);
};

export default function SpendingsList({
  onListExpand,
  isListExpanded,
}: SpendingsListProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const labelColor = colorScheme === "dark" ? "white" : "black";
  const backgroundColor = colorScheme === "dark" ? "#2e2d2d" : "white";
  const itemBackgroundColor = colorScheme === "dark" ? "#1e1e1e" : "#ffffff";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <TouchableOpacity style={styles.arrowContainer} onPress={onListExpand}>
        <Icon
          name={isListExpanded ? "arrow-down" : "arrow-up"}
          size={24}
          color={labelColor}
        />
      </TouchableOpacity>
      <Button
        style={styles.button}
        size="xs"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        onPress={() => setModalVisible(true)}
      >
        <ButtonText>New</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
      {spendings.map((item, index) => {
        const category = getCategoryById(item.category_id);
        return (
          <View
            key={index}
            style={[
              styles.spendingItem,
              { backgroundColor: itemBackgroundColor },
            ]}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.nameAndPriceContainer}>
                <Text style={[styles.spendingText, { color: labelColor }]}>
                  {item.name}
                </Text>
                <Text style={styles.spendingValue}>- {item.value} €</Text>
              </View>
              <View style={styles.dateAndCategoryContainer}>
                <Text style={[styles.spendingDate, { color: labelColor }]}>
                  {new Date(item.createdat).toLocaleDateString()}
                </Text>
                {category && (
                  <View
                    style={[
                      styles.categoryBadge,
                      { backgroundColor: category.color },
                    ]}
                  >
                    <Text style={styles.categoryText}>{category.name}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      })}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <InputsForm />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  spendingItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  nameAndPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateAndCategoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  spendingText: {
    fontSize: 16,
  },
  spendingDate: {
    fontSize: 12,
  },
  spendingValue: {
    fontSize: 16,
    color: "#bf1a1a",
  },
  arrowContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  categoryText: {
    color: "white",
    fontSize: 12,
  },
  button: {
    width: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    height: 300,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
