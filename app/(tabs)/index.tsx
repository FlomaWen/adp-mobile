import React from "react";
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import TitleComponent from "@/components/TitleComponent";
import MyChart from "@/components/SpendingsChart";
import SpendingsList from "@/components/SpendingsList";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "black" : "white";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <TitleComponent text="HISTORIQUE" />
      <MyChart />
      <SpendingsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
