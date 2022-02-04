const connection = require('./config/connection.js');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');


connection.connect((err) => {
    if (err) throw err;

    console.log("\n WELCOME TO EMPLOYEE TRACKER \n");
    mainMenu();
});

const mainMenu = () => {
    inquirer.prompt([
        {
          name: 'choices',
          type: 'list',
          message: 'Please select an option:',
          choices: [
            'View All Employees',
            'View All Roles',
            'View All Departments',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Exit'
            ]
        }
      ])
      .then((answers) => {
        const {choices} = answers;
  
          if (choices === 'View All Employees') {
              viewAllEmp();
          }
  
          if (choices === 'View All Departments') {
              viewAllDept();
          }

          if (choices === 'View All Roles') {
            viewAllRoles();
        }
  
          if (choices === 'Add Employee') {
              addEmp();
          }
  
          if (choices === 'Add Role') {
              addRole();
          }
  
          if (choices === 'Add Department') {
              addDepartment();
          }
  
          if (choices === 'Exit') {
              connection.end();
          }
    });
  };

// View all employees 
const viewAllEmp = () => {
    let sql =       `SELECT employee.id, 
                    employee.first_name, 
                    employee.last_name, 
                    role.title, 
                    department.department_name AS 'department', 
                    role.salary
                    FROM employee, role, department 
                    WHERE department.id = role.department_id 
                    AND role.id = employee.role_id
                    ORDER BY employee.id ASC`;
    connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`Current Employees:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.table("Response: ", response);
    console.log(chalk.yellow.bold(`====================================================================================`));
});
};

function viewAllDept () {

    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(`Current Departments:`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table('All Departments:', res);
    })
};

// view all roles in the database
const viewAllRoles = () => {
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`Current Roles:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    const sql =     `SELECT role.id, role.title, department.department_name AS department
                    FROM role
                    INNER JOIN department ON role.department_id = department.id`;
    connection.query(sql, (error, response) => {
      if (error) throw error;
        response.forEach((role) => {console.log(role.title);});
        console.log(chalk.yellow.bold(`====================================================================================`));
    });
  };
  

  const addEmp = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'fistName',
        message: "What is the employee's first name?",
        validate: addFirstName => {
          if (addFirstName) {
              return true;
          } else {
              console.log('Please enter a first name');
              return false;
          }
        }
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        validate: addLastName => {
          if (addLastName) {
              return true;
          } else {
              console.log('Please enter a last name');
              return false;
          }
        }
      }
    ])
      .then(answer => {
      const crit = [answer.fistName, answer.lastName]
      const roleSql = `SELECT role.id, role.title FROM role`;
      connection.query(roleSql, (error, data) => {
        if (error) throw error; 
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roles
              }
            ])
              .then(roleChoice => {
                const role = roleChoice.role;
                crit.push(role);
                const managerSql =  `SELECT * FROM employee`;
                connection.query(managerSql, (error, data) => {
                  if (error) throw error;
                  const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'manager',
                      message: "Who is the employee's manager?",
                      choices: managers
                    }
                  ])
                    .then(managerChoice => {
                      const manager = managerChoice.manager;
                      crit.push(manager);
                      const sql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                      connection.query(sql, crit, (error) => {
                      if (error) throw error;
                      console.log("Employee has been added!")
                      viewAllEmp();
                });
              });
            });
          });
       });
    });
  };