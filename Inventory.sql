CREATE TABLE warehouses (
id INT PRIMARY KEY,
warehouse_name VARCHAR(255) NOT NULL,
province VARCHAR(255) NOT NULL,
city VARCHAR(255) NOT NULL,
district VARCHAR(255) NOT NULL,
street VARCHAR(255) NOT NULL,
add_number VARCHAR(10) NOT NULL,
area_volume INT NOT NULL
) ENGINE = InnoDB;

CREATE TABLE products (
id INT PRIMARY KEY,
product_name VARCHAR(255) NOT NULL,
warehouse_id int,
foreign key (warehouse_id) references warehouses(id)
) ENGINE = InnoDB;

INSERT INTO products (id, product_name, warehouse_id)
VALUES (30, 'Iphone', 1);

-- Create warehouse
INSERT INTO warehouses (id, warehouse_name, province, city, district, street, add_number, area_volume)
VALUES (1, 'Warehouse 1', 'Thu Duc', 'Ho Chi Minh', 'Thu Duc', 'Street 1', '203', 1000);

ALTER TABLE warehouses;
INSERT INTO warehouses (id, warehouse_name, province, city, district, street, add_number, area_volume)
VALUES (2, 'Warehouse 2', 'Quan 2', 'Ho Chi Minh', 'Quan 2', 'Street 12', '22', 1000);

-- Read warehouse
SELECT * FROM warehouses WHERE warehouse_name = 'Warehouse 23';

-- Update warehouse
UPDATE warehouses
SET warehouse_name = 'Warehouse 23', area_volume = 1500.00
WHERE id = 1;

-- Delete warehouse with transaction ensure
DELIMITER $$
CREATE PROCEDURE transaction()
BEGIN
START TRANSACTION;
-- Check if there are any products in the warehouse
SELECT COUNT(*) INTO @product_count FROM products WHERE warehouse_id = 1;
IF @product_count > 0 THEN
-- Products exist in the warehouse, rollback the transaction
ROLLBACK;
SELECT 'Cannot delete this warehouse as it contains products.' AS message;
ELSE
-- Move products 
UPDATE products SET warehouse_id = 2 WHERE warehouse_id = 1;
-- Delete the warehouse
DELETE FROM warehouses WHERE id = 1;
COMMIT;
SELECT 'Warehouse deleted successfully.' AS message;
END IF;
END $$
DELIMITER ;