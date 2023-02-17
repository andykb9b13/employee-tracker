DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULl
);

CREATE TABLE employee_roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(50) NOT NULL,
    role_id VARCHAR(50) NOT NULL, 
    salary INT NOT NULL,
    department_id INT
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);