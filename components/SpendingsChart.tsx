import React from "react";
import { StyleSheet, View, useColorScheme, Text } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import categories from "@/categories.json";
import spendings from "@/spendings.json";
import user from "@/users.json";
import {
  ChevronDownIcon,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Box,
  GluestackUIProvider,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export default function MyChart() {
  const colorScheme = useColorScheme();
  const labelColor = colorScheme === "dark" ? "white" : "black";
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  const userIndex = 0;
  const revenus = user[userIndex].revenus;

  // Convert budget from string to number
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

  // Calculate spendings by categories
  const spendingsByCategories: number[] = parsedCategories.map(() => 0);

  spendings.forEach((spending) => {
    const categoryIndex = parsedCategories.findIndex(
      (category) => category.ID === spending.category_id
    );
    spendingsByCategories[categoryIndex] += parseFloat(spending.value);
  });

  // Update budgets based on spendings
  parsedCategories.forEach((category, index) => {
    const remainingBudget =
      category.budget - (spendingsByCategories[index] || 0);
    if (remainingBudget < 0) {
      category.budget += Math.abs(remainingBudget);
    }
  });

  // Calculate remaining amount
  const remainingAmount = Number(revenus) - totalSpendings;

  // Calculate possible savings
  let possibleSavings = 0;
  parsedCategories.forEach((category, index) => {
    const remainingBudget =
      category.budget - (spendingsByCategories[index] || 0);
    if (remainingBudget > 0) {
      possibleSavings += remainingBudget;
    }
  });

  // Add possible savings to the pie chart data if it's not zero
  const pieData = parsedCategories.map((category) => ({
    x: category.name,
    y: category.budget,
    label: `${((category.budget / Number(revenus)) * 100).toFixed(1)}%`,
  }));

  if (possibleSavings !== 0) {
    pieData.push({
      x: "Épargne",
      y: possibleSavings,
      label: "",
    });
  }

  const colorScale = [
    "#556B2F",
    "#2C3E50",
    "#6A5ACD",
    "#8B5F65",
    "#708090",
    "#556B2F",
    "#6B4423",
    "#ff6347",
  ];
  return (
    <GluestackUIProvider config={config}>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <Box backgroundColor="$primary500">
          <Text selectionColor="white">This is the Box</Text>
        </Box>

        <VictoryPie
          innerRadius={100}
          data={pieData}
          colorScale={colorScale}
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
        <View style={styles.legend}>
          {pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: colorScale[index] },
                ]}
              />
              <Text style={[styles.legendText, { color: labelColor }]}>
                {item.x}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </GluestackUIProvider>
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
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    width: "30%",
    paddingLeft: 30,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
  },
});
