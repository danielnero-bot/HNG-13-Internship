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
  { label: 'Celsius', value: '°C' },
  { label: 'Fahrenheit', value: '°F' },
  { label: 'Kelvin', value: 'K' },
];

export default function TemperatureScreen() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('°C');
  const [to, setTo] = useState('°F');
  const [result, setResult] = useState<number | null>(null);

  const convertTemperature = () => {
    if (!value) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const val = parseFloat(value);
    let celsius: number;

    // Convert to Celsius first
    switch (from) {
      case '°F':
        celsius = (val - 32) * (5 / 9);
        break;
      case 'K':
        celsius = val - 273.15;
        break;
      default:
        celsius = val;
    }

    // Convert to target
    let final: number;
    switch (to) {
      case '°F':
        final = (celsius * 9) / 5 + 32;
        break;
      case 'K':
        final = celsius + 273.15;
        break;
      default:
        final = celsius;
    }

    setResult(final);
    saveConversion({
      type: 'temperature',
      from,
      to,
      fromValue: value,
      toValue: final.toFixed(2),
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
          <Text style={styles.title}>Temperature</Text>
          <Text style={styles.subtitle}>Precision conversion</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Input Value</Text>
          <TextInput
            placeholder="0.00"
            placeholderTextColor="#64748b"
            style={styles.input}
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />

          <View style={styles.unitRow}>
            <View style={styles.unitSelector}>
              <Text style={styles.unitLabel}>From</Text>
              <View style={styles.picker}>
                {units.map((u) => (
                  <TouchableOpacity
                    key={u.value}
                    style={[styles.chip, from === u.value && styles.activeChip]}
                    onPress={() => setFrom(u.value)}
                  >
                    <Text style={[styles.chipText, from === u.value && styles.activeChipText]}>
                      {u.value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.swapBtn} onPress={swapUnits}>
              <Ionicons name="swap-horizontal" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.unitSelector}>
              <Text style={styles.unitLabel}>To</Text>
              <View style={styles.picker}>
                {units.map((u) => (
                  <TouchableOpacity
                    key={u.value}
                    style={[styles.chip, to === u.value && styles.activeChip]}
                    onPress={() => setTo(u.value)}
                  >
                    <Text style={[styles.chipText, to === u.value && styles.activeChipText]}>
                      {u.value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={convertTemperature}>
            <Text style={styles.buttonText}>Convert Now</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {result !== null && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Result</Text>
            <Text style={styles.resultValue}>
              {result.toFixed(2)}
              <Text style={styles.resultUnit}>{to}</Text>
            </Text>
            <Text style={styles.resultFormula}>
              {value}{from} is exactly {result.toFixed(4)}{to}
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
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1e293b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  label: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  unitSelector: {
    flex: 1,
  },
  unitLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#1e293b',
  },
  activeChip: {
    backgroundColor: '#3b82f6',
  },
  chipText: {
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  activeChipText: {
    color: '#fff',
  },
  swapBtn: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 50,
    marginHorizontal: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultCard: {
    marginTop: 24,
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3b82f644',
  },
  resultLabel: {
    color: '#3b82f6',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
    marginBottom: 8,
  },
  resultValue: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '900',
  },
  resultUnit: {
    fontSize: 24,
    color: '#94a3b8',
    fontWeight: '400',
  },
  resultFormula: {
    color: '#64748b',
    marginTop: 12,
    fontSize: 14,
  },
});
