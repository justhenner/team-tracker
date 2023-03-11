const db = require('../config/connection');


class Department {
    constructor(id, name) {
        this.id = id;
        this.name =name;
    }
    getDepartments() {
        const sql = `SELECT * FROM department;`;
        return db.promise()
            .query(sql)
            .then(([rows]) =>{
                return rows;
            })
    }
    addDepartment() {
        const sql = `INSERT INTO department(name) VALUES("${this.name}")`
        return db.promise()
        .query(sql);
    }
}
console.log(`
-------------
PLEASE START
-------------
`)
module.exports = Department;