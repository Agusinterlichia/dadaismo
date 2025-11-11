-- Database setup for user authentication
-- Run this SQL in the 'martes' database to create the users table
-- USE martes;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Add an admin user (password is 'admin123')
-- INSERT INTO usuarios (nombre, email, password) 
-- VALUES ('Admin', 'admin@dadaismo.com', '$2y$10$YourHashedPasswordHere');
