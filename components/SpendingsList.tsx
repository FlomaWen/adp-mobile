import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  useColorScheme,
} from "react-native";
import spendings from "@/spendings.json";

export default function SpendingsList() {
  const colorScheme = useColorScheme();
  const labelColor = colorScheme === "dark" ? "white" : "black";
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  const itemBackgroundColor = colorScheme === "dark" ? "#1e1e1e" : "#ffffff";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      {spendings.map((item, index) => (
        <View
          key={index}
          style={[
            styles.spendingItem,
            { backgroundColor: itemBackgroundColor },
          ]}
        >
          <View style={styles.textContainer}>
            <Text style={[styles.spendingText, { color: labelColor }]}>
              {item.name}
            </Text>
            <Text style={[styles.spendingDate, { color: labelColor }]}>
              {new Date(item.createdat).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.spendingValue}>- {item.value} €</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  spendingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  spendingText: {
    fontSize: 16,
  },
  spendingDate: {
    fontSize: 12,
    marginTop: 5,
  },
  spendingValue: {
    fontSize: 16,
    textAlign: "right",
    color: "#bf1a1a",
  },
});
