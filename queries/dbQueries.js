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
        return db.query(
            `SELECT id AS Id, name AS Department
            FROM departments`);
    }

    viewRoles() {
        return db.query(
            `SELECT roles.id AS Id, departments.name AS Department, roles.title AS Role, roles.salary AS Salary 
            FROM departments 
            JOIN roles 
            ON roles.department_id = departments.id`);
    }

    viewEmployees() {
        return db.query(
            `SELECT * FROM employees`);
    }

    viewAllEmployees() {
        return db.query(
            `SELECT employees.id AS Id, first_name AS First, last_name AS Last, roles.title AS Role, departments.name AS Department, roles.salary AS Salary, manager_id AS ManagerId
            FROM employees
            JOIN roles ON employees.role_id = roles.id 
            JOIN departments ON departments.id = roles.department_id
            ORDER BY employees.id`);
    }

    findRoles() {
        return db.query(
            `SELECT * FROM roles`);
    }

    findDepartments() {
        return db.query(
            `SELECT * FROM departments`);
    }

    findManagers() {
        return db.query(
            `SELECT employees.id, first_name, last_name 
            FROM employees 
            LEFT JOIN roles ON roles.id = employees.role_id 
            WHERE roles.is_manager = true`);
    }

    updateEmployeeRole(response) {
        return db.query(
            `UPDATE employees 
            SET role_id = ${response.change_role.role_id} 
            WHERE id = ${response.choose_employee.employee_id}`);
    }

    addDepartment(response) {
        return db.query(
            `INSERT INTO departments (name) 
            VALUES ('${response.deptName}')`);
    }

    addRole(response) {
        return db.query(
            `INSERT INTO roles (title, salary, department_id, is_manager) 
            VALUES ("${response.title}", ${response.salary}, ${response.department_id.department_id}, ${response.is_manager})`);
    }

    addEmployee(response) {
        return db.query(
            `INSERT INTO employees (first_name, last_name, manager_id, role_id) 
            VALUES ('${response.first_name}', '${response.last_name}', ${response.manager_id.employee_id}, ${response.role_id.role_id})`);
    }

    deleteEmployee(response) {
        return db.query(
            `DELETE FROM employees 
            WHERE id = ${response.employeeDelete.employee_id}`)
    }

    deleteRole(response) {
        return db.query(
            `DELETE FROM roles 
            WHERE id = ${response.roleDelete.role_id}`)
    }

    deleteDepartment(response) {
        return db.query(
            `DELETE FROM departments 
            WHERE id = ${response.deptDelete.department_id}`)
    }

    viewBudget(response) {
        return db.query(
            `SELECT SUM(salary) AS ${response.deptChoice.department_name} 
            FROM roles
            JOIN employees ON roles.id = employees.role_id 
            JOIN departments ON roles.department_id = departments.id 
            WHERE departments.id = ${response.deptChoice.department_id}`)
    }
}

module.exports = dbQueries;