CREATE DATABASE IF NOT EXISTS ebamap;
USE ebamap;

CREATE TABLE IF NOT EXISTS stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  open_time VARCHAR(20) NOT NULL,
  close_time VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  store_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  category_name VARCHAR(100) NOT NULL,
  location_label VARCHAR(255) NOT NULL,
  inventory_status VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  point_target TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_store
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  point_amount INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_campaigns_product
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO stores (name, address, open_time, close_time)
VALUES
  ('エバグリーン飛鳥店', '奈良県高市郡明日香村御園 5-1', '09:00', '22:00'),
  ('エバグリーン田原本店', '奈良県磯城郡田原本町千代 766-1', '09:00', '22:00');

INSERT INTO products (store_id, name, category_name, location_label, inventory_status, price, point_target)
VALUES
  (1, '低脂肪牛乳', '乳製品', '売場 3-1F', '在庫あり', 220, 1),
  (1, '食パン', 'パン', '売場 2-1F', '残りわずか', 168, 0),
  (2, '洗剤', '日用品', '売場 5-1F', '在庫あり', 498, 1);

INSERT INTO campaigns (product_id, title, point_amount, is_active)
VALUES
  (1, '今週のポイント対象商品', 50, 1),
  (3, '週末ポイントアップ', 30, 1);
