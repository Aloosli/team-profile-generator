// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

// Import Employee class
const Employee = require("./Employee");

// Define Intern class as a subclass of Employee
class Intern extends Employee {
  constructor(name, id, email, school) {
    // Call the constructor of the parent class
    super(name, id, email);
    this.school = school;
  }

  // Define a method to return school of the intern
  getSchool() {
    return this.school;
  }

  // Override the parent class method to return the role of the intern
  getRole() {
    return "Intern";
  }
}

// Export the Intern class
module.exports = Intern;
