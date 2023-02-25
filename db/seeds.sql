INSERT INTO departments(name)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles (title, salary, department_id, is_manager)
VALUES
("Salesperson", 100000, 1, false),
("Sales Lead", 200000, 1, false),
("Lawyer", 225000, 4, false),
("Legal Team Lead", 250000, 4, false),
("Software Engineer", 100000, 2, false),
("Lead Engineer", 150000, 2, false),
("Account Manager", 160000, 3, true),
("Accountant", 140000, 3, false);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES
("Mila", "Jones", 4, 3),
("Stephanie", "Wilkins", 4, 1),
("Tonya", "Stephens", 4 , 4),
("Viola", "Martin", null, 7),
("Todd", "Bashore", 4, 8),
("Tammy", "Troxler", 4, 2);