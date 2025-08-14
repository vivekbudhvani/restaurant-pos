import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('pos.db');

export function initDB() {
  db.transaction(tx => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      name TEXT,
      price REAL,
      category TEXT,
      available INTEGER DEFAULT 1
    );`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      table_no TEXT,
      status TEXT,
      created_at INTEGER,
      updated_at INTEGER,
      total REAL DEFAULT 0,
      staff_id TEXT
    );`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT,
      item_id TEXT,
      qty INTEGER,
      unit_price REAL,
      note TEXT
    );`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS staff (
      id TEXT PRIMARY KEY,
      name TEXT,
      role TEXT,
      pin TEXT
    );`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      order_id TEXT,
      paid_amount REAL,
      payment_type TEXT,
      created_at INTEGER
    );`);
  });
}

export default db;
