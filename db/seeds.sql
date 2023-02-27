INSERT INTO departments(name)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles (title, salary, department_id, is_manager)
VALUES
("Sales Lead", 200000, 1, true),
("Salesperson", 100000, 1, false),
("Legal Team Lead", 250000, 4, true),
("Lawyer", 225000, 4, false),
("Lead Engineer", 150000, 2, true),
("Software Engineer", 100000, 2, false),
("Account Manager", 160000, 3, true),
("Accountant", 140000, 3, false);



INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES

("Tammy", "Troxler", null, 2),
("Stephanie", "Wilkins", 2, 1),
("Tonya", "Stephens", null, 4),
("Mila", "Jones", 4, 3),
("Andy", "Fox", null, 6),
("Leah", "Traynor", 6, 5),
("Todd", "Bashore", null, 8),
("Viola", "Martin", 8, 7);

