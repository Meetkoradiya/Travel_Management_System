CREATE DATABASE IF NOT EXISTS travel_admin_db;
USE travel_admin_db;

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default admin user: username 'admin', password 'admin123'
INSERT INTO admin_users (username, password) 
VALUES ('admin', '$2y$10$M9BPl0IDpRXdOu1MoN8nGeTPQhO4eFX6pHQ1tSguBFlGPC1gky0W6');
