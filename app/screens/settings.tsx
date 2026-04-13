import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { clearHistory } from '@/constants/history';
import * as Haptics from 'expo-haptics';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  const handleClearHistory = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Reset App Data',
      'This will clear all your conversion history. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset All', 
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('Success', 'History has been cleared.');
          }
        }
      ]
    );
  };

  const SettingItem = ({ icon, title, value, type = 'text', onPress, color = '#3b82f6' }: any) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={onPress}
      disabled={type === 'switch'}
    >
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        {type === 'text' && <Text style={styles.itemValue}>{value}</Text>}
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: '#334155', true: '#3b82f6' }}
          thumbColor={value ? '#fff' : '#94a3b8'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={18} color="#475569" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Configure your toolkit</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.card}>
            <SettingItem
              icon="moon-outline"
              title="Dark Appearance"
              value={isDarkMode}
              type="switch"
              onPress={() => setIsDarkMode(!isDarkMode)}
              color="#a78bfa"
            />
            <View style={styles.divider} />
            <SettingItem
              icon="notifications-outline"
              title="Notifications"
              value={notifications}
              type="switch"
              onPress={() => setNotifications(!notifications)}
              color="#f472b6"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <SettingItem
              icon="thermometer-outline"
              title="Temperature Unit"
              value="Celsius (°C)"
              onPress={() => {}}
              color="#f59e0b"
            />
            <View style={styles.divider} />
            <SettingItem
              icon="cash-outline"
              title="Currency Base"
              value="USD ($)"
              onPress={() => {}}
              color="#10b981"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>
          <View style={styles.card}>
            <SettingItem
              icon="information-circle-outline"
              title="About Smart Toolkit"
              onPress={() => {}}
              color="#3b82f6"
            />
            <View style={styles.divider} />
            <SettingItem
              icon="shield-checkmark-outline"
              title="Privacy Policy"
              onPress={() => {}}
              color="#64748b"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.dangerBtn} onPress={handleClearHistory}>
           <MaterialCommunityIcons name="delete-sweep-outline" size={24} color="#f87171" />
           <Text style={styles.dangerText}>Clear Conversion History</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Smart Toolkit v1.0.2 • Build 152</Text>
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
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    color: '#64748b',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#3b82f6',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1e293b',
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemValue: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#1e293b',
    marginHorizontal: 16,
  },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7f1d1d22',
    padding: 18,
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#7f1d1d44',
    gap: 10,
  },
  dangerText: {
    color: '#f87171',
    fontWeight: '700',
    fontSize: 16,
  },
  version: {
    textAlign: 'center',
    color: '#334155',
    fontSize: 12,
    marginTop: 32,
    fontWeight: '500',
  },
});