const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

async function init() {
  let employees = [];
  let managerInfo = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the team manager's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the team manager's ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the team manager's email address?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the team manager's office number?",
    },
  ]);

  let manager = new Manager(
    managerInfo.name,
    managerInfo.id,
    managerInfo.email,
    managerInfo.officeNumber
  );

  employees.push(manager);

  let addAnotherEmployee = true;

  while (addAnotherEmployee) {
    let employeeType = await inquirer.prompt({
      type: "list",
      name: "role",
      message: "What type of team member would you like to add?",
      choices: ["Engineer", "Intern", "I don't want to add any more team members"],
    });

    switch (employeeType.role) {
      case "Engineer":
        let engineerInfo = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
          },
          {
            type: "input",
            name: "id",
            message: "What is the engineer's ID number?",
          },
          {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
          },
          {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
          },
        ]);
        employees.push(
          new Engineer(
            engineerInfo.name,
            engineerInfo.id,
            engineerInfo.email,
            engineerInfo.github
          )
        );
        break;
      case "Intern":
        let internInfo = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
          },
          {
            type: "input",
            name: "id",
            message: "What is the intern's ID number?",
          },
          {
            type: "input",
            name: "email",
            message: "What is the intern's email address?",
          },
          {
            type: "input",
            name: "school",
            message: "What is the intern's school?",
          },
        ]);
        employees.push(
          new Intern(
            internInfo.name,
            internInfo.id,
            internInfo.email,
            internInfo.school
          )
        );
        break;
      default:
        addAnotherEmployee = false;
        break;
    }
  }

  const renderedHTML = render(employees);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFile(outputPath, renderedHTML, (err) => {
    if (err) throw err;
    console.log("Team profile page has been created successfully!");
  });
}

init();
