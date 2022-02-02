const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Davycrockett1',
    database: 'tracker'
  });


connection.connect();

connection.connect((err) => {
    if (err) throw err;

    console.log("\n WELCOME TO EMPLOYEE TRACKER \n");
    mainMenu();
});

function mainMenu() {

    // Prompt user to choose an option
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "MAIN MENU",
      choices: [
        "View all employees",
        "View all employees by role",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Add role",
        "Add department",
      ]
    })
    .then((answer) => {

        // Switch case depending on user option
        switch (answer.action) {
            case "View all employees":
                viewAllDept();
                break;

            case "View all employees by department":
                viewAllRoles();
                break;

            case "View all employees by role":
                viewAllEmp();
                break;

            case "Add employee":
                addEmp();
                break;

            case "Add department":
                addDept();
                break;
            case "Add role":
                addRole();
                break;
        }
    })
};

// View all employees 
function viewAllEmp(){

    // Query to view all employees
    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

    connection.query(query, function(err, res) {
        if(err) return err;
        console.log("\n");

        console.table(res);

        mainMenu();
    });
}

function viewAllDept () {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        options();
    })
};

// view all roles in the database
function viewAllRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        options();
    })
};

function addEmp () {
    let 
}