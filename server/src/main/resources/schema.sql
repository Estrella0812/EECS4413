-- Products
CREATE TABLE IF NOT EXISTS products (
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
    quantity INT UNSIGNED NOT NULL DEFAULT 0
);

-- Images
CREATE TABLE IF NOT EXISTS images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    is_main BIT(1),
    url TEXT NOT NULL,
    alt_text VARCHAR(255),

    -- define the column
    product_id BIGINT UNSIGNED NOT NULL,

    -- then the foreign key
    CONSTRAINT fk_images_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);
