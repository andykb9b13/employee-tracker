const { default: inquirer } = require("inquirer");


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

function viewDepartments() {
    console.log("in the view department function");
    db.query()
    initiateProgram();
}

function viewEmployees() {
    console.log("the the view Employees function");
    db.query()
    initiateProgram();
}

function viewRoles() {
    console.log("in the view roles function");
    db.query()
    initiateProgram();
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
                name: "roleName"
            },
            {
                type: "number",
                message: "What is the salary of the role?",
                name: "salary"
            },
            {
                type: "list",
                message: "What is the department for this role?",
                name: "roleDept",
                // choices: [need a function to get the existing departments, need array for departments?]
                choices: ["choice 1", "choice 2"]
            }
        ])
        .then((response) => {
        })
    initiateProgram();
}

function addEmployee() {
    console.log("in the add employee function");
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
                choices: ["choice 1", "choice 2"]
            },
            {
                type: "list",
                message: "Who is the manager of the employee?",
                name: "managerName"
                // choices: [need a function to get the list of managers, need array of managers?]
            }
        ])
        .then((reponse) => {

        })
    initiateProgram();
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