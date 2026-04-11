import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ScrollView, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

const tools = [
  {
    title: "Length Converter",
    description: "Convert between Metric and Imperial units with precision.",
    icon: <FontAwesome5 name="ruler-horizontal" size={28} color="#3142CE" />,
    href: "/length-converter",
  },
  {
    title: "Temperature Converter",
    description: "Easily switch between Celsius, Fahrenheit, and Kelvin scales.",
    icon: <Entypo name="stopwatch" size={28} color="#3142CE" />,
    href: "/temperature-converter",
  },
  {
    title: "Currency Converter",
    description: "Convert between different currencies in real-time.",
    icon: <FontAwesome5 name="money-bill-wave" size={28} color="#3142CE" />,
    href: "/currency-converter",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroHeader}>
          <View style={styles.brandRow}>
            <Entypo name="menu" size={24} color="white" />
            <ThemedText type="title" style={styles.heroTitle}>
              Smart Toolkit
            </ThemedText>
          </View>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>

        <ThemedText type="subtitle" style={styles.heroSubtitle}>
          Your all-in-one utility app
        </ThemedText>
        <ThemedText style={styles.heroDescription}>
          Precision tools for every digital task, built to help you move faster
          and stay focused.
        </ThemedText>
      </View>

      {tools.map((tool) => (
        <ThemedView key={tool.title} style={styles.card}>
          <View style={styles.cardIcon}>{tool.icon}</View>
          <View style={styles.cardBody}>
            <ThemedText type="subtitle" style={styles.cardTitle}>
              {tool.title}
            </ThemedText>
            <ThemedText style={styles.cardText}>{tool.description}</ThemedText>
            <ThemedText style={styles.cardLink}><Link href={tool.href} style={{paddingBottom: 7}}>Open Tool  <AntDesign name="arrow-right" size={20} color="white"/></Link></ThemedText>
          </View>
        </ThemedView>
      ))}

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10131a",
  },
  content: {
    padding: 24,
  },
  hero: {
    borderRadius: 24,
    padding: 19,
    marginBottom: 20,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroTitle: {
    color: "white",
    marginLeft: 10,
  },
  heroSubtitle: {
    marginTop: 18,
    color: "#D7E7FF",
  },
  heroDescription: {
    marginTop: 10,
    color: "#E8F0FF",
    lineHeight: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionDescription: {
    marginTop: 6,
    color: "#64748B",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 3,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#003259",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: 6,
  },
  cardText: {
    color: "#64748B",
    lineHeight: 20,
  },
  cardLink:{
    paddingBottom: 7,
    marginTop: 8,
     color: "white",
      fontWeight: "600",
  },
  infoCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#E8EFF9",
    marginTop: 4,
  },
  infoText: {
    marginTop: 8,
    color: "#475569",
    lineHeight: 20,
  },
});
