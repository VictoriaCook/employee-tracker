// const {db} = require('./connection');

// Employee functions

// function viewAllEmployees() {
//     db.query(
//         "SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, employee.manager_id AS manager_id FROM employee JOIN roles JOIN departments ON employee.roles_id = roles.id WHERE roles.departments_id = departments.id;",
//         function (err, results) {
//           console.table(results);
//         //   init();
//         }
//       );
// }

// viewAllEmployees();

// Role functions



// Department functions


// module.exports = queries;




// two key things: add / update and getting / display

// employees, roles and departments. a class for each of these. 

// within each, include functions to show, add (new instance of class adds them), update, delete

// how to update?

class Employee {
    constructor(firstName, lastName, role, manager) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = role;
        this.manager = manager;
    }
    viewAll() {
        // console.log(`Name: ${this.name} Role: ${this.role} Manager: ${this.manager}`);
        db.query(
            "SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, employee.manager_id AS manager_id FROM employee JOIN roles JOIN departments ON employee.roles_id = roles.id WHERE roles.departments_id = departments.id;",
            function (err, results) {
              console.table(results);
              initPrompt();
            }
          );
    }
    add() {
        // this is done by creating a new instance of the class ?
    }
    update() {
        // update in database
    }
}