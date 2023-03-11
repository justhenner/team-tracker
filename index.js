const inquirer = require('inquirer');
const Department = require('./lib/department');
const Employee = require('./lib/employee');
const Role = require('./lib/role');

function addDepartment() {
    return inquirer 
    .prompt([
        {
            name: "name",
            type: "input",
            message: "What is the department name",
        },
    ])
    .then(function ({ name }) {
        const department = new Department (null, name);
        department.addDepartment();
        startsPrompts();
    });
}
