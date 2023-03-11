INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal"), 
        ("Marketing");


INSERT INTO role (title, salary, department_id)
VALUES  ("Salesperson", 80000, 1),
        ("Head of Sales", 120000, 2),
        ("Lead Engineer", 150000, 3),
        ("Software Engineer", 120000, 4),
        ("Financial Analyst", 130000, 5),
        ("Chief Financial Officer", 170000, 3),
        ("Head of Legal", 25000, 4),
        ("Lawyer", 190000, 4),
        ("Marketing Analyst", 95000, 5),
        ("Head of Marketing", 155000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sean", "Smith", 1, 1),
       ("Mary", "Chen", 2, 1),
       ("Ashton", "Rodrigues", 3, 3),
       ("Melvin", "Rapik", 4, 3),
       ("Luna", "Singh", 5, 5),
       ("Malia", "Brown", 6, 5),
       ("Sasha", "Lawrd", 7, 7),
       ("Tim", "Allen", 8, 7);

SELECT r.id, r.title, d.name as department, r.salary 
FROM role AS r
JOIN department AS d on d.id = r.department_id;

SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id
FROM employee AS e
       
