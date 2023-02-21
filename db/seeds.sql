INSERT INTO departments(name)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
("Salesperson", 100000, 1),
("Sales Lead", 200000, 1),
("Lawyer", 225000, 4),
("Legal Team Lead", 250000, 4),
("Software Engineer", 100000, 2),
("Lead Engineer", 150000, 2),
("Account Manager", 160000, 3),
("Accountant", 140000, 3);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES
("Mila", "Jones", 4, 3),
("Stephanie", "Wilkins", 4, 1),
("Tonya", "Stephens", 4 , 4),
("Viola", "Martin", null, 7),
("Todd", "Bashore", 4, 8),
("Tammy", "Troxler", 4, 2);