-- Insert departments
INSERT INTO
    departments (name)
VALUES
    ('Administration'),
    ('Engineering'),
    ('Customer Service'),
    ('People Experience'),
    ('Legal Team');

-- Insert roles
INSERT INTO
    roles (title, salary, department_id)
VALUES
    ('CEO', 500000, 1),
    ('Director', 350000, 1),
    ('Administrative Assistant', 80000, 1),
    ('Legal Manager', 105000, 5),
    ('Product Manager', 125000, 2),
    ('Support Manager', 96000, 2),
    ('HR', 95000, 3),
    ('Accounting', 115000, 3),
    ('IT', 85000, 3),
    ('Technical Writer', 70000, 3),
    ('Product Support Specialist', 76000, 3),
    ('CSM', 80000, 3),
    ('Account Executive', 70000, 3);

-- Insert employees
INSERT INTO
    employees (
        first_name,
        last_name,
        role_id,
        manager_id,
        is_manager
    )
VALUES
    ('Abbey', 'Copper', 1, NULL, true),
    ('Bailey', 'Guss', 2, 1, false),
    ('Drew', 'Peterson', 3, 2, false),
    ('Kelce', 'Travis', 4, 1, false),
    ('Patrick', 'Mahomes', 5, 4, false),
    ('Chris', 'Jones', 6, 5, false),
    ('Jordan', 'Blake', 7, 1, false),
    ('Sally', 'Ortiz', 8, 7, false),
    ('Jose', 'Ducan', 9, 8, false),
    ('Amber', 'Adams', 10, 1, false),
    ('Peter', 'Rogers', 11, 6, false),
    ('Sophia', 'Erickson', 12, 6, false),
    ('Javi', 'Hernandez', 13, 12, false);

SELECT
    *
FROM
    employees;

-- -- Example: Select all employees who are managers
SELECT
    *
FROM
    employees
WHERE
    is_manager = true;

-- Example: Select all employees and their managers
SELECT
    e.first_name AS employee_name,
    m.first_name AS manager_name
FROM
    employees e
    LEFT JOIN employees m ON e.manager_id = m.id;