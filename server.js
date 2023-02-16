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
          // case "Update Employee Role":
          //   updateEmployeeRole();
          //   break;
          case "View All Roles":
            viewAllRoles();
          case "Add Role":
            addRole();  
          case "View All Departments":
            viewAllDepartments();
            break;
          case "Add Department":
            addDepartment();
            break;
          // case "Add Employee":
          //   addEmployee();
          //   break;
          // case "Update Employee Role":
          //   updateEmployeeRole();
          //   break;
          // default:
          //   init();  
        }
      });
}

// Functions to view data

function viewAllEmployees() {
    db.query(
        "SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, employees.manager_id AS manager_id FROM employees JOIN roles JOIN departments ON employees.role_id = roles.id WHERE roles.department_id = departments.id;",
        function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
}

function viewAllRoles() {
    db.query(
        "SELECT roles.id AS id, roles.title AS title, roles.salary AS salary, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id;",
        function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
}

function viewAllDepartments() {
    db.query(
        "SELECT departments.id AS id, departments.name AS department FROM departments;",
        function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
}

init();

// Functions to add new data 

function addEmployee() {
  db.query(
    `SELECT roles.id AS id, roles.title AS title, employees.id, employees.first_name, employees.last_name
      FROM roles
      JOIN employees ON roles.id = employees.role_id`,
    
      (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "role",
            type: "list",
            choices: function () {
              let roleChoices = res.map((role) => {
                return {
                  name: role.title,
                  value: role.id,
                };
              });
              return roleChoices;
            },
            message: "What is the new employee's role?",
          },
          {
            name: "manager",
            type: "list",
            choices: function () {
              let managerChoices = res.map((employees) => {
                return {
                  name: `${employees.first_name} ${employees.last_name}`,
                  value: employees.manager_id,
                };
              });
              return managerChoices;
            },
            message: "Who is the employee's manager?",
          },
        ])
        
        .then((answers) => {
          db.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`,
            [answers.firstName, answers.lastName, answers.role, answers.manager],
            (err, res) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(
                `You have successfully added employee: ${answers.firstName} ${answers.lastName}`
              );
              init();
            }
          );
        });
    }
  );
};

function addRole() {
  db.query(`SELECT * FROM departments`, (err, res) => {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this role?",
        },
        {
          name: "department",
          type: "list",
          choices: function () {
            let choiceArr = Array.from(
              res.map((choice) => {
                return {
                  name: choice.name,
                  value: choice.id,
                };
              })
            );
            return choiceArr;
          },
          message: "In which department does this role sit?",
        },
      ])
      .then((answers) => {
        db.query(
          `INSERT INTO roles(title, salary, department_id) 
          VALUES("${answers.title}",
          "${answers.salary}","${answers.department}");`,
          (err, res) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(answers);
            // init();
          });
          // init();
        });
      });
  };


function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Which department would you like to add?",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO departments (name) VALUES ("${answers.name}");`,
        (err, res) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(`You have successfully added the ${answers.name} department.`);
          init();
        }
      );
    });  
}

// Functions to update existing data



// Functions to delete existing data