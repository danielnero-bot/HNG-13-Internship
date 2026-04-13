import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function HomeScreen({ navigation }: any) {
  const tools = [
    {
      id: 'Length',
      title: 'Length',
      subtitle: 'Distance & Size',
      icon: 'ruler',
      color: '#3b82f6',
      bg: '#1e3a8a33',
    },
    {
      id: 'Currency',
      title: 'Currency',
      subtitle: 'Global Exchange',
      icon: 'currency-usd',
      color: '#10b981',
      bg: '#064e3b33',
    },
    {
      id: 'Temperature',
      title: 'Temperature',
      subtitle: 'Heat & Cold',
      icon: 'thermometer',
      color: '#f59e0b',
      bg: '#451a0333',
    },
  ];

  const handlePress = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate(id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Day,</Text>
            <Text style={styles.appName}>Smart Toolkit</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="apps" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Quick Converter</Text>
            <Text style={styles.bannerSub}>All your essential tools in one place. Fast, accurate, and easy to use.</Text>
          </View>
          <View style={styles.bannerIcon}>
             <MaterialCommunityIcons name="lightning-bolt" size={40} color="#fcd34d" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Essential Tools</Text>
        
        <View style={styles.grid}>
          {tools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[styles.card, { borderColor: tool.color + '22' }]}
              onPress={() => handlePress(tool.id)}
            >
              <View style={[styles.iconWrapper, { backgroundColor: tool.bg }]}>
                <MaterialCommunityIcons name={tool.icon as any} size={32} color={tool.color} />
              </View>
              <Text style={styles.cardTitle}>{tool.title}</Text>
              <Text style={styles.cardSubtitle}>{tool.subtitle}</Text>
              <View style={styles.arrowCircle}>
                 <Ionicons name="arrow-forward" size={16} color="#64748b" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsRow}>
            <View style={styles.statBox}>
                <Text style={styles.statLabel}>Status</Text>
                <Text style={styles.statValue}>Online</Text>
            </View>
            <View style={[styles.statBox, styles.statBorder]}>
                <Text style={styles.statLabel}>Version</Text>
                <Text style={styles.statValue}>1.0.2</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statLabel}>Mode</Text>
                <Text style={styles.statValue}>Pro</Text>
            </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scroll: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '500',
  },
  appName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  profileBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  banner: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#334155',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  bannerSub: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  bannerIcon: {
    marginLeft: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    marginLeft: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#0f172a',
    width: '47.5%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#64748b',
    fontSize: 12,
  },
  arrowCircle: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#1e293b',
  },
  statLabel: {
    color: '#64748b',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});