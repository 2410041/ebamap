CREATE DATABASE IF NOT EXISTS ebamap;
USE ebamap;

CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  lat DOUBLE,
  lng DOUBLE
);

INSERT INTO stores (name, lat, lng)
VALUES ('Test Store', 35.0, 135.0);