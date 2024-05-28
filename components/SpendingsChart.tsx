import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";

export default class TestChart extends Component {
  render() {
    const widthAndHeight = 250;
    const series = [123, 321, 123, 789, 537];
    const sliceColor = ["#F44336", "#2196F3", "#FFEB3B", "#4CAF50", "#FF9800"];

    interface PieChartProps {
      widthAndHeight: number;
      series: number[];
      sliceColor: string[];
      doughnut?: boolean;
      coverRadius?: number;
      coverFill?: string;
    }
    return (
      <View style={styles.container}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.75}
          coverFill={"#FFF"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
