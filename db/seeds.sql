INSERT INTO departments (department_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal"), 
        ("Marketing"),


INSERT INTO roles (title, salary, department_id)
VALUES  ("Salesperson", 80000, 1),
        ("Head of Sales" 120000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Financial Analyst", 130000, 3),
        ("Chief Financial Officer", 170000, 3),
        ("Head of Legal", 25000, 4),
        ("Lawyer", 190000, 4),
        ("Marketing Analyst", 95000, 5),
        ("Head of Marketing", 155000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Mike", "Chan", 1, 2), 
        ("Ashley", "Rodriguez", 2, null),
        ("Kevin", "Tupik", 3, null), 
        ("Kunal", "Singh", 4, 3),
        ("Malia", "Brown", 5, 6),
        ("Sarah", "Lourd", 6, null),
        ("Tom", "Allen", 7, null),
        ("Jim", "Tracy", 8, 7),
        ("Jose", "Morales", 9, 10),
        ("Sandra", "Richards", 10, null);
