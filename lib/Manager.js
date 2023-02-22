// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

// Import Employee class    
const Employee = require("./Employee");
// Define Manager class as a subclass of Employee
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
 // Define a method to return office number of the manager
  getOfficeNumber() {
    return this.officeNumber;
  }
  
  // Override the parent class method to return the role of the manager
  getRole() {
    return "Manager";
  }
}

// Export the Manager class
module.exports = Manager;
