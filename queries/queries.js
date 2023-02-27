const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table')
const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "thelastwitch6",
        database: "employees_db"
    },
    console.log("connected to the employees_db database")
);

let roleArray = [];
let departmentArray = [];
let managerArray = [];
let employeeArray = [];

class Queries {
    constructor() { }

    initiateProgram() {
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "What would you like to do?",
                    name: "select",
                    choices: ["View All Departments", "View All Employees", "View All Roles", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Quit"]
                }
            ])
            .then((response) => {
                switch (response.select) {
                    case "View All Departments":
                        this.viewDepartments();
                        break;
                    case "View All Employees":
                        this.viewEmployees();
                        break;
                    case "View All Roles":
                        this.viewRoles();
                        break;
                    case "Add a Department":
                        this.addDepartment();
                        break;
                    case "Add a Role":
                        this.addRole();
                        break;
                    case "Add an Employee":
                        this.addEmployee();
                        break;
                    case "Update an Employee Role":
                        this.updateEmployeeRole();
                        break;
                    case "Quit":
                        console.log("Goodbye!")
                        return
                }
            })
    }

    viewDepartments() {
        db.query('SELECT * FROM departments', function (err, results) {
            if (err) {
                console.log(err);
                return
            }
            console.table("Departments", results);
        })
        this.initiateProgram();
    }

    viewRoles() {
        db.query('SELECT roles.id, departments.name, roles.title, roles.salary FROM departments JOIN roles ON roles.department_id = departments.id', function (err, results) {
            if (err) {
                console.log(err);
                return
            }
            console.table("Employee Roles", results);
        })
        this.initiateProgram();
    }

    // TODO Need to be able to view deparment name and manager name
    viewEmployees() {
        db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON departments.id = roles.department_id', function (err, results) {
            if (err) {
                console.log(err);
                return
            }
            console.table("List of Employees", results);
        })
        this.initiateProgram();
    }

    addDepartment() {
        console.log("in the add department function");
        inquirer
            .prompt([
                {
                    type: "text",
                    message: "What is the name of the department?",
                    name: "deptName"
                }
            ])
            .then((response) => {
                db.query(`INSERT INTO departments (name) VALUES (?)`, response.deptName, function (err, results) {
                    if (err) {
                        console.log("there was an error adding dept", err);
                        return
                    }
                    console.log("success, added dept");
                })
                this.initiateProgram();
            })
    }

    addRole() {
        this.findDepartments();
        inquirer
            .prompt([
                {
                    type: "text",
                    message: "What is the name of the role?",
                    name: "title"
                },
                {
                    type: "number",
                    message: "What is the salary of the role?",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "What is the department for this role?",
                    name: "department_id",
                    choices: departmentArray
                },
                {
                    type: "confirm",
                    message: "Is this a manager role?",
                    name: "is_manager"
                }
            ])
            .then((response) => {
                const departmentId = response.department_id.department_id;
                db.query('INSERT INTO roles (title, salary, department_id, is_manager) VALUES (?, ?, ?, ?)',
                    [response.title, response.salary, departmentId, response.is_manager], function (err, results) {
                        if (err) {
                            console.log("There was an error inserting into roles", err);
                            return
                        }
                        console.log("Success!");
                    })
                this.initiateProgram();
            })
    }

    addEmployee() {
        this.findRoles();
        this.findDepartments();
        this.findManagers();
        inquirer
            .prompt([
                {
                    type: "text",
                    message: "What is the first name of the employee?",
                    name: "first_name"
                },
                {
                    type: "text",
                    message: "What is the last name of the employee?",
                    name: "last_name"
                },
                {
                    type: "list",
                    message: "Who is the manager of the employee?",
                    name: "manager_id",
                    choices: managerArray
                },
                {
                    type: "list",
                    message: "What is the role of the employee?",
                    name: "role_id",
                    choices: roleArray
                },
            ])
            .then((response) => {
                const roleId = response.role_id.role_id;
                const managerId = response.manager_id.employee_id;
                if (managerId === "none") {
                    managerId = null
                }
                db.query('INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)',
                    [response.first_name, response.last_name, managerId, roleId], function (err, results) {
                        if (err) {
                            console.log("There was an error inserting into Employees", err);
                            return
                        }
                        console.log("Success writing employee");
                    })
                this.initiateProgram();
            })
    }

    updateEmployeeRole() {
        // These functions are not getting the employee info in enough time to send it to the prompt
        // Need to use an async function?
        this.findEmployees();
        this.findRoles();
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Which employee would you like to update?",
                    name: "choose_employee",
                    choices: employeeArray
                },
                {
                    type: "list",
                    message: "Which role would you like the employee to have?",
                    name: "change_role",
                    choices: roleArray
                }
            ])
            .then((response) => {
                db.query('SELECT * FROM employees', (err, results) => {
                    if (err) {
                        console.log("Error changing the role", err);
                        return
                    }
                    console.log("success!")
                })
                this.initiateProgram();
            })
    }

    findRoles() {
        roleArray = [];
        db.query('SELECT * FROM roles', (err, results) => {
            if (err) {
                console.log("couldn't get roles")
                return
            } else {
                console.log("success")
                for (let result of results) {
                    roleArray.push({
                        name: result.title,
                        value: {
                            role_id: result.id,
                            role_name: result.title,
                        }
                    })
                }
            }
            console.log("this is the role array", roleArray)
        })
    }

    findDepartments() {
        departmentArray = [];
        db.query('SELECT * FROM departments', (err, results) => {
            if (err) {
                console.log("couldn't get departments")
                return
            } for (let result of results) {
                departmentArray.push(
                    {
                        name: result.name,
                        value: {
                            department_id: result.id,
                            department_name: result.name
                        }
                    })
            }
        })
    }

    findManagers() {
        managerArray = ["none"];
        db.query('SELECT employees.id, employees.first_name, employees.last_name FROM employees LEFT JOIN roles ON roles.id = employees.role_id WHERE roles.is_manager = true', (err, results) => {
            if (err) {
                console.log("couldn't get managers")
                return
            } for (let result of results) {
                managerArray.push(
                    {
                        name: result.first_name + ' ' + result.last_name,
                        value: {
                            employee_id: result.id,
                            employee_firstName: result.first_name,
                            employee_lastName: result.last_name
                        }
                    })
            }
            console.log("This is the manager array", managerArray)
        })
    }

    findEmployees() {
        employeeArray = [];
        db.query('SELECT * FROM employees', (err, results) => {
            if (err) {
                console.log("couldn't get employees")
                return
            } for (let result of results) {
                employeeArray.push(
                    {
                        name: result.first_name + ' ' + result.last_name,
                        value: {
                            employee_id: result.id,
                            employee_firstName: result.first_name,
                            employee_lastName: result.last_name,
                            employee_roleId: result.role_id
                        }
                    })
            }
            // console.log("This is the employee array", employeeArray)
        })
    }
}

module.exports = Queries;

/* Bonus
Update employee managers.

View employees by manager.

View employees by department.

Delete departments, roles, and employees.

View the total utilized budget of a department—in other words, the combined salaries of all employees in that department. */