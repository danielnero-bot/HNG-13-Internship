import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedView style={styles.card}>
        <ThemedText type="title">Settings</ThemedText>
        <ThemedText style={styles.description}>
          Manage app preferences, configure tools, and customize your
          experience.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
  },
  content: {
    padding: 24,
  },
  card: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 3,
  },
  description: {
    marginTop: 12,
    color: "#64748B",
    lineHeight: 20,
  },
});
