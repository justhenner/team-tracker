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

const addEmployee = () => {
    let role = new Role();
role.getRoles().then((role) => {
    let employee = new Employee();
    employee.getEmployees().then((employee) => {
return inquirer
    .prompt([
        {
            name: "first_name",
            type: "input", 
            message: "Insert employee's first name",
        },
        {
            name: "last_name", 
            type: "input", 
            message: "Insert employee's last name",
        },
        {
            name: "role_id",
            type: "list",
            message: "Select the employee's role",
            choices: role.map((r) => {
                return `${r.id}. ${r.title}`;
            }),
        },
        {
            name: "manager_id",
            type: "list",
            message: "Select the employee's manager",
            choices: employee.map((e) => {
                return `${e.id} ${e.first_name} ${e.last_name}`;
            }),
        },
    ])
    .then(function ({ first_name, last_name, role_id, manager_id }) {
        const employee = new Employee(
            null, 
            first_name,
            lat_name, 
            role_id, 
            manager_id
        );
        employee.addEmployee;
        startsPrompts();
    });
});
});
};