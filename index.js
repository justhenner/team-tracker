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
};

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

const updateEmployeeRole = () => {
    let role = new Role();
    role.getRoles().then((role) => {
        let employee = new Employee();
        employee.getEmployees().then((employee) => {
            return inquirer 
            .prompt([
                {
                    name: "employee",
                    type: "list", 
                    message: "Select the employee that needs their role updated",
                    choices: employee.map((e) => {
                        return ` ${e.id} ${e.first_name} ${e.last_name}`;
                    }),
                },
                {
                    name: "role",
                    type: "list",
                    message: "Select the role which you'd like to assign to the employee",
                    choices: role.map((r) => {
                        return `${r.id}. ${r.title}`;
                    }),
                },
            ])
            .then(function ({ employee, role}) {
                employee = new Employee().updateEmployee
                console.log("Employee's role is successfully updated!");
            startsPrompts();
            });
        });
    });
};

function viewDepartments() {
    let department = new Department();
    department
    .getDepartments()
    .then((rows) => {
        console.log("View all departments");
        console.table(rows);
    })
    .then(() => {
        startsPrompts();
    });
};

const viewRoles = () => {
    let role = new Role();
    role 
    .getRoles()
    .then((rows) => {
        console.log("View all roles");
        console.table(rows);
    })
    .then(() => {
        startsPrompts();
    });
};

const viewEmployees = () => {
    let employee = new Employee();
    employee
    .getEmployees()
    .then((rows) => {
        console.log("View all employees");
        conosle.table(rows);
    })
    .then(() => {
        startsPrompts();
    });
};

const startsPrompts = () => {
    return inquirer
    .prompt([
        {
            name: "selection",
            type: "list",
            message: "Select an action",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add department",
                "Add role",
                "Add employee",
                "Update employee role",
            ],
        },
    ])
    .then((chosen) => {
        switch (chosen.selection) {
            case "View all departments":
                viewDepartments(startsPrompts);
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployeeRole();
                break;
            default:
                startsPrompts();
        }
    });
};

startsPrompts();