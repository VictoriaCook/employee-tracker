const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
// const {db} = require('./db/connection');
// const queryFunctions = require('./db/queries');

// Create connection to MySQL database

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '88888888',
    database: 'team_db'
  },
  console.log(`You are now connected to the team_db database.`)
);

// Initiate main inquirer prompts

function init() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "home",
          message: "What would you like to do?",
          choices: [
          'View All Employees',
          'Add Employee',
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View All Departments',
          'Add Department',
        ],
      },
    ])
    .then((answers) => {
        switch (answers.home) {
          case "View All Employees":
            viewAllEmployees();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "View All Roles":
            viewAllRoles();
          case "Add Role":
            addRole();  
          case "View All Departments":
            viewAllDepartments();
            break;
          case "Add Department":
            addRole();
            break;
          case "Add an Employee":
            addEmployee();
            break;
          case "Update an Employee Role":
            updateEmployeeRole();
            break;
          // default:
          //   init();  
        }
      });
}

// Employee functions

function viewAllEmployees() {
    db.query(
        "SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, employees.manager_id AS manager_id FROM employees JOIN roles JOIN departments ON employees.role_id = roles.id WHERE roles.department_id = departments.id;",
        function (err, res) {
          if (err) throw err;
          console.table(res);
          // init();
        }
      );
}

init();

// viewAllEmployees();

// Role functions



// Department functions