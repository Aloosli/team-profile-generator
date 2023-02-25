// Import necessary modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");

const { resolve, join } = require("path");
const { writeFile, existsSync } = require("fs");
// Import the function that renders the output HTML file
const render = require("./src/page-template.js");
// Define the output directory and file name
const OUTPUT_DIR = resolve(__dirname, "output");
const outputPath = join(OUTPUT_DIR, "team.html");

async function init() {
  let employees = [];
  // Get the manager's information through inquirer prompt
  const { name, id, email, officeNumber } = await prompt([
    {
      type: "input",
      name: "name",
      message: "What is the team manager's name?",
      validate: function (input) {
        if (!input) {
          return "Name is required.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "id",
      message: "What is the team manager's ID number?",
      validate: function (input) {
        // Check that the input is a positive integer
        const isValid = /^\d+$/.test(input) && parseInt(input) > 0;
        if (!isValid) {
          return "Please enter a positive integer for the ID number.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "email",
      message: "What is the team manager's email address?",
      validate: function (input) {
        // Check that the input is a valid email address
        const isValid = /\S+@\S+\.\S+/.test(input);
        if (!isValid) {
          return "Please enter a valid email address.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the team manager's office number?",
      validate: function (input) {
        // Check that the input is a positive integer
        const isValid = /^\d+$/.test(input) && parseInt(input) > 0;
        if (!isValid) {
          return "Please enter a positive integer for the office number.";
        }
        return true;
      },
    },
  ]);
  // Create a Manager object using the manager's information and add it to the employees array
  const manager = new Manager(name, id, email, officeNumber);
  employees.push(manager);
  
  let addAnotherEmployee = true;
  // Continue prompting the user to add more employees until they choose not to
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
        // Get the engineer's information through inquirer prompt and add a new Engineer object to the employees array
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
            validate: function (input) {
                if (!input) {
                  return "Name is required.";
                }
                return true;
              },
          },
          {
            type: "input",
            name: "id",
            message: "What is the engineer's ID number?",
            validate: function (input) {
                // Check that the input is a positive integer
                const isValid = /^\d+$/.test(input) && parseInt(input) > 0;
                if (!isValid) {
                  return "Please enter a positive integer for the ID number.";
                }
                return true;
              },
          },
          {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
            validate: function (input) {
                // Check that the input is a valid email address
                const isValid = /\S+@\S+\.\S+/.test(input);
                if (!isValid) {
                  return "Please enter a valid email address.";
                }
                return true;
              },
          },
          {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
            validate: function(input) {
                const validFormat = /^[a-zA-Z][a-zA-Z0-9-]{0,38}[a-zA-Z0-9]$/;
                if (!validFormat.test(input)) {
                  return 'Please enter a valid GitHub username.';
                }
                return true;
              }
          },
        ]);
        employees.push(new Engineer(engName, engId, engEmail, github));
        break;
      case "Intern":
        // Get the intern's information through inquirer prompt and add a new Intern object to the employees array
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
            validate: function (input) {
                if (!input) {
                  return "Name is required.";
                }
                return true;
              },
          },
          {
            type: "input",
            name: "id",
            message: "What is the intern's ID number?",
            validate: function (input) {
                // Check that the input is a positive integer
                const isValid = /^\d+$/.test(input) && parseInt(input) > 0;
                if (!isValid) {
                  return "Please enter a positive integer for the ID number.";
                }
                return true;
              },
          },
          {
            type: "input",
            name: "email",
            message: "What is the intern's email address?",
            validate: function (input) {
                // Check that the input is a valid email address
                const isValid = /\S+@\S+\.\S+/.test(input);
                if (!isValid) {
                  return "Please enter a valid email address.";
                }
                return true;
              },
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
  // 
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
