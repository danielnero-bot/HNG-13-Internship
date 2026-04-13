import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { saveConversion } from '@/constants/history';
import * as Haptics from 'expo-haptics';

const units = [
  { label: 'Meters', value: 'm' },
  { label: 'Kilometers', value: 'km' },
  { label: 'Miles', value: 'mi' },
  { label: 'Feet', value: 'ft' },
  { label: 'Inches', value: 'in' },
];

const unitMultipliers: Record<string, number> = {
  m: 1,
  km: 1000,
  mi: 1609.34,
  ft: 0.3048,
  in: 0.0254,
};

export default function LengthScreen() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('km');
  const [result, setResult] = useState<number | null>(null);

  const convertLength = () => {
    if (!value) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const val = parseFloat(value);
    const meters = val * unitMultipliers[from];
    const final = meters / unitMultipliers[to];

    setResult(final);
    saveConversion({
      type: 'length',
      from,
      to,
      fromValue: value,
      toValue: final.toFixed(4),
    });
  };

  const swapUnits = () => {
    Haptics.selectionAsync();
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Length</Text>
          <Text style={styles.subtitle}>Distance & dimensions</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Enter Length</Text>
          <TextInput
            placeholder="0.00"
            placeholderTextColor="#64748b"
            style={styles.input}
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />

          <View style={styles.unitContainer}>
             <View style={styles.selectWrapper}>
                <Text style={styles.miniLabel}>From</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                    {units.map((u) => (
                    <TouchableOpacity
                        key={u.value}
                        style={[styles.chip, from === u.value && styles.activeChip]}
                        onPress={() => setFrom(u.value)}
                    >
                        <Text style={[styles.chipText, from === u.value && styles.activeChipText]}>{u.value}</Text>
                    </TouchableOpacity>
                    ))}
                </ScrollView>
             </View>

             <TouchableOpacity style={styles.swapBtn} onPress={swapUnits}>
                <Ionicons name="swap-vertical" size={24} color="#fff" />
             </TouchableOpacity>

             <View style={styles.selectWrapper}>
                <Text style={styles.miniLabel}>To</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                    {units.map((u) => (
                    <TouchableOpacity
                        key={u.value}
                        style={[styles.chip, to === u.value && styles.activeChip]}
                        onPress={() => setTo(u.value)}
                    >
                        <Text style={[styles.chipText, to === u.value && styles.activeChipText]}>{u.value}</Text>
                    </TouchableOpacity>
                    ))}
                </ScrollView>
             </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={convertLength}>
            <Text style={styles.buttonText}>Calculate Result</Text>
            <Ionicons name="calculator" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {result !== null && (
          <View style={styles.resultCard}>
            <Text style={styles.resultHeader}>Converted Value</Text>
            <Text style={styles.resultText}>
              {result.toFixed(4)}
              <Text style={styles.resultSub}>{to}</Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
    color: '#94a3b8',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  label: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 20,
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  unitContainer: {
    marginBottom: 24,
  },
  selectWrapper: {
    marginBottom: 12,
  },
  miniLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
    marginLeft: 4,
  },
  chipScroll: {
    flexDirection: 'row',
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#1e293b',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeChip: {
    backgroundColor: '#3b82f6',
    borderColor: '#60a5fa',
  },
  chipText: {
    color: '#94a3b8',
    fontWeight: '700',
  },
  activeChipText: {
    color: '#fff',
  },
  swapBtn: {
    alignSelf: 'center',
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultCard: {
    marginTop: 24,
    backgroundColor: '#1e293b',
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3b82f633',
  },
  resultHeader: {
    color: '#3b82f6',
    fontWeight: '800',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
  },
  resultSub: {
    fontSize: 20,
    color: '#64748b',
    fontWeight: '400',
  },
});