import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import LengthScreen from '../screens/LengthScreen';
import TemperatureScreen from '../screens/temperatureScreen';
import CurrencyScreen from '../screens/currencyScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/settings';
import TaskScreen from '../screens/TasksScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Length" component={LengthScreen} />
      <Stack.Screen name="Temperature" component={TemperatureScreen} />
      <Stack.Screen name="Currency" component={CurrencyScreen} />
      <Stack.Screen name="Tasks" component={TaskScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0f172a',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarIcon: ({ color, size }) => {
            let icon;

            if (route.name === 'Home') {
              icon = 'home-outline';
            } else if (route.name === 'History') {
              icon = 'time-outline';
            } else if (route.name === 'Settings') {
              icon = 'settings-outline';
            }

            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Tasks" component={TaskScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}