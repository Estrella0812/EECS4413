-- Products
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) UNSIGNED NOT NULL,
    category ENUM(
        'CPU', 'GPU', 'PSU', 'MEMORY', 'STORAGE',
        'MOTHERBOARD', 'COOLER', 'CASE', 'PERIPHERAL'
    ) NOT NULL,
    brand ENUM(
        'AMD', 'Intel', 'NVIDIA', 'ASUS', 'MSI', 'Corsair',
        'Samsung', 'Kingston', 'EVGA', 'CoolerMaster'
    ) NOT NULL,
    stock INT UNSIGNED NOT NULL DEFAULT 5
);

-- Images
CREATE TABLE images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    is_main BIT(1),
    url TEXT NOT NULL,
    alt_text VARCHAR(255),

    product_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_images_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_product_main ON images (product_id, is_main);

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE carts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT fk_carts_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE cart_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    cart_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NULL,
    CONSTRAINT fk_cart_items_cart
        FOREIGN KEY (cart_id)
        REFERENCES carts(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_cart_items_products
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE SET NULL
);

CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,
    total DECIMAL(10, 2) NOT NULL,

    stripe_payment_intent_id VARCHAR(255) NOT NULL UNIQUE,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,

    quantity INT NOT NULL,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
);