const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");

const { resolve, join } = require("path");
const { writeFile, existsSync } = require("fs");

const render = require("./src/page-template.js");

const OUTPUT_DIR = resolve(__dirname, "output");
const outputPath = join(OUTPUT_DIR, "team.html");

async function init() {
  let employees = [];
  const { name, id, email, officeNumber } = await prompt([
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

  const manager = new Manager(name, id, email, officeNumber);

  employees.push(manager);

  let addAnotherEmployee = true;

  while (addAnotherEmployee) {
    let employeeType = await prompt({
      type: "list",
      name: "role",
      message: "What type of team member would you like to add?",
      choices: [
        "Engineer",
        "Intern",
        "I don't want to add any more team members",
      ],
    });

    switch (employeeType.role) {
      case "Engineer":
        let {
          name: engName,
          id: engId,
          email: engEmail,
          github,
        } = await prompt([
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
        employees.push(new Engineer(engName, engId, engEmail, github));
        break;
      case "Intern":
        const {
          name: intName,
          id: intId,
          email: intEmail,
          school,
        } = await prompt([
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

        employees.push(new Intern(intName, intId, intEmail, school));
        break;
      default:
        addAnotherEmployee = false;
        break;
    }
  }

  const renderedHTML = render(employees);

  if (!existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  writeFile(outputPath, renderedHTML, (err) => {
    if (err) throw err;
    console.log("Team profile page has been created successfully!");
  });
}

init();
