const connection = require('./config/connection.js');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const chalk = require('chalk');
const validate = require('./javascript/js')

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
            'Update Employee Role',
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

          if (choices === 'Update Employee Role') {
            updateEmployeeRole();
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
    mainMenu();
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
        console.log(chalk.yellow.bold(`====================================================================================`));
        mainMenu();
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
        mainMenu();
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
                      mainMenu();
                });
              });
            });
          });
       });
    });
  };

  const addRole = () => {
    const sql = 'SELECT * FROM department'
    connection.query(sql, (error, response) => {
        if (error) throw error;
        let deptNamesArray = [];
        response.forEach((department) => {deptNamesArray.push(department.department_name);});
        deptNamesArray.push('Create Department');
        inquirer
          .prompt([
            {
              name: 'departmentName',
              type: 'list',
              message: 'Which department is this new role in?',
              choices: deptNamesArray
            }
          ])
          .then((answer) => {
            if (answer.departmentName === 'Create Department') {
              this.addDepartment();
            } else {
              addRoleResume(answer);
            }
          });
  
        const addRoleResume = (departmentData) => {
          inquirer
            .prompt([
              {
                name: 'newRole',
                type: 'input',
                message: 'What is the name of your new role?',
                validate: validate.validateString
              },
              {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this new role?',
                validate: validate.validateSalary
              }
            ])
            .then((answer) => {
              let createdRole = answer.newRole;
              let departmentId;
  
              response.forEach((department) => {
                if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
              });
  
              let sql =   `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
              let crit = [createdRole, answer.salary, departmentId];
  
              connection.query(sql, crit, (error) => {
                if (error) throw error;
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(chalk.greenBright(`Role successfully created!`));
                console.log(chalk.yellow.bold(`====================================================================================`));
                viewAllRoles();
                mainMenu();
              });
            });
        };
      });
    };

    const addDepartment = () => {
        inquirer
          .prompt([
            {
              name: 'newDepartment',
              type: 'input',
              message: 'What is the name of your new Department?',
              validate: validate.validateString
            }
          ])
          .then((answer) => {
            let sql =     `INSERT INTO department (department_name) VALUES (?)`;
            connection.query(sql, answer.newDepartment, (error, response) => {
              if (error) throw error;
              console.log(``);
              console.log(chalk.greenBright(answer.newDepartment + ` Department successfully created!`));
              console.log(``);
              viewAllDept();
              mainMenu();
            });
          });
    };


    const updateEmployeeRole = () => {
        let sql =       `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
                        FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
        connection.query(sql, (error, response) => {
          if (error) throw error;
          let employeeNamesArray = [];
          response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});
    
          let sql =     `SELECT role.id, role.title FROM role`;
          connection.query(sql, (error, response) => {
            if (error) throw error;
            let rolesArray = [];
            response.forEach((role) => {rolesArray.push(role.title);});
    
            inquirer
              .prompt([
                {
                  name: 'chosenEmployee',
                  type: 'list',
                  message: 'Which employee has a new role?',
                  choices: employeeNamesArray
                },
                {
                  name: 'chosenRole',
                  type: 'list',
                  message: 'What is their new role?',
                  choices: rolesArray
                }
              ])
              .then((answer) => {
                let newTitleId, employeeId;
    
                response.forEach((role) => {
                  if (answer.chosenRole === role.title) {
                    newTitleId = role.id;
                  }
                });
    
                response.forEach((employee) => {
                  if (
                    answer.chosenEmployee ===
                    `${employee.first_name} ${employee.last_name}`
                  ) {
                    employeeId = employee.id;
                  }
                });
    
                let sqls =    `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
                connection.query(
                  sqls,
                  [newTitleId, employeeId],
                  (error) => {
                    if (error) throw error;
                    console.log(chalk.greenBright.bold(`====================================================================================`));
                    console.log(chalk.greenBright(`Employee Role Updated`));
                    console.log(chalk.greenBright.bold(`====================================================================================`));
                    viewAllEmp();
                    mainMenu();
                  }
                );
              });
          });
        });
      };