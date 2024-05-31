import { StyleSheet, View } from "react-native";
import {
  Input,
  InputField,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  VStack,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import categories from "@/categories.json";
import { PortalProvider, Portal } from "@gorhom/portal";

export default function InputsForm() {
  const colorScheme = useColorScheme();
  const labelColor = colorScheme === "dark" ? "white" : "black";
  const backgroundColor = colorScheme === "dark" ? "black" : "white";

  return (
    <PortalProvider>
      <VStack style={styles.container}>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          style={styles.input}
        >
          <InputField placeholder="Montant" />
        </Input>
        <Portal>
          <Select style={styles.dropdown}>
            <SelectTrigger variant="rounded" size="sm">
              <SelectInput placeholder="Catégorie" />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {categories.map((category) => (
                  <SelectItem
                    key={category.ID}
                    label={category.name}
                    value={category.ID}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
          <Select style={styles.dropdown}>
            <SelectTrigger variant="rounded" size="sm">
              <SelectInput placeholder="Fréquence" />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Quotidienne" value="daily" />
                <SelectItem label="Hebdomadaire" value="weekly" />
                <SelectItem label="Mensuelle" value="monthly" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </Portal>
        <View style={styles.buttonContainer}>
          {/* Button component here */}
        </View>
      </VStack>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 8,
    borderColor: "#ccc",
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    width: 200,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    paddingVertical: 10,
    width: 150,
    alignItems: "center",
  },
  buttontext: {
    color: "white",
    fontSize: 16,
  },
});
