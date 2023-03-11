const inquirer = require('inquirer');
const router = require('express').Router();
const api = require('./api')
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
{
    host: "localhost",
    user: "root",
    password: "password",
    database: "team_db"
},
    console.log("You are connected to the team_db database.")

);

function prompt() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'Select one option',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'I\'m done'],
            name: 'homepage'
        }
    )
        .then((response) => {
            if (response.homepage === 'View all departments') {
                console.log('here')
                db.query('SELECT id AS "department_id, name AS "department_name" FROM department', function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        console.table(result);
                        prompt();
                    }
                });
            } else if (response.homepage === 'View all roles') {
                db.query('SELECT roles.title AS "Job Title", role_id AS "Role ID", department_name AS Department, roles.salary AS Salary FROM roles Left JOIN department ON roles.department_id = department_id', function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        console.table(result);
                        prompt();
                    }
                });
            } else if (response.homepage === 'View all employees') {
                db.query("SELECT employee_id, employee.first_name, employee.last_name, roles.title, department_name, roles.salary, employee.manager_id FROM department JOIN roles ON department_id = roles.department_id JOIN employee ON employee.role_id = role_id;", function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        console.table(result);
                        prompt();
                    }
                });
            } else if (response.homepage === 'Add a department') {
                addDepartment();
            } else if (response.homepage === 'Add a role') {
                addRole();
            } else if (response.homepage === 'Add an employee') {
                addEmployee();
            } else if (response.homepage === 'Update an employee role') {
                updateEmployee();
            } else if (response.homepage === 'I\'m done') {
                console.log('Goodbye!');
                process.exit();
            }
        })
};

// Creates a new department
function addDepartment() {
    inquirer.prompt(
        {
            type: "input",
            input: "Enter the name of the department you would like to add",
            name: "department",
        }
    )
        .then((response) => {
            db.query("INSERT INTO department(department_name) VALUES (?)", response.department, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    console.log(`${response.department} has been added!`);
                    prompt();
                }
            });
        })
};

// Query to get all department names and ids
async function getDepartments() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', function (err, results) {
            if (err) throw err
            resolve(results);
        })
    })
}

// Creates a new role
async function addRoles() {
    const response = await getDepartments()
    const answer = await inquirer.prompt(
        [{
            type: "input",
            message: "Enter the name of the role you would like to add",
            name: "role",
        },
        {
            type: "number",
            message: "Enter the salary for this role",
            name: "salary",
        },
        {
            type: "list",
            message: "Enter the name of the department this role falls under",
            choices: response.map((rolesData) => {
                return rolesData.name
            }),
            name: "department",
        }]
    )
    const selectedRoles = await response.filter(role => role.name == answer.department)
    db.query("INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)", [answer.roles, answer.salary, selectedRoles[0].id], function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(`${answer.roles} has been added!`);
            prompt();
        }
    });
};

// Get manager ids and names
async function getManagers() {
    return new Promise((resolve, reject) => {
        db.query("SELECT employee_id, CONCAT (first_name, ' ', last_name) AS employee.name FROM employee", function (err, results) {
            if (err) throw err;
            resolve(results);
        })
    })
}

// Get role ids and titles
async function getRoles() {
    return new Promise((resolve, reject) => {
        db.query("SELECT role_id, title FROM roles", function (err, results) {
            if (err) throw err;
            resolve(results);
        })
    })
}

// Creates a new employee
async function addEmployee() {
    const response = await getRoles();
    const input = await inquirer.prompt(
        [{
            type: "input",
            input: "Enter employee first name",
            name: "firstName",
        },
        {
            type: "input",
            input: "Enter employee last name",
            name: "lastName",
        },
        {
            type: "list",
            input: "Select the employee's role",
            choices: response.map((rolesData) => {
                return rolesData.title
            }),
            name: "roles",
        }]
    )
    const selectedRoles = await response.filter(roles => {
        return roles.name == input.name
    });
    const managers = await getManagers()
    const answers = await inquirer.prompt({
        type: 'list',
        message: 'Select the employee\'s manager',
        choices: managers.map(manager => manager.name),
        name: 'manager',
    })
    const selectedManager = await managers.filter(manager => {
        return manager.name == answers.manager
    })
    db.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [input.firstName, input.lastName, selectedRoles[0].id, selectedManager[0].id], function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(`${input.firstName} ${input.lastName} has been added!`);
            prompt();
        }
    });
};

// Gets employee names and ids
async function getEmployees() {
    return new Promise((resolve, reject) => {
        db.query("SELECT CONCAT(first_name, ' ', last_name) AS name, id, role_id FROM employee;", function (err, result) {
            if (err) throw err;
            resolve(result)
        })
    })
}

// Updates employee job title
async function updateEmployee() {
    const response = await getEmployees();
    const answer = await inquirer.prompt(
        {
            type: "list",
            input: "Select the employee",
            choices: response.map((employeeData) => {
                return employeeData.name
            }),
            name: "employee",
        })
    const selectedName = await response.filter((employee) => {
        return employee.name == answer.employee
    });
    const roles = await getRoles();
    const input = await inquirer.prompt({
        type: "list",
        message: "Select the employee's new role",
        choices: roles.map((roleData) => {
            return rolesData.title
        }),
        name: "roles",
    })
    const rolesInfo = await roles.filter(rolesData => {
        return rolesData.title == input.roles
    })
    db.query("UPDATE employee SET role_id = (?) WHERE id = (?)", [rolesInfo[0].id, selectedName[0].id], function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log(`${answer.employee}'s role has been updated to ${input.role}!`);
            prompt();
        }
    })
}

prompt();