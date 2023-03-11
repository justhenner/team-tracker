const db = require('../config/connection');


class Role {
    constructor(id, title, department_id, salary) {
        this.id = id;
        this.title = title;
        this.department_id = department_id;
        this.salary = salary;
    }
    getRoles() {
        const sql = `SELECT r.id, r.title, d.name AS department, r.salary FROM role AS r JOIN department AS d on d.id = r.department_id;`
      return db.promise()
               .query(sql)
               .then(([rows]) =>{
                return rows;
                });
    }
    addRole() {
        const sql =`INSERT INTO role (title, department_id, salary) 
        VALUES("${this.title}", "${this.department_id}", "${this.salary}")`
    return db.promise()
             .query(sql)
    }
}

module.exports = Role;