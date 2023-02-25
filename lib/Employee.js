// TODO: Write code to define and export the Employee class

// This class defines the Employee object, which is the parent class for the Manager, Engineer, and Intern objects
class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
    // Returns the name of the employee
    getName() {
      return this.name;
    }
    // Returns the ID of the employee
    getId() {
      return this.id;
    }
    // Returns the email of the employee
    getEmail() {
      return this.email;
    }
    // 
    getRole() {
      return "Employee";
    }
  }
  // Export the Employee class
  module.exports = Employee;
  
