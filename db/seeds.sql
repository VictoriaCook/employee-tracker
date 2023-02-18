USE team_db;

INSERT INTO departments
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal');

INSERT INTO roles
VALUES (1, 'Sales Lead', 100000, 1),
       (2, 'Salesperson', 80000, 1),
       (3, 'Lead Engineer', 200000, 2),
       (4, 'Software Engineer', 180000, 2),
       (5, 'Account Manager', 160000, 3),
       (6, 'Accountant', 125000, 3),
       (7, 'Legal Team Lead', 135000, 4),
       (8, 'Lawyer', 120000, 4);

INSERT INTO employees
VALUES (1, 'John', 'Doe', 1, null),
        (2, 'Mike', 'Chan', 2, 1),
        (3, 'Ashley', 'Rodriguez', 3, null),
        (4, 'Kevin', 'Tupik', 4, 3),
        (5, 'Kunal', 'Singh', 5, null),
        (6, 'Malia', 'Brown', 6, 5),
        (7, 'Sarah', 'Lourd', 7, null),
        (8, 'Tom', 'Allen', 8, 7);

SELECT * FROM roles;