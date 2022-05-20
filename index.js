const inquirer = require('inquirer');
const fs = require('fs');
const fileName = './dist/index.html';

const generateWebSite = require('./src/webSite');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const team = [];

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the Manager name'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your Id'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is your office Number'
    },
]

const menuQuestions = [
    {
        type: 'list',
        name: 'menu',
        message: 'Select one of the following options:',
        choices: ['add an engineer', 'add an intern', 'finish building my team']
    }
]

const engineerQuestions =[
    {
        type: 'input',
        name: 'name',
        message: 'What is the Engineer name'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your Id'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email'
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your github username'
    },
]

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the Intern name'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your Id'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email'
    },
    {
        type: 'input',
        name: 'school',
        message: 'What is the name of your school'
    },
]

function managerFunction() {
    inquirer.prompt(managerQuestions).then(userInfo =>{
        const {name, id, email, officeNumber} = userInfo;
        const manager = new Manager(name, id, email, officeNumber);
        team.push(manager);
        menuFunction();
    })
}

function menuFunction() {
    inquirer.prompt(menuQuestions).then(userInfo =>{
        if (userInfo.menu ==='add an engineer' ) {
            engineerFunction();
        }
        else if (userInfo.menu =='add an intern'){
            internFunction();
        }
        else{
            console.log("finish build the team")
            writeFile(fileName, generateWebSite);
        }
    })
}

function engineerFunction() {
    inquirer.prompt(engineerQuestions).then(userInfo =>{
        const{name, id, email, github} = userInfo
        const engineer = new Engineer(name, id, email, github);
        team.push(engineer);
        menuFunction();
    })
}

function internFunction() {
    inquirer.prompt(internQuestions).then(userInfo =>{
        const{name, id, email, school} = userInfo
        const intern = new Intern(name, id, email, school);
        team.push(intern);
        menuFunction();
    })
}

function writeFile(fileName, data) {
    fs.writeFile(fileName,data,err=>
        err ? console.log(err) : console.log('Success!'))
}
  

managerFunction();