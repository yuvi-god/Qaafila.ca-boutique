import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './src/screens/HomeScreen';
import { CartScreen } from './src/screens/CartScreen';
import { QRScannerScreen } from './src/screens/QRScannerScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="QRScanner" component={QRScannerScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: '#FF6B6B',
          tabBarInactiveTintColor: '#999',
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStackNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🏠</Text>,
          }}
        />
        <Tab.Screen 
          name="Scanner" 
          component={QRScannerScreen}
          options={{
            tabBarLabel: 'Scan',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📱</Text>,
          }}
        />
        <Tab.Screen 
          name="Cart" 
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🛒</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
