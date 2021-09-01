const Manager = require("./lib/Manager-starter");
const Engineer = require("./lib/Engineer-starter");
const Intern = require("./lib/Intern-starter");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function
const render = require("./lib/htmlRenderer");
// Alternative rendering function
// const render = require("./lib/page-template.js");


const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      //
      // YOUR CODE HERE:
      // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
      // Strongly recommend to add validate property function for id and email
      //
      {
        type: 'input',
        name: 'managerName',
        message: 'What is the Managers name?',
        validate: answer => {
          if (answer !== '') {
            return true
          }
          return 'Please try again'
        }
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'What is the Managers ID?',
        validate: answer => {
          var approved = answer.match(/^[0-9]*$/)
          if (approved) {
            return true
          }
          return 'Please try again'
        }
      },
      {
        type: 'input',
        name: 'managerEmail',
        message: 'What is the Managers email?',
        validate: answer => {
          var approved = answer.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)
          if (approved) {
            return true
          }
          return 'Please try again'
        }
      },
      {
        type: 'input',
        name: 'managerOfficeNumber',
        message: 'What is the Managers Office Number?',
        validate: answer => {
          var approved = answer.match(/^[0-9]*$/)
          if (approved) {
            return true
          }
          return 'Please try again'
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      //
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      //
      {
        type: 'input',
        name: 'engineerName',
        message: 'What is the Engineers name?',
        validate: answer => {
          if (answer !== '') {
            return true
          }
          return 'Please try again'
        }
      },
      {
        type: 'input',
        name: 'engineerId',
        message: 'What is the Engineers ID?',
        validate: answer => {
          var approved = answer.match(/^[0-9]*$/)
          if (approved) {
            if (idArray.includes(answer)) {
              return 'Try again this number is in use'
            } else {
              return true
            }
          }
          return 'Please try again'
        }
      },
      {
        type: 'input',
        name: 'engineerEmail',
        message: 'What is the Engineers email?',
        validate: answer => {
          var approved = answer.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)
          if (approved) {
            return true
          }
          return 'Please try again'
        }
      },
      {
        type: 'input',
        name: 'engineerGithub',
        message: 'What is the Engineers github?',
        validate: answer => {
          if (answer !== '') {
            return true
          }
          return 'Please try again'
        }
      }
    ]).then(answers => {
      //
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
      //
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      //
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      //
      {
        type: 'input',
        name: 'internName',
        message: 'What is the Interns name?',
        validate: answer => {
          if (answer !== '') {
            return true
          }
          return 'Please try again'
        }
      },
      {
        type: 'input',
        name: 'internId',
        message: 'What is the Interns ID?',
        validate: answer => {
          var approved = answer.match(/^[0-9]*$/)
          if (approved) {
            if (idArray.includes(answer)) {
              return 'Try again this number is in use'
            } else {
              return true
            }
          }
          return 'Please try again'
        }
      },
      {
        type: 'input',
        name: 'internEmail',
        message: 'What is the Interns email?',
        validate: answer => {
          var approved = answer.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)
          if (approved) {
            return true
          }
          return 'Please try again'
        }
      },
      {
        type: 'input',
        name: 'internSchool',
        message: 'What is the School name?',
        validate: answer => {
          if (answer !== '') {
            return true
          }
          return 'Please try again'
        }
      },
    ]).then(answers => {
      //
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
      //    TO THE INTERN CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
      //
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
