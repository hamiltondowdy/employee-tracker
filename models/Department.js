const inquirer = require('inquirer');

const questions = () => {
inquirer
    .prompt([
        {
            type: 'list',
            name: 'department',
            message: 'What department would you like to add?',
            choices: ['R&D', 'Sales', 'Maintenance']
        }

    ])
    .then((answers) => {

    })
    .catch((error) => {
        if (error.isTtyError) {

        } else {
            console.log('Pick department');
        }
    });

}