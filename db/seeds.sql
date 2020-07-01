-- ------------------------
-- POPULATE DB
-- ------------------------

USE emsDB;
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Legal');

USE emsDB;
SELECT * FROM department;

USE emsDB;
INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', '100000', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', '80000', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', '150000', '2');
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', '120000', '2');
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', '125000', '3');
INSERT INTO role (title, salary, department_id) VALUES ('Legal Team Lead', '250000', '4');
INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', '190000', '4');

USE emsDB;
SELECT * FROM role;
USE emsDB;
SELECT title
    FROM role
    ORDER BY department_id ASC, title ASC;

USE emsDB;
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ashley', 'Rodriguez', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Chan', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kevin', 'Tupik', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Malia', 'Brown', 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Lourd', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Tom', 'Allen', 7, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Christian', 'Eckenrode', 3, 3);

USE emsDB;
SELECT * FROM employee;

-- ------------------------
-- VIEW DATA
-- ------------------------

-- viewAllEmployees
USE emsDB;
SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', d.name AS 'Department', r.title, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee e
        LEFT JOIN employee m ON m.id = e.manager_id
        LEFT JOIN Role r ON e.role_id = r.id
        LEFT JOIN Department d ON d.id = r.department_id
    ORDER BY e.id ASC;

-- viewAllEmployeesByDepartment
USE emsDB;
SELECT d.name, CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee e
        LEFT JOIN employee m ON m.id = e.manager_id
        JOIN Role r ON e.role_id = r.id
        JOIN Department d ON d.id = r.department_id
    ORDER BY d.name ASC;

-- viewAllEmployeesByManager
USE emsDB;
SELECT IFNULL(CONCAT(m.first_name, ' ', m.last_name), '') AS 'Manager', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', d.name, r.title, d.name, r.salary
    FROM employee e
        LEFT JOIN employee m ON m.id = e.manager_id
        JOIN Role r ON e.role_id = r.id
        JOIN Department d ON d.id = r.department_id
    ORDER BY m.first_name ASC;

-- viewDepartments
USE emsDB;
SELECT name AS 'Department Name'
        FROM department
        ORDER BY name ASC;

-- viewDepartmentBudgets
USE emsDB;
SELECT department_id, SUM(salary)
    FROM role
    GROUP BY department_id;

USE emsDB;
SELECT department_id, salary
    FROM role;

USE emsDB;
SELECT e.id AS 'Employee ID', d.name AS 'Department', d.id AS 'Department ID', r.title AS 'Title', r.salary AS 'Salary'
    FROM employee e
        JOIN Role r ON e.role_id = r.id
        JOIN Department d ON d.id = r.department_id
    ORDER BY d.id ASC;

USE emsDB;
select role_id from employee;

USE emsDB;
SELECT d.name AS 'Department', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', r.title, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee e
        LEFT JOIN employee m ON m.id = e.manager_id
        JOIN Role r ON e.role_id = r.id
        JOIN Department d ON d.id = r.department_id
    ORDER BY d.name ASC;

USE emsDB;
SELECT role_id, COUNT(role_id)
    FROM employee
    GROUP BY role_id
    HAVING COUNT(role_id) > 0;


SELECT
    email,
    COUNT(email)
FROM
    contacts
GROUP BY email
HAVING COUNT(email) > 1;

-- ------------------------
-- UPDATE QUERIES
-- ------------------------

USE emsDB;
UPDATE employee e
    SET
        e.role_id = ?
    WHERE
        e.id = ?;

USE emsdb; SELECT * FROM employee WHERE id = 12;

USE emsDB;
UPDATE employee e
    SET
        e.manager_id = ?
    WHERE
        e.id = ?;

USE emsdb; SELECT * FROM employee WHERE id = 12;


-- ------------------------
-- UTILITY QUERIES
-- ------------------------

-- queries for addEmployee()
USE emsDB;
SELECT e.id, e.first_name, e.last_name
    FROM employee e
    ORDER BY e.first_name ASC;

USE emsDB;
SELECT r.id, r.title
    FROM role r
    ORDER BY r.title ASC;

-- queries for addDepartment()
USE emsDB;
SELECT d.id, d.name
        FROM department d
        ORDER BY d.name ASC;

-- removeEmployee
USE emsDB;
-- DELETE FROM employee where id = ?;


-- updateEmployeeRole

-- updateEmployeeManager

-- viewAllRoles

-- addRole

-- removeRole


-- ------------------------
-- REMOVE QUERIES
-- ------------------------

-- queries for addEmployee()
USE emsDB;

-- USE emsDB;
-- DELETE FROM role where id = 3;
-- DELETE FROM role where id = 9;

use emsDB; select * from role;
use emsdb; select * from employee;
use emsdb; select * from department;
-- use emsDB; DELETE FROM role where id = 9;
-- use emsDB; DELETE FROM department where id = 6;
use emsDB; select * from role;
use emsdb; select * from employee;
use emsdb; select * from department;




-- ------------------------
-- SCRATCH
-- ------------------------

-- USE emsDB;
-- SELECT * FROM employee;
-- SELECT * FROM role;
-- SELECT * FROM department;

-- USE emsDB;SELECT r.title, d.name, r.salary FROM role AS r, department AS d WHERE r.department_id = d.id;
-- USE emsDB;SELECT e.first_name, e.last_name, r.title FROM employee AS e, role AS r WHERE e.role_id = r.id;

-- select everything but manager
-- USE emsDB;
-- SELECT CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', r.title, d.name, r.salary
--     FROM role AS r, department AS d, employee AS e
--     WHERE r.department_id = d.id AND e.role_id = r.id;

-- select manager, employee
-- USE emsDB;
-- SELECT IFNULL(m.first_name, 'self') AS 'MANAGER', CONCAT(e.first_name, ' ', e.last_name) AS 'EMPLOYEE'
--     FROM employee e
--     LEFT JOIN employee m ON m.id = e.manager_id;

-- select depart info
-- USE emsDB;
-- SELECT role.department_id, department.name FROM role, department WHERE role.department_id = department.id;


-- ------------------------
-- RAW DATA FOR REFERENCE
-- ------------------------

-- beginning of überquery
-- SELECT e.first_name, e.last_name, r.title, d.name, r.salary, e.manager_id FROM employee as e, role as r, department as d WHERE

-- ALL EMPLOYEES >> this is the goal table output from console.table
-- 2 John, Doe, Sales Lead, Sales, 100000, Ashley Rodriguez
-- 3 Mike, Chan, Salesperson, Sales, 80000, John Doe
-- 1 Ashley, Rodriguez, Lead Engineer, Engineering, 150000, null
-- 4 Kevin, Tupik, Software Engineer, Engineering, 120000, Ashley Rodriguez
-- 5 Malia, Brown, Accountant, Finance, 125000, null
-- 6 Sarah, Lourd, Legal Team Lead, Legal, 250000, null
-- 7 Tom, Allen, Lawyer, Legal, 190000, Sarah Lourd
-- 8 Christian, Eckenrode, Lead Engineer, Engineering, 150000, Mike Chan

-- DEPARTMENT
-- 1 Sales
-- 2 Engineering
-- 3 Finance
-- 4 Legal

-- ROLE
-- 1 Sales Lead
-- 2 Salesperson
-- 3 Lead Engineer
-- 4 Software Engineer
-- 5 Accountant
-- 6 Legal Team Lead
-- 7 Lawyer

-- EMPLOYEE
-- 1 Ashley, Rodriguez
-- 2 John, Doe
-- 3 Mike, Chan
-- 4 Kevin, Tupik
-- 5 Malia, Brown
-- 6 Sarah, Lourd
-- 7 Tom, Allen
-- 8 Christian, Eckenrode

-- USE emsDB;
-- UPDATE role r
--     SET
--         r.title = 'Chief Data Scientist'
--     WHERE
--         r.id = 12;

-- USE emsdb; SELECT * FROM role;

USE emsdb;
SELECT r.id, r.title
            FROM role r
            ORDER BY r.title ASC;
