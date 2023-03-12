# Team-tracker

## Technology Used 

|Technology | Resource |
|-----|:-----------|
| JavaScript | [https://developer.mozilla.org/](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Node.js |[https://developer.mozilla.org/en-US/docs/Glossary/Node.js](https://developer.mozilla.org/en-US/docs/Glossary/Node.js)|
| MySQL | [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)|

## Description

Team-tracker allows users to build and maintain their employee database from the command line. The application provides users with add, update, and delete functionality. 

[Click to view the video walk through](https://drive.google.com/file/d/1miQoGt_vk68ZXeNfchKL2m9L3qj4Ehis/view)

## Table of Contents
* [Code Snippet](#code-snippet)
* [Author Info](#author-info)
* [Credits](#credits)
* [License](#license)
* [Badges](#badges)

## Code Snippets

This below code defines a function startsPrompts which uses the inquirer package to prompt the user to select an action from a list of choices. The available choices are "View all departments", "View all roles", "View all employees", "Add department", "Add role", "Add employee", and "Update employee role".

After the user makes a selection, the function uses a switch statement to call one of several other functions based on the user's choice. For example, if the user selects "View all departments", the viewDepartments function is called with startsPrompts passed as an argument.

If the user does not make a valid selection, the default case in the switch statement calls startsPrompts again to prompt the user to make a selection.

![Alt text](./assets/carbon%20(2).png)

## Author Info

### Henner Espinoza

* [LinkedIn](https://www.linkedin.com/in/hennerespinoza)

* [GitHub](https://github.com/justhenner)

## Credits

* Study group members

## License

MIT License

## Badges

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![mySQL](	https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)