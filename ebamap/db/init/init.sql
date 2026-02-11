CREATE DATABASE IF NOT EXISTS ebamap;
USE ebamap;

-- ユーザー（端末単位）
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY 'ユーザーID',
  device_id VARCHAR(255) NOT NULL UNIQUE 'デバイスID',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP '作成日時'
);

-- 店舗（テストは1階固定）
CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY '店舗ID',
  name VARCHAR(255) NOT NULL '店舗名',
  floor INT NOT NULL DEFAULT 1 '階数',
  lat DOUBLE NOT NULL '緯度',
  lng DOUBLE NOT NULL '経度',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP '作成日時'
);

-- カテゴリ
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY 'カテゴリID',
  name VARCHAR(100) NOT NULL UNIQUE 'カテゴリ名'
);

-- 商品（売り場座標あり）
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY '商品ID',
  store_id INT NOT NULL '店舗ID',
  category_id INT 'カテゴリID',
  name VARCHAR(255) NOT NULL '商品名',
  floor INT NOT NULL DEFAULT 1 '階数',
  x DOUBLE NOT NULL 'X座標',
  y DOUBLE NOT NULL 'Y座標',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP '作成日時',
  FOREIGN KEY (store_id) REFERENCES stores(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 検索履歴
CREATE TABLE search_history (
  id INT AUTO_INCREMENT PRIMARY KEY '検索履歴ID',
  user_id INT NOT NULL 'ユーザーID',
  keyword VARCHAR(255) NOT NULL 'キーワード',
  searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP '検索日時',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- お気に入り
CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY 'お気に入りID',
  user_id INT NOT NULL 'ユーザーID',
  product_id INT NOT NULL '商品ID',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP '作成日時',
  UNIQUE(user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 特売・キャンペーン
CREATE TABLE campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY 'キャンペーンID',
  product_id INT NOT NULL '商品ID',
  title VARCHAR(255) 'タイトル',
  description TEXT '説明',
  start_date DATE '開始日',
  end_date DATE '終了日',
  FOREIGN KEY (product_id) REFERENCES products(id)
);
