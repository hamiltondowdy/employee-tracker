// create employee routes
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const inquirer = require('inquirer');


class Employee extends Model {}
  
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isRole: true
        }
      },
      manager: {
        type: DataTypes.STRING,
      },
      salary: {
        type: DataTypes.DECIMAL,
        allowNull: false

      }
    },
    {
    
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'employee'
    }
  );
  
  module.exports = Employee;















/* const questions = () => {
inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is employee last name?'

        },
        {
            type: 'list',
            name: 'empRole',
            message: 'What is employee role?',
            choices: ['Manager', 'Accountant', 'Developer']
        },
        {
            type: 
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

} */