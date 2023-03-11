const db = require('../config/connection');


class Employee {
    constructor(id, first_name, last_name, role_id, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
    getEmployees() {
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(b.first_name," ", b.last_name) as manager FROM employee e JOIN employee AS b on e.manager_id = b.id JOIN role r on r.id = e.role_id INNER JOIN department d on d.id = r.department_id;`;
     return db.promise()
            .query(sql)
            .then(([rows]) =>{
                return rows;
            })
    }
    addEmployee() {
        const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?)`;
        const employee = [this.first_name, this.last_name, this.role_id, this.manager_id]
        return db.promise()
              .query(sql, employee)
    }
    updateEmployee() {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ${this.id}`;
        const employee = [this.role_id]
        return db.promise()
              .query(sql, employee)
              .then(([rows]) =>{
                return rows;
              })
    }
}

module.exports = Employee