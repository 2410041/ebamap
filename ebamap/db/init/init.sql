CREATE DATABASE IF NOT EXISTS ebamap;
USE ebamap;

-- ユーザー（端末単位）
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 店舗（テストは1階固定）
CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  floor INT NOT NULL DEFAULT 1,
  lat DOUBLE NOT NULL,
  lng DOUBLE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- カテゴリ
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- 商品（売り場座標あり）
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  store_id INT NOT NULL,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  floor INT NOT NULL DEFAULT 1,
  x DOUBLE NOT NULL,
  y DOUBLE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (store_id) REFERENCES stores(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 検索履歴
CREATE TABLE search_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  keyword VARCHAR(255) NOT NULL,
  searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- お気に入り
CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 特売・キャンペーン
CREATE TABLE campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  title VARCHAR(255),
  description TEXT,
  start_date DATE,
  end_date DATE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 初期データ（テストプレイ用）

-- 店舗（1階固定）
INSERT INTO stores (name, floor, lat, lng)
VALUES ('テストスーパー', 1, 35.0, 135.0);

-- カテゴリ
INSERT INTO categories (name)
VALUES ('飲料'), ('食品'), ('日用品');

-- 商品（1階・売り場座標）
INSERT INTO products (store_id, category_id, name, floor, x, y)
VALUES
  (1, 1, '牛乳', 1, 120, 300),
  (1, 1, 'お茶', 1, 150, 280),
  (1, 2, 'パン', 1, 200, 350),
  (1, 3, '洗剤', 1, 80, 400);