
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.


inquirer.prompt([
    // Prompt for the common employee information
    {
      type: 'input',
      name: 'name',
      message: "What is the employee's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the employee's ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the employee's email address?",
    },
    // Prompt for the specific employee information based on the employee type
    {
      type: 'input',
      name: 'github',
      message: "What is the engineer's GitHub username?",
      when: (answers) => answers.role === 'Engineer',
    },
    {
      type: 'input',
      name: 'school',
      message: "What school does the intern attend?",
      when: (answers) => answers.role === 'Intern',
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "What is the manager's office number?",
      when: (answers) => answers.role === 'Manager',
    },
  ]);
  

  const employeeQuestions = [
    // ...
  ];
  
  const employees = []; // array to hold the employee objects
  
  // Prompt for the common employee information
  inquirer.prompt(employeeQuestions).then(({ name, id, email, role, github, school, officeNumber }) => {
    if (role === "Engineer") {
      employees.push(new Engineer(name, id, email, github));
    } else if (role === "Intern") {
      employees.push(new Intern(name, id, email, school));
    } else if (role === "Manager") {
      employees.push(new Manager(name, id, email, officeNumber));
    }
  });
  
  