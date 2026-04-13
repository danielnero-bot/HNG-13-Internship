import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'conversions_history';

export type Conversion = {
  id: string;
  type: 'length' | 'currency' | 'temperature';
  from: string;
  to: string;
  fromValue: string;
  toValue: string;
  timestamp: string;
};

export const saveConversion = async (conversion: Omit<Conversion, 'id' | 'timestamp'>) => {
  try {
    const history = await getHistory();
    const newEntry: Conversion = {
      ...conversion,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep last 50
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (e) {
    console.error('Error saving conversion', e);
  }
};

export const getHistory = async (): Promise<Conversion[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(HISTORY_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error getting history', e);
    return [];
  }
};

export const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Error clearing history', e);
  }
};
