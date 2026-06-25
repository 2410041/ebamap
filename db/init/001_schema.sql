CREATE DATABASE IF NOT EXISTS ebamap;
USE ebamap;
SET NAMES utf8mb4;
ALTER DATABASE ebamap CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS stores;

CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  open_time VARCHAR(20) NOT NULL,
  close_time VARCHAR(20) NOT NULL,
  access_note VARCHAR(255) NOT NULL,
  map_label VARCHAR(120) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  store_id INT NOT NULL,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  location_label VARCHAR(255) NOT NULL,
  inventory_status VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  point_target TINYINT(1) NOT NULL DEFAULT 0,
  point_amount INT NOT NULL DEFAULT 0,
  x_percent DECIMAL(5,2) NOT NULL,
  y_percent DECIMAL(5,2) NOT NULL,
  image_tone VARCHAR(20) NOT NULL DEFAULT 'green',
  popularity_rank INT NOT NULL DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_store
    FOREIGN KEY (store_id) REFERENCES stores(id),
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  badge_label VARCHAR(100) NOT NULL,
  effective_price INT NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_campaigns_product
    FOREIGN KEY (product_id) REFERENCES products(id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO stores (name, address, postal_code, phone, open_time, close_time, access_note, map_label)
VALUES
  ('エバグリーン飛鳥店', '奈良県高市郡明日香村御園 5-1', '634-0131', '0744-54-2800', '09:00', '22:00', '飛鳥駅から徒歩約3分', '食品・日用品フロア'),
  ('エバグリーン田原本店', '奈良県磯城郡田原本町千代 766-1', '636-0246', '0744-34-1500', '09:00', '22:00', '近鉄笠縫駅から徒歩約13分', '生活用品フロア');

INSERT INTO categories (name, sort_order)
VALUES
  ('すべて', 0),
  ('乳製品', 1),
  ('パン', 2),
  ('飲料', 3),
  ('日用品', 4),
  ('冷凍食品', 5);

INSERT INTO products (
  store_id, category_id, name, subtitle, location_label, inventory_status, price,
  point_target, point_amount, x_percent, y_percent, image_tone, popularity_rank
)
VALUES
  (1, 2, '低脂肪牛乳', '朝食に人気の1Lサイズ', '乳製品コーナー 3-1', '在庫あり', 220, 1, 50, 24.00, 34.00, 'blue', 1),
  (1, 3, '食パン', '毎朝の定番 6枚切り', 'ベーカリー棚 2-1', '残りわずか', 168, 0, 0, 54.00, 32.00, 'gold', 2),
  (1, 4, '雪印コーヒー', 'ポイント対象の人気飲料', '飲料ケース 4-2', '在庫あり', 198, 1, 40, 73.00, 38.00, 'brown', 3),
  (1, 5, '洗濯洗剤', '大容量 詰め替え', '日用品通路 6-3', '在庫あり', 498, 1, 30, 67.00, 69.00, 'green', 4),
  (1, 6, '冷凍うどん', '5食入り 家族向け', '冷凍食品ケース 5-4', '確認中', 298, 0, 0, 40.00, 74.00, 'teal', 5),
  (2, 2, '成分無調整牛乳', '売れ筋の1Lサイズ', '乳製品コーナー A-2', '在庫あり', 238, 1, 20, 25.00, 36.00, 'blue', 1),
  (2, 4, '麦茶 2L', 'まとめ買いにおすすめ', '飲料コーナー B-4', '在庫なし', 178, 0, 0, 72.00, 41.00, 'brown', 2),
  (2, 5, 'キッチンペーパー', '3パックセット', '日用品コーナー C-1', '在庫あり', 348, 1, 25, 63.00, 66.00, 'green', 3);

INSERT INTO campaigns (product_id, title, description, badge_label, effective_price, is_active)
VALUES
  (1, '今週のポイント対象商品', '牛乳カテゴリの中でもポイント還元率が高い商品です。', '+50pt', 170, 1),
  (3, '本日のおすすめポイント', '飲料売場で人気の高いキャンペーン商品です。', '+40pt', 158, 1),
  (4, '週末まとめ買い応援', '日用品のまとめ買い向けポイント対象商品です。', '+30pt', 468, 1),
  (6, '田原本店限定ポイントアップ', '朝食向け定番商品の期間限定ポイント対象です。', '+20pt', 218, 1),
  (8, '生活応援ポイント企画', 'キッチン周りの日用品をお得に購入できます。', '+25pt', 323, 1);
