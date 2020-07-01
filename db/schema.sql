drop database if exists emsDB;
create database emsDB;
use emsDB;

create table department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

create table role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    CONSTRAINT fk_department
    FOREIGN KEY (department_id)
        REFERENCES department(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

create table employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    CONSTRAINT fk_role
    FOREIGN KEY (role_id)
        REFERENCES role(id) ON DELETE SET NULL,
    manager_id INT,
    CONSTRAINT fk_manager
    FOREIGN KEY (manager_id)
        REFERENCES employee(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);
