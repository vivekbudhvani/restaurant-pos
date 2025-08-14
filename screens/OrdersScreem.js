import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import db from '../db';
import uuid from 'react-native-uuid';

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  function fetchOrders() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM orders ORDER BY created_at DESC;', [], (_, { rows }) => {
        setOrders(rows._array);
      });
    });
  }

  function createOrder() {
    const id = uuid.v4();
    const now = Date.now();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO orders (id, status, created_at, updated_at) VALUES (?, ?, ?, ?);',
        [id, 'open', now, now],
        () => navigation.navigate('Order', { orderId: id })
      );
    });
  }

  useEffect(() => {
    const unsub = navigation.addListener('focus', fetchOrders);
    fetchOrders();
    return unsub;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Button title="New Order" onPress={createOrder} />
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Order', { orderId: item.id })}
            style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ddd' }}
          >
            <Text style={{ fontWeight: 'bold' }}>Order {item.id.slice(0, 6)}</Text>
            <Text>Status: {item.status} | Total: ₹{item.total || 0}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
