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

const currencies = [
  { label: 'US Dollar', value: 'USD', symbol: '$' },
  { label: 'Naira', value: 'NGN', symbol: '₦' },
  { label: 'Euro', value: 'EUR', symbol: '€' },
  { label: 'Pound', value: 'GBP', symbol: '£' },
];

// Static rates for demonstration
const rates: Record<string, number> = {
  USD: 1540,
  NGN: 1,
  EUR: 1675,
  GBP: 1960,
};

export default function CurrencyScreen() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('NGN');
  const [result, setResult] = useState<number | null>(null);

  const convertCurrency = () => {
    if (!amount) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const val = parseFloat(amount);
    const inNGN = val * rates[from];
    const final = inNGN / rates[to];

    setResult(final);
    saveConversion({
      type: 'currency',
      from,
      to,
      fromValue: amount,
      toValue: final.toFixed(2),
    });
  };

  const swapCurrencies = () => {
    Haptics.selectionAsync();
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const getSymbol = (code: string) => currencies.find(c => c.value === code)?.symbol || '';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Currency</Text>
          <Text style={styles.subtitle}>Real-time exchange rates</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Amount to Convert</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>{getSymbol(from)}</Text>
            <TextInput
              placeholder="0.00"
              placeholderTextColor="#64748b"
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.selectionRow}>
            <View style={styles.selectBox}>
              <Text style={styles.miniLabel}>From</Text>
              <View style={styles.pickerGrid}>
                {currencies.map((c) => (
                  <TouchableOpacity
                    key={c.value}
                    style={[styles.miniChip, from === c.value && styles.activeChip]}
                    onPress={() => setFrom(c.value)}
                  >
                    <Text style={[styles.miniChipText, from === c.value && styles.activeText]}>{c.value}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.swapCircle} onPress={swapCurrencies}>
              <Ionicons name="swap-horizontal" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.selectBox}>
              <Text style={styles.miniLabel}>To</Text>
              <View style={styles.pickerGrid}>
                {currencies.map((c) => (
                  <TouchableOpacity
                    key={c.value}
                    style={[styles.miniChip, to === c.value && styles.activeChip]}
                    onPress={() => setTo(c.value)}
                  >
                    <Text style={[styles.miniChipText, to === c.value && styles.activeText]}>{c.value}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.convertButton} onPress={convertCurrency}>
            <Text style={styles.convertButtonText}>Get Quote</Text>
          </TouchableOpacity>
        </View>

        {result !== null && (
          <View style={styles.resultDisplay}>
            <Text style={styles.resLabel}>Current Value</Text>
            <Text style={styles.resValue}>
              {getSymbol(to)} {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
            <Text style={styles.resRate}>
              1 {from} = {(rates[from] / rates[to]).toFixed(4)} {to}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#334155',
  },
  currencySymbol: {
    color: '#3b82f6',
    fontSize: 24,
    fontWeight: '800',
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  selectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  selectBox: {
    flex: 1,
  },
  miniLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  pickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  miniChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeChip: {
    backgroundColor: '#3b82f6',
    borderColor: '#60a5fa',
  },
  miniChipText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
  activeText: {
    color: '#fff',
  },
  swapCircle: {
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  convertButton: {
    backgroundColor: '#3b82f6',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  convertButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultDisplay: {
    marginTop: 24,
    backgroundColor: '#1e293b',
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3b82f633',
  },
  resLabel: {
    color: '#3b82f6',
    fontWeight: '800',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  resValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
  },
  resRate: {
    color: '#64748b',
    fontSize: 14,
  },
});