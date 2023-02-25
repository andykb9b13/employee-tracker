INSERT INTO departments(name)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles (title, salary, department_id, is_manager)
VALUES
("Salesperson", 100000, 1, false),
("Sales Lead", 200000, 1, true),
("Lawyer", 225000, 4, false),
("Legal Team Lead", 250000, 4, true),
("Software Engineer", 100000, 2, false),
("Lead Engineer", 150000, 2, true),
("Accountant", 140000, 3, false),
("Account Manager", 160000, 3, true);


INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES
("Stephanie", "Wilkins", 2, 1),
("Tammy", "Troxler", null, 2),
("Mila", "Jones", 4, 3),
("Tonya", "Stephens", null, 4),
("Leah", "Traynor", 6, 5),
("Andy", "Fox", null, 6),
("Viola", "Martin", 8, 7),
("Todd", "Bashore", null, 8);
