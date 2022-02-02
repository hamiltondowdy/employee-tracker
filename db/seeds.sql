
USE employees_DB;

----- Department Seeds -----

INSERT INTO department (id, name)
VALUES (1, "Accounting");

INSERT INTO department (id, name)
VALUES (2, "Finance");

INSERT INTO department (id, name)
VALUES (3, "Sales");

INSERT INTO department (id, name)
VALUES (4, "Development");

----- Role Seeds -----

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Junior Salesman", 42000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Assistant to the Regional Manager", 60000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Regional Manager", 75000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Financial Analyst", 65000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Accountant", 70000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Head Accountant", 100000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Senior Developer", 80000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "Junior Developer", 52000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "Development Leader", 105000, 4);

----- Employees Seeds -----

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Floopy Noopers", "Noop", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Hingle", "McKringleberry", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Chaz", "Michael-Michaels", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Charlie", "Kelly", 9, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Frank", "Reynolds", 2, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "David", "Attenbourough", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Zay", "Toven", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Paolo", "Coehlo", 5, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Zach", "Dumbledore", 7, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Martin", "Nash", 8, 10);