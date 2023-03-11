DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;

USE team_db;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT 
    department_name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (department_id)
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(role_id),
    FOREIGN KEY (department_id)
    REFERENCES department(deparment_id)
    ON DELETE SET NULL   
);

CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT,  
    first_name VARCHAR(30),
    last_name VARCHAR(30), 
    role_id INT,
    manager_id INT, 
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id)
    ON DELETE SET NULL
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

