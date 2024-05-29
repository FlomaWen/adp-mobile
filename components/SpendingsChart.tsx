import React from "react";
import { StyleSheet, View, useColorScheme, Text } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import categories from "@/categories.json";
import spendings from "@/spendings.json";
import user from "@/users.json";

export default function MyChart() {
  const colorScheme = useColorScheme();
  const labelColor = colorScheme === "dark" ? "white" : "black";
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  const userIndex = 0;
  const revenus = user[userIndex].revenus;

  // Convert budget from string to number if necessary
  const parsedCategories = categories.map((category) => ({
    ...category,
    budget:
      typeof category.budget === "string"
        ? parseFloat(category.budget)
        : category.budget,
  }));

  // Calculate total expenses (revenus - total spendings)
  const totalSpendings = spendings.reduce(
    (acc, spending) => acc + parseFloat(spending.value),
    0
  );

  const remainingAmount = Number(revenus) - totalSpendings;

  const pieData = parsedCategories.map((category) => ({
    x: category.name,
    y: category.budget,
    label: `${((category.budget / Number(revenus)) * 100).toFixed(1)}%`,
  }));

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <VictoryPie
        innerRadius={100}
        data={pieData}
        colorScale={[
          "#556B2F",
          "#2C3E50",
          "#6A5ACD",
          "#8B5F65",
          "#708090",
          "#556B2F",
          "#6B4423",
        ]}
        labelComponent={
          <VictoryLabel
            angle={({ datum }) => {
              const angle =
                datum.startAngle + (datum.endAngle - datum.startAngle) / 2;
              if (
                (120 < angle && angle < 180) ||
                (0 < angle && angle < 60) ||
                (240 < angle && angle < 300)
              ) {
                return angle;
              } else {
                return angle + 180;
              }
            }}
            textAnchor="middle"
            style={{ fill: "white", fontSize: 10, fontWeight: "bold" }}
            dy={({ datum }) => {
              const angle =
                datum.startAngle + (datum.endAngle - datum.startAngle) / 2;
              if (
                (120 < angle && angle < 180) ||
                (0 < angle && angle < 60) ||
                (240 < angle && angle < 300)
              ) {
                return 50;
              } else {
                return -50;
              }
            }}
          />
        }
      />
      <Text style={[styles.centerText, { color: labelColor }]}>
        Restant: {remainingAmount.toFixed(2)} €
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    position: "absolute",
    textAlign: "center",
    fontSize: 15,
  },
});
