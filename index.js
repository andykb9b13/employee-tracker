const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { resourceLimits } = require('worker_threads');
const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "thelastwitch6",
        database: "employees_db"
    },
    console.log("connected to the employees_db database")
)

const employeeArray = [];
const roleArray = [1, 2, 3];
const departmentArray = [1, 2, 3];
const managerArray = [1, 2, 3]


function viewEmployees() {
    db.query('SELECT employees.first_name, employees.last_name, roles.title, roles.salary FROM employees JOIN roles ON employees.role_id = roles.id;', function (err, results) {
        if (err) {
            console.log(err)
        }
        console.table("List of Employees", results);
        initiateProgram();
    })
}

function viewRoles() {
    db.query('SELECT roles.title, roles.salary, departments.name FROM roles JOIN departments ON roles.department_id = departments.id', function (err, results) {
        if (err) {
            console.log(err)
        }
        console.table("Employee Roles", results);
        initiateProgram();
    })
};

function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) {
            console.log(err)
        }
        console.table("Departments", results);
        initiateProgram();
    })
};

function initiateProgram() {
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
                    viewDepartments()
                    break;
                case "View All Employees":
                    viewEmployees()
                    break;
                case "View All Roles":
                    viewRoles()
                    break;
                case "Add a Department":
                    addDepartment()
                    break;
                case "Add a Role":
                    addRole()
                    break;
                case "Add an Employee":
                    addEmployee()
                    break;
                case "Update an Employee Role":
                    updateEmployee()
                    break;
                case "Quit":
                    console.log("Goodbye!")
                    return
            }
        })
}


function addDepartment() {
    console.log("in the add department function")
    inquirer
        .prompt([
            {
                type: "text",
                message: "What is the name of the department?",
                name: "deptName"
            }
        ])
        .then((response) => {
            console.log("this is the response.deptName", response.deptName)
            db.query(`INSERT INTO departments (name) VALUES (?)`, response.deptName, function (err, results) {
                if (err) {
                    console.log("there was an error adding dept", err)
                } else {
                    console.log("success, added dept")
                }
            })
            initiateProgram();
        });

}

function addRole() {
    console.log("in the add Role function");
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
                // choices: [need a function to get the existing departments, need array for departments?]
                choices: departmentArray
            }
        ])
        .then((response) => {
            db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
                [response.title, response.salary, response.department_id], function (err, results) {
                    if (err) {
                        console.log("There was an error inserting into roles", err)
                    } else {
                        console.log("Success!")
                    }
                    initiateProgram();
                })

        })
}

// function roleChoices() {
//     db.query('SELECT * FROM roles', function (err, results) {
//         if (err) {
//             console.log("There was an error getting the roles")
//         } else {
//             for (let i = 0; i < results.length; i++) {
//                 roleArray.push(results[i].title)
//             }
//         } return roleArray
//     })
// }



function addEmployee() {
    console.log("in the add employee function");
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
                // choices: [need a function to get the list of managers, need array of managers?]
            },
            {
                type: "list",
                message: "What is the role of the employee?",
                name: "role_id",
                // choices: [need a function to get the list of roles, need an array of roles?]
                choices: roleArray
            },

        ])
        .then((response) => {
            db.query('INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)',
                [response.first_name, response.last_name, response.manager_id, response.role_id], function (err, results) {
                    if (err) {
                        console.log("There was an error inserting into Employees", err)
                    } else {
                        console.log("Success writing employee");
                    }
                })
            initiateProgram();
        })

}


function updateEmployee() {
    console.log("in the update employee function");
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee would you like to update?",
                name: "roleUpdate"
            }
        ])
        .then((response) => {

        })
    initiateProgram();
}

initiateProgram();