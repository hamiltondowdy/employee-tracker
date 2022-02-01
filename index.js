const inquirer = require('inquirer');
const mysql = require('mysql2');

const options = () => {

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'homepage',
            message: 'What would you like to do?',
            choices: ['View all departments', 
                      'View all roles', 
                      'View all employees', 
                      'Add a department', 
                      'Add a role', 
                      'Add an employee', 
                      'Update employee role'],
            default: ['View all departments'],
        }
    ])
}