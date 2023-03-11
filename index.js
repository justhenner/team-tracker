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

const addRole = () => {
    let department = new Department();
    department.getDepartments().then((department) => {
        return inquirer 
        .prompt([
            {
                name: "title",
                type: "input", 
                message: "What title does the role hold?",
            },
            {
                name: "salary", 
                type: "input", 
                message: "What salary does the role offer?",
            },
            {
                name: "department_name",
                type: "list",
                message: "What department does the role fall under?",
                choices: department.map((d) => {
                    return `${d.id} ${d.name}`;
                }),
            },
        ]) 
        .then(function ({ title, salary, department_name }) {
            const role = new Role(null, title, salary, department_name);
            role.addRole;
            startsPrompts();
        });
    });
};