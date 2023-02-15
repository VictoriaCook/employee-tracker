const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

// Connect to MySQL database

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '88888888',
      database: 'team_db'
    },
    console.log(`You are now connected to the team_db database.`)
  );

// Call SQL query functions in a switch statement based on user selection

function init() {
    inquirer.prompt([
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
          default:
            init();  
        }
      });
}