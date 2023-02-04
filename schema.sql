DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;

USE team_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    department_name VARCHAR(30),
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id),
    REFERENCES department(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  
    first_name VARCHAR(30),
    last_name VARCHAR(30), 
    manager_id INT, 
    FOREIGN KEY (role_id)
);

