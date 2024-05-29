import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  useColorScheme,
  Pressable,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import spendings from "@/spendings.json";
import categories from "@/categories.json";

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
  const colorScheme = useColorScheme();
  const labelColor = colorScheme === "dark" ? "white" : "black";
  const backgroundColor = colorScheme === "dark" ? "#2e2d2d" : "white";
  const itemBackgroundColor = colorScheme === "dark" ? "#1e1e1e" : "#ffffff";

  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].ID);
  const [frequency, setFrequency] = useState("unique");

  const renderDropdownButtonText = (defaultValue: string) => {
    return defaultValue;
  };

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
      <View style={styles.inlineContainer}>
        <TextInput
          style={[styles.input, { color: labelColor }]}
          placeholder="Montant"
          placeholderTextColor={labelColor}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <View style={styles.dropdownContainer}>
          <ModalDropdown
            options={categories.map((category) => category.name)}
            defaultValue="Catégorie"
            textStyle={{ color: labelColor, fontSize: 16 }}
            dropdownTextStyle={{ fontSize: 16 }}
            dropdownStyle={styles.dropdown}
            style={[styles.dropdown, { marginTop: 10, marginLeft: 10 }]}
            onSelect={(index: string | number, value: any) =>
              setSelectedCategory(categories[index as number]?.ID)
            }
            renderButtonText={renderDropdownButtonText}
          />

          <ModalDropdown
            options={["Unique", "Par jour", "Par semaine", "Par mois"]}
            defaultValue="Fréquence"
            textStyle={{ color: labelColor, fontSize: 16 }}
            dropdownTextStyle={{ fontSize: 16 }}
            dropdownStyle={styles.dropdown}
            style={[styles.dropdown, { marginTop: 10, marginLeft: 10 }]}
            onSelect={(_index: any, value: React.SetStateAction<string>) =>
              setFrequency(value)
            }
            renderButtonText={renderDropdownButtonText}
          />
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => console.log("Valider")}>
        <Text style={styles.buttontext}>{"Test"}</Text>
      </Pressable>

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
            <View style={styles.textContainer}>
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
    borderEndEndRadius: 20,
    borderStartStartRadius: 20,
    borderBottomLeftRadius: 20,
  },
  textContainer: {
    flex: 1,
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
  inputContainer: {
    padding: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderColor: "#ccc",
    fontSize: 12,
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
  inlineContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dropdownContainer: {
    flexDirection: "row",
    flex: 1,
  },
  dropdown: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttontext: {
    color: "white",
    fontSize: 16,
  },
});
