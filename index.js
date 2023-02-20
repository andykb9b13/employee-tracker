const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
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
const roleArray = ["Salesperson", "Sales Lead", "Accountant", "Account Manager"];
const departmentArray = [1, 2, 3];

function viewEmployees() {
    db.query('SELECT employees.first_name, employees.last_name, roles.title FROM employees JOIN roles ON employees.role_id = roles.id;', function (err, results) {
        if (err) {
            console.log(err)
        }
        console.table("List of Employees", results);
        initiateProgram();
    })
}

function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
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
                choices: ["View All Departments", "View All Employees", "View All Roles", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]
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
                    endProgram()
                    break
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
                        console.log("Error in adding role", err)
                    } else {
                        console.log("Success! Added Role")
                    }
                })
            initiateProgram();
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
    roleChoices();
    inquirer
        .prompt([
            {
                type: "text",
                message: "What is the first name of the employee?",
                name: "firstName"
            },
            {
                type: "text",
                message: "What is the last name of the employee?",
                name: "lastName"
            },
            {
                type: "list",
                message: "What is the role of the employee?",
                name: "employeeRole",
                // choices: [need a function to get the list of roles, need an array of roles?]
                choices: roleArray
            },
            {
                type: "list",
                message: "Who is the manager of the employee?",
                name: "managerName"
                // choices: [need a function to get the list of managers, need array of managers?]
            }
        ])
        .then((reponse) => {
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