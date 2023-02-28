const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const dbqueries = require('./queries/dbQueries');

const dbQueries = new dbqueries();

function initiateProgram() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "select",
                choices: ["View All Departments", "View All Employees", "View All Roles", "View Budget By Department", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Delete a Department", "Delete a Role", "Delete an Employee", "Quit"]
            }
        ])
        .then((response) => {
            switch (response.select) {
                case "View All Departments":
                    viewDepartments();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View Budget By Department":
                    viewBudget();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Update an Employee Role":
                    updateEmployeeRole();
                    break;
                case "Delete a Department":
                    deleteDepartment();
                    break;
                case "Delete a Role":
                    deleteRole();
                    break;
                case "Delete an Employee":
                    deleteEmployee();
                    break;
                case "Quit":
                    console.log("Goodbye!")
                    return
            }
        })
}

async function viewDepartments() {
    const [departments] = await dbQueries.viewDepartments();
    console.table("DEPARTMENTS", departments)
    initiateProgram()
}

async function viewEmployees() {
    const [employees] = await dbQueries.viewAllEmployees();
    console.table("EMPLOYEES", employees);
    initiateProgram();
}

async function viewRoles() {
    const [roles] = await dbQueries.viewRoles();
    console.table("ROLES", roles)
    initiateProgram()
}

async function viewBudget() {
    const departmentArray = await findDepartments()
    const response = await inquirer
        .prompt([
            {
                type: "list",
                message: "Which department's budget would you like to view?",
                name: "deptChoice",
                choices: departmentArray
            }
        ])
    const [budget] = await dbQueries.viewBudget(response);
    console.table("BUDGET", budget);
    initiateProgram();
}

async function addDepartment() {
    const response = await inquirer
        .prompt([
            {
                type: "text",
                message: "What is the name of the department?",
                name: "deptName"
            }
        ])
    dbQueries.addDepartment(response)
    viewDepartments()
}

async function addRole() {
    const departmentArray = await findDepartments();
    const response = await inquirer
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
    dbQueries.addRole(response)
    viewRoles();
}

async function addEmployee() {
    const roleArray = await findRoles();
    const managerArray = await findManagers();
    const response = await inquirer
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
    dbQueries.addEmployee(response);
    viewEmployees();
}

async function updateEmployeeRole() {
    const employeeArray = await findEmployees();
    const roleArray = await findRoles();
    const response = await inquirer
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
    await dbQueries.updateEmployeeRole(response);
    viewEmployees();
}

async function deleteDepartment() {
    const departmentArray = await findDepartments();
    const response = await inquirer
        .prompt([
            {
                type: "list",
                message: "Which department would you like to delete?",
                name: "deptDelete",
                choices: departmentArray
            }
        ])
    await dbQueries.deleteDepartment(response);
    viewDepartments();
}

async function deleteRole() {
    const roleArray = await findRoles();
    const response = await inquirer
        .prompt([
            {
                type: "list",
                message: "Which role would you like to delete?",
                name: "roleDelete",
                choices: roleArray
            }
        ])
    await dbQueries.deleteRole(response);
    viewRoles();
}

async function deleteEmployee() {
    const employeeArray = await findEmployees();
    const response = await inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee would you like to delete?",
                name: "employeeDelete",
                choices: employeeArray
            }
        ])
    await dbQueries.deleteEmployee(response);
    viewEmployees();
}

async function findRoles() {
    const [roleArray] = await dbQueries.findRoles()
    const newRoleArray = roleArray.map((result) => {
        return {
            name: result.title,
            value: {
                role_id: result.id,
                role_name: result.title,
            }
        }
    })
    return newRoleArray
}


async function findDepartments() {
    const [departments] = await dbQueries.findDepartments()
    const newDeptArray = departments.map((result) => {
        return {
            name: result.name,
            value: {
                department_id: result.id,
                department_name: result.name
            }
        }
    })
    return newDeptArray
}

async function findManagers() {
    const [managerArray] = await dbQueries.findManagers();
    const newManagerArray = managerArray.map((result) => {
        return {
            name: result.first_name + ' ' + result.last_name,
            value: {
                employee_id: result.id,
                employee_firstName: result.first_name,
                employee_lastName: result.last_name
            }
        }
    })
    return newManagerArray
}

async function findEmployees() {
    const [employeeArray] = await dbQueries.viewEmployees()
    const newEmployeeArray = employeeArray.map((result) => {
        return {
            name: result.first_name + ' ' + result.last_name,
            value: {
                employee_id: result.id,
                employee_firstName: result.first_name,
                employee_lastName: result.last_name,
                employee_roleId: result.role_id
            }
        }
    })
    return newEmployeeArray
}

initiateProgram()
