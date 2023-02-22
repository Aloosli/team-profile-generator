// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

// Import Employee class
const Employee = require("./Employee");

// Define Engineer class as a subclass of Employee
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  // Define a method to return github of the engineer
  getGithub() {
    return this.github;
  }
// Override the parent class method to return the role of the engineer
  getRole() {
    return "Engineer";
  }
}

// Export the Engineer class
module.exports = Engineer;

