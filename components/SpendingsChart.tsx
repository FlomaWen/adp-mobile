import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import categories from "@/categories.json";
import spendings from "@/spendings.json";
import user from "@/users.json";
import { Box, Text } from "@gluestack-ui/themed";

export default function MyChart() {
  const colorScheme = useColorScheme();
  const labelColor = colorScheme === "dark" ? "white" : "black";
  const backgroundColor = colorScheme === "dark" ? "black" : "white";

  const thisUser = 0;

  const pieData = categories.map((category) => {
    const totalSpending = spendings
      .filter((spending) => spending.category_id === category.ID)
      .reduce((sum, spending) => sum + parseFloat(spending.value), 0);
    return { y: totalSpending, x: category.name };
  });

  const remaining =
    +user[thisUser].revenus -
    pieData.reduce((sum, category) => sum + category.y, 0);

  pieData.push({ y: remaining, x: "Restant" });

  const total = pieData.reduce((sum, category) => sum + category.y, 0);

  const pieDataWithPercentages = pieData.map((item) => ({
    ...item,
    percentage: ((item.y / total) * 100).toFixed(2),
  }));

  const colorScale = [
    "#FCFFA6",
    "#C1FFD7",
    "#B5DEFF",
    "#CAB8FF",
    "#79B4B7",
    "#9D9D9D",
    "#C1AC95",
  ];

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <VictoryPie
        innerRadius={100}
        data={pieDataWithPercentages}
        colorScale={colorScale}
        labels={({ datum }) => `${datum.percentage}%`}
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
        Restant: {remaining.toFixed(2)} €
      </Text>
      <View style={styles.legend}>
        {pieDataWithPercentages.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: colorScale[index % colorScale.length] },
              ]}
            />
            <Text style={[styles.legendText, { color: labelColor }]}>
              {item.x} - {item.percentage}%
            </Text>
          </View>
        ))}
      </View>
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
