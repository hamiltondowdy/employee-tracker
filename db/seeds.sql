INSERT INTO department (name)
VALUES 
    ('Accounting'),
    ('Marketing'),
    ('Development');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Accountant', '100000.00', 1),
    ('Marketer', '60000.00', 2),
    ('Developer', '120000.00', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Smith', 1, 1),
    ('Pat', 'Brown', 2, 2),
    ('Michael', 'Johnson', 3, null);

    

