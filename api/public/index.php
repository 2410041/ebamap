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
    json_response(['status' => 'ok']);
}

if ($path === '/api/stores') {
    $statement = $pdo->query('SELECT id, name, address, open_time, close_time FROM stores ORDER BY id');
    json_response($statement->fetchAll());
}

if ($path === '/api/products') {
    $keyword = trim((string) ($_GET['keyword'] ?? ''));

    if ($keyword === '') {
        $statement = $pdo->query('
            SELECT id, name, location_label, inventory_status, price
            FROM products
            ORDER BY id
        ');
        json_response($statement->fetchAll());
    }

    $statement = $pdo->prepare('
        SELECT id, name, location_label, inventory_status, price
        FROM products
        WHERE name LIKE :keyword
        ORDER BY id
    ');
    $statement->execute([
        ':keyword' => '%' . $keyword . '%',
    ]);
    json_response($statement->fetchAll());
}

if ($path === '/api/deals') {
    $statement = $pdo->query('
        SELECT
            products.id,
            products.name,
            campaigns.title AS campaign_title,
            campaigns.point_amount,
            products.location_label
        FROM campaigns
        INNER JOIN products ON products.id = campaigns.product_id
        WHERE campaigns.is_active = 1
        ORDER BY campaigns.id
    ');
    json_response($statement->fetchAll());
}

json_response(['error' => 'Not Found'], 404);
