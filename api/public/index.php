<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/config/db.php';
require_once __DIR__ . '/../src/lib/json.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$pdo = create_pdo();
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';

if ($path === '/api/health') {
    json_response([
        'status' => 'ok',
        'timestamp' => date(DATE_ATOM),
        'syncMode' => 'polling-10s',
    ]);
}

if ($path === '/api/stores') {
    $statement = $pdo->query('
        SELECT id, name, address, postal_code, phone, open_time, close_time, access_note, map_label
        FROM stores
        ORDER BY id
    ');
    json_response($statement->fetchAll());
}

if ($path === '/api/categories') {
    $statement = $pdo->query('
        SELECT id, name
        FROM categories
        WHERE name <> \'すべて\'
        ORDER BY sort_order, id
    ');
    json_response($statement->fetchAll());
}

if ($path === '/api/products') {
    $storeId = (int) ($_GET['store_id'] ?? 0);
    $keyword = trim((string) ($_GET['keyword'] ?? ''));
    $categoryId = (int) ($_GET['category_id'] ?? 0);

    if ($storeId <= 0) {
        json_response(['error' => 'store_id is required'], 400);
    }

    $statement = $pdo->prepare('
        SELECT
            products.id,
            products.store_id,
            products.name,
            products.subtitle,
            categories.name AS category_name,
            products.location_label,
            products.inventory_status,
            products.price,
            products.point_target,
            products.point_amount,
            products.x_percent,
            products.y_percent,
            products.image_tone,
            products.popularity_rank
        FROM products
        INNER JOIN categories ON categories.id = products.category_id
        WHERE products.store_id = :store_id
          AND (:keyword = \'\' OR products.name LIKE :keyword_like)
          AND (:category_id = 0 OR products.category_id = :category_id)
        ORDER BY products.popularity_rank, products.id
    ');
    $statement->execute([
        ':store_id' => $storeId,
        ':keyword' => $keyword,
        ':keyword_like' => '%' . $keyword . '%',
        ':category_id' => $categoryId,
    ]);
    json_response($statement->fetchAll());
}

if ($path === '/api/deals') {
    $storeId = (int) ($_GET['store_id'] ?? 0);

    if ($storeId <= 0) {
        json_response(['error' => 'store_id is required'], 400);
    }

    $statement = $pdo->prepare('
        SELECT
            products.id,
            products.name,
            products.subtitle,
            products.location_label,
            products.inventory_status,
            products.price,
            products.point_amount,
            campaigns.title AS campaign_title,
            campaigns.description AS campaign_description,
            campaigns.badge_label,
            campaigns.effective_price
        FROM campaigns
        INNER JOIN products ON products.id = campaigns.product_id
        WHERE products.store_id = :store_id
          AND campaigns.is_active = 1
        ORDER BY products.point_amount DESC, products.id
    ');
    $statement->execute([
        ':store_id' => $storeId,
    ]);
    json_response($statement->fetchAll());
}

if ($path === '/api/recommended') {
    $storeId = (int) ($_GET['store_id'] ?? 0);

    if ($storeId <= 0) {
        json_response(['error' => 'store_id is required'], 400);
    }

    $statement = $pdo->prepare('
        SELECT
            products.id,
            products.name,
            products.subtitle,
            categories.name AS category_name,
            products.location_label,
            products.inventory_status,
            products.price,
            products.point_target,
            products.point_amount,
            products.x_percent,
            products.y_percent,
            products.image_tone,
            products.popularity_rank
        FROM products
        INNER JOIN categories ON categories.id = products.category_id
        WHERE products.store_id = :store_id
        ORDER BY products.popularity_rank, products.id
        LIMIT 4
    ');
    $statement->execute([
        ':store_id' => $storeId,
    ]);
    json_response($statement->fetchAll());
}

if ($path === '/api/bootstrap') {
    $storeId = (int) ($_GET['store_id'] ?? 0);

    if ($storeId <= 0) {
        json_response(['error' => 'store_id is required'], 400);
    }

    $storeStatement = $pdo->prepare('
        SELECT id, name, address, postal_code, phone, open_time, close_time, access_note, map_label
        FROM stores
        WHERE id = :store_id
    ');
    $storeStatement->execute([
        ':store_id' => $storeId,
    ]);
    $store = $storeStatement->fetch();

    if (!$store) {
        json_response(['error' => 'Store not found'], 404);
    }

    $categoriesStatement = $pdo->query('
        SELECT id, name
        FROM categories
        WHERE name <> \'すべて\'
        ORDER BY sort_order, id
    ');

    $recommendedStatement = $pdo->prepare('
        SELECT
            products.id,
            products.store_id,
            products.name,
            products.subtitle,
            categories.name AS category_name,
            products.location_label,
            products.inventory_status,
            products.price,
            products.point_target,
            products.point_amount,
            products.x_percent,
            products.y_percent,
            products.image_tone,
            products.popularity_rank
        FROM products
        INNER JOIN categories ON categories.id = products.category_id
        WHERE products.store_id = :store_id
        ORDER BY products.popularity_rank, products.id
        LIMIT 4
    ');
    $recommendedStatement->execute([
        ':store_id' => $storeId,
    ]);

    $dealsStatement = $pdo->prepare('
        SELECT
            products.id,
            products.name,
            products.subtitle,
            products.location_label,
            products.inventory_status,
            products.price,
            products.point_amount,
            campaigns.title AS campaign_title,
            campaigns.description AS campaign_description,
            campaigns.badge_label,
            campaigns.effective_price
        FROM campaigns
        INNER JOIN products ON products.id = campaigns.product_id
        WHERE campaigns.is_active = 1
          AND products.store_id = :store_id
        ORDER BY products.point_amount DESC, products.id
    ');
    $dealsStatement->execute([
        ':store_id' => $storeId,
    ]);

    json_response([
        'store' => $store,
        'categories' => $categoriesStatement->fetchAll(),
        'recommendedProducts' => $recommendedStatement->fetchAll(),
        'deals' => $dealsStatement->fetchAll(),
        'syncIntervalSeconds' => 10,
    ]);
}

json_response(['error' => 'Not Found'], 404);
