-- Drop the database if it exists
DROP DATABASE IF EXISTS employee_tracker;

-- Create the database
CREATE DATABASE employee_tracker;

-- Connect to the newly created database
\c employee_tracker;

-- Create the departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Create the 'roles' table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE
);

-- Create the 'employees' table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    is_manager BOOLEAN NOT NULL
);
