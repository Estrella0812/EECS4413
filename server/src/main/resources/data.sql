INSERT IGNORE INTO brands (name) VALUES ('AMD');

INSERT IGNORE INTO products (name, description, price, category, quantity, brand_id)
VALUES (
    'AMD Ryzen™ 7 7800X3D Gaming Processor', 'TEST', 359.00, 'CPU', 10, 1
    );

INSERT IGNORE INTO images (is_main, url, alt_text, product_id)
VALUES (1, '7800x3d.jpg', 'computer processor', 1);