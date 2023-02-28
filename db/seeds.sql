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

("Tammy", "Troxler", null, 1),
("Stephanie", "Wilkins", 1, 2),
("Tonya", "Stephens", null, 3),
("Mila", "Jones", 3, 4),
("Andy", "Fox", null, 5),
("Leah", "Traynor", 5, 6),
("Todd", "Bashore", null, 7),
("Viola", "Martin", 7, 8);

