const mysql = require('mysql2');
const connection = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "thelastwitch6",
        database: "employees_db"
    },
    console.log("connected to the employees_db database")
);

const db = connection.promise()

class dbQueries {
    constructor() { }

    viewDepartments() {
        return db.query('SELECT * FROM departments');
    }

    viewRoles() {
        return db.query('SELECT roles.id, departments.name, roles.title, roles.salary FROM departments JOIN roles ON roles.department_id = departments.id');
    }

    viewEmployees() {
        return db.query('SELECT * FROM employees');
    }

    viewAllEmployees() {
        return db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON departments.id = roles.department_id');
    }

    findRoles() {
        return db.query('SELECT * FROM roles');
    }

    findDepartments() {
        return db.query('SELECT * FROM departments');
    }

    findManagers() {
        return db.query('SELECT employees.id, first_name, last_name FROM employees LEFT JOIN roles ON roles.id = employees.role_id WHERE roles.is_manager = true');
    }

    updateEmployeeRole(response) {
        return db.query(`UPDATE employees SET role_id = ${response.change_role.role_id} WHERE id = ${response.choose_employee.employee_id}`);
    }

    addDepartment(response) {
        return db.query(`INSERT INTO departments (name) VALUES ('${response.deptName}')`);
    }

    addRole(response) {
        return db.query(`INSERT INTO roles (title, salary, department_id, is_manager) VALUES ("${response.title}", ${response.salary}, ${response.department_id.department_id}, ${response.is_manager})`);
    }

    addEmployee(response) {
        return db.query(`INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ('${response.first_name}', '${response.last_name}', ${response.manager_id.employee_id}, ${response.role_id.role_id})`);
    }
}

module.exports = dbQueries;