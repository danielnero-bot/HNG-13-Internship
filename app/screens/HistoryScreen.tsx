import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getHistory, clearHistory, Conversion } from '@/constants/history';
import { useIsFocused } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

export default function HistoryScreen() {
  const [history, setHistory] = useState<Conversion[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadHistory();
    }
  }, [isFocused]);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  const handleClear = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all conversion records?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            loadHistory();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'length': return 'ruler';
      case 'currency': return 'currency-usd';
      case 'temperature': return 'thermometer';
      default: return 'help-circle';
    }
  };

  const renderItem = ({ item }: { item: Conversion }) => (
    <View style={styles.item}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name={getTypeIcon(item.type) as any} size={24} color="#3b82f6" />
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.valueText}>{item.fromValue} {item.from}</Text>
          <Ionicons name="arrow-forward" size={14} color="#64748b" style={styles.arrow} />
          <Text style={styles.resText}>{item.toValue} {item.to}</Text>
        </View>
        <Text style={styles.timeText}>{new Date(item.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>{history.length} records found</Text>
        </View>
        {history.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Ionicons name="trash-outline" size={20} color="#f87171" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="time-outline" size={64} color="#1e293b" />
            <Text style={styles.emptyText}>No conversions yet</Text>
            <Text style={styles.emptySub}>Your recent activity will appear here</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    color: '#64748b',
    fontSize: 14,
  },
  clearBtn: {
    padding: 12,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  list: {
    padding: 24,
  },
  item: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  arrow: {
    marginHorizontal: 8,
  },
  resText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  timeText: {
    color: '#475569',
    fontSize: 12,
    marginTop: 4,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
  },
  emptySub: {
    color: '#475569',
    fontSize: 14,
    marginTop: 4,
  },
});
