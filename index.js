"use strict";
globalThis.regeneratorRuntime = require("regenerator-runtime");



const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employeeQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the employee's ID number?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the employee's email address?",
  },
  {
    type: "list",
    name: "role",
    message: "What is the employee's role?",
    choices: ["Engineer", "Intern", "Manager"],
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer's GitHub username?",
    when: (answers) => answers.role === "Engineer",
  },
  {
    type: "input",
    name: "school",
    message: "What school does the intern attend?",
    when: (answers) => answers.role === "Intern",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager's office number?",
    when: (answers) => answers.role === "Manager",
  },
];

const employees = [];

inquirer.prompt(employeeQuestions).then((answers) => {
  const { name, id, email, role, github, school, officeNumber } = answers;

  if (role === "Engineer") {
    employees.push(new Engineer(name, id, email, github));
  } else if (role === "Intern") {
    employees.push(new Intern(name, id, email, school));
  } else if (role === "Manager") {
    employees.push(new Manager(name, id, email, officeNumber));
  }

  const renderedHTML = render(employees);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFile(outputPath, renderedHTML, (err) => {
    if (err) throw err;
    console.log("Team profile page has been created successfully!");
  });
});

  