import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initDB } from './db';
import HomeScreen from './screens/HomeScreen';
import OrdersScreen from './screens/OrdersScreen';
import OrderScreen from './screens/OrderScreen';
import MenuScreen from './screens/MenuScreen';
import StaffScreen from './screens/StaffScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Staff" component={StaffScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
