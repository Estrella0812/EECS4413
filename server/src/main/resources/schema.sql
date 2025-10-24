-- Products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description JSON,
    price DECIMAL(5, 2) UNSIGNED NOT NULL,
    category ENUM(
        'CPU',
        'GPU',
        'PSU',
        'MEMORY',
        'STORAGE',
        'MOTHERBOARD',
        'COOLER',
        'CASE',
        'PERIPHERAL',
    ),
    quantity INT UNSIGNED NOT NULL DEFAULT 0,
    brand_id INT REFERENCES brands(id) ON DELETE CASCADE
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    is_main BIT(1),
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
);