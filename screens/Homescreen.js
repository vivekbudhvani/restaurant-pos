import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Restaurant POS
      </Text>
      <Button title="Open Orders" onPress={() => navigation.navigate('Orders')} />
      <View style={{ height: 10 }} />
      <Button title="Menu" onPress={() => navigation.navigate('Menu')} />
      <View style={{ height: 10 }} />
      <Button title="Staff" onPress={() => navigation.navigate('Staff')} />
    </View>
  );
}
