import React, { useState } from "react";
import { StyleSheet, SafeAreaView, useColorScheme } from "react-native";
import TitleComponent from "@/components/TitleComponent";
import MyChart from "@/components/SpendingsChart";
import SpendingsList from "@/components/SpendingsList";
import { Animated } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "black" : "white";

  const [isListExpanded, setIsListExpanded] = useState(false);

  const handleListExpansion = () => {
    setIsListExpanded(!isListExpanded);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <TitleComponent text="HISTORIQUE" />
      <MyChart />
      <Animated.View
        style={[
          styles.animatedContainer,
          { height: isListExpanded ? "75%" : "40%" },
        ]}
      >
        <SpendingsList
          onListExpand={handleListExpansion}
          isListExpanded={false}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
  },
});
