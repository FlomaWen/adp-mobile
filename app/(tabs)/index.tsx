import React from "react";
import { StyleSheet, Platform, SafeAreaView } from "react-native";
import TitleComponent from "@/components/TitleComponent";
import TestChart from "@/components/SpendingsChart";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TitleComponent text="HISTORIQUE" />
      <TestChart />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
