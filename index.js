// todo: move init functions to start? am i re-initializing after every action?

const mysql = require('mysql2');
const inquirer = require('inquirer');
const sqlqueries = require('./sql');
const cTable = require('console.table');

//#region banner
console.log(`,-----------------------------------------------------.
|                                                     |
|     _____                 _                         |
|    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |
|    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
|    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |
|    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
|                    |_|            |___/             |
|                                                     |
|     __  __                                          |
|    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
|    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       |
|    | |  | | (_| | | | | (_| | (_| |  __/ |          |
|    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
|                              |___/                  |
|                                                     |
\`-----------------------------------------------------'
`);
//#endregion

//#region globals
let roleList;
let roleListObj;
let employeeList;
let employeeListObj;
let departmentList;
let departmentListObj;

function findRoleId(namedKey, objArray) {
  for (var i = 0; i < objArray.length; i++) {
    if (objArray[i].title === namedKey) {
      return objArray[i];
    }
  }
}

function findEmployeeId(namedKey, objArray) {
  for (var i = 0; i < objArray.length; i++) {
    if (objArray[i].first_name + ' ' + objArray[i].last_name === namedKey.toString()) {
      return objArray[i].id;
    }
  }
}

function findDepartmentId(namedKey, objArray) {
  for (var i = 0; i < objArray.length; i++) {
    if (objArray[i].name === namedKey) {
      return objArray[i];
    }
  }
}
//#endregion

var connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "rootpass",
  database: "emsDB"
});

connection.connect(function (err) {
  if (err) throw err;
  // start();
  init();
});

// todo: rename to populate lists? refresh lists?
// populate lists
function init() {

  roleList = [];
  roleListObj = {};
  employeeList = [];
  employeeListObj = {};
  departmentList = [];
  departmentListObj = {};

  connection.query(sqlqueries.utilGetRoleIdsTitles(), function (err, results) {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      roleList.push(results[i].title);
    }
    roleListObj = results;
  });

  connection.query(sqlqueries.utilGetEmployeeIdsNames(), function (err, results) {
    if (err) throw err;
    employeeList.push('None');
    for (let i = 0; i < results.length; i++) {
      employeeList.push(results[i].first_name + ' ' + results[i].last_name);
    }
    employeeListObj = results;
  });

  connection.query(sqlqueries.utilGetDepartmentIdsNames(), function (err, results) {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      departmentList.push(results[i].name);
    }
    departmentListObj = results;
  })

  start();
}

function start() {
  inquirer
    .prompt({
      name: "userAction",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Employees", // required
        "View Employees by Manager", // bonus
        "View Employees by Department", // from demo app
        "View Departments", // required
        "View Roles", // required
        "View Department Budgets", // bonus
        new inquirer.Separator(),
        "Add Employee", // required
        "Add Department", // required
        "Add Role", // required
        new inquirer.Separator(),
        "Update Employee Role", // required
        "Update Employee Manager", // bonus
        new inquirer.Separator(),
        "Remove Employee", // bonus
        "Remove Department", // bonus
        "Remove Role", // bonus
        new inquirer.Separator(),
        "Exit",
        new inquirer.Separator()
      ]
    })
// todo: refactor function names to match ui
    .then(function (answer) {
      if (answer.userAction === "View Employees") {
        viewEmployees();
      }
      else if (answer.userAction === "View Employees by Manager") {
        viewEmployeesByManager();
      }
      else if (answer.userAction === "View Employees by Department") {
        viewEmployeesByDepartment();
      }
      else if (answer.userAction === "View Departments") {
        viewDepartments();
      }
      else if (answer.userAction === "View Roles") {
        viewRoles();
      }
      else if (answer.userAction === "View Department Budgets") {
        viewDepartmentBudgets();
      }
      else if (answer.userAction === "Add Employee") {
        addEmployee();
      }
      else if (answer.userAction === "Add Department") {
        addDepartment();
      }
      else if (answer.userAction === "Add Role") {
        addRole();
      }
      else if (answer.userAction === "Update Employee Role") {
        updateEmployeeRole();
      }
      else if (answer.userAction === "Update Employee Manager") {
        updateEmployeeManager();
      }
      else if (answer.userAction === "Remove Employee") {
        removeEmployee();
      }
      else if (answer.userAction === "Remove Department") {
        removeDepartment();
      }
      else if (answer.userAction === "Remove Role") {
        removeRole();
      }
      else {
        connection.end();
      }
    });
}

function viewEmployees() {
  connection.query(sqlqueries.viewEmployees(), function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function viewEmployeesByManager() {
  connection.query(sqlqueries.viewEmployeesByManager(), function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function viewEmployeesByDepartment() {
  connection.query(sqlqueries.viewEmployeesByDepartment(), function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function viewDepartments() {
  connection.query(sqlqueries.viewDepartments(), function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  })
}

function viewRoles() {
  connection.query(sqlqueries.viewRoles(), function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

// todo: implement
function viewDepartmentBudgets() {
  console.log('viewDepartmentBudgets() not implemented.');
  start();
}

function addEmployee() {
  inquirer.prompt([
    {
      message: "What is the employee's first name?",
      name: "newFirstName",
      validate: function validateFirstName(name) {
        return name !== '';
      },
      type: "input",

    },
    {
      message: "What is the employee's last name?",
      name: "newLastName",
      validate: function validateLastName(name) {
        return name !== '';
      },
      type: "input"
    },
    {
      message: "What is the employee's role?",
      name: "newRole",
      type: "list",
      choices: function () {
        var choiceArray = [];
        for (var key in roleListObj) {
          choiceArray.push(roleListObj[key].title);
        }
        return choiceArray;
      }
    },
    {
      message: "Who is the employee's manager?",
      name: "newManager",
      type: "list",
      choices: employeeList
    }
  ]).then(function (answer) {

    var newRoleId = findRoleId(answer.newRole, roleListObj).id;
    var newManagerId = (findEmployeeId(answer.newManager, employeeListObj)) ? findEmployeeId(answer.newManager, employeeListObj) : null;

    connection.query(sqlqueries.addEmployee(answer.newFirstName, answer.newLastName, newRoleId, newManagerId), function (err, results) {
      if (err) throw err;
      console.log('Added ' + answer.newFirstName + ' ' + answer.newLastName + ' to the database.')
      init();
    });

  });

}

function addDepartment() {
  inquirer.prompt([
    {
      message: "What is the department name?",
      name: "newDepartmentName",
      validate: function validateFirstName(newDepartmentName) {
        return newDepartmentName !== '';
      },
      type: "input",
    }
  ]).then(function (answer) {
    connection.query(sqlqueries.addDepartment(answer.newDepartmentName), function (err, results) {
      if (err) throw err;
      console.log(answer.newDepartmentName + ' added to the database.')
      init();
    });

  });

}

function addRole() {
  inquirer.prompt([
    {
      message: "What is the title?",
      name: "newTitle",
      validate: function validateFirstName(newTitle) {
        return newTitle !== '';
      },
      type: "input",

    },
    {
      message: "What is the salary?",
      name: "newSalary",
      validate: function validateLastName(newSalary) {
        return newSalary !== '';
      },
      type: "input"
    },
    {
      message: "Select a department:",
      name: "newDepartment",
      type: "list",
      choices: function () {
        var choiceArray = [];
        for (var key in departmentListObj) {
          choiceArray.push(departmentListObj[key].name);
        }
        return choiceArray;
      }
    }
  ]).then(function (answer) {

    var newRoleId = findDepartmentId(answer.newDepartment, departmentListObj).id;

    connection.query(sqlqueries.addRole(answer.newTitle, answer.newSalary, newRoleId, newRoleId), function (err, results) {
      if (err) throw err;
      console.log(answer.newTitle + ' added to the database.')
      init();
    });

  });

}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      message: "Which employee do you want to update?",
      name: "selectedEmployee",
      type: "list",
      choices: employeeList
    },
    {
      message: "Select their new role.",
      name: "selectedRole",
      type: "list",
      choices: roleList
    }
  ]).then(function (answer) {

    var employeeIdToUpdate = (findEmployeeId(answer.selectedEmployee, employeeListObj)) ? findEmployeeId(answer.selectedEmployee, employeeListObj) : null;
    var newRoleId = findRoleId(answer.selectedRole, roleListObj).id;

    connection.query(sqlqueries.updateEmployeeRole(employeeIdToUpdate, newRoleId), function (err, results) {
      if (err) throw err;
      console.log('The role for ' + answer.selectedEmployee + ' has been changed to ' + answer.selectedRole + '.');
      init();
    });
  });
}

function updateEmployeeManager() {
  inquirer.prompt([
    {
      message: "Which employee do you want to update?",
      name: "selectedEmployee",
      type: "list",
      choices: employeeList
    },
    {
      message: "Select their new manager.",
      name: "selectedManager",
      type: "list",
      choices: employeeList
    }
  ]).then(function (answer) {

    var employeeIdToUpdate = (findEmployeeId(answer.selectedEmployee, employeeListObj)) ? findEmployeeId(answer.selectedEmployee, employeeListObj) : null;

    if (answer.selectedManager === answer.selectedEmployee) {
      newManagerId = null;
    } else if (findEmployeeId(answer.selectedManager, employeeListObj)) {
      newManagerId = findEmployeeId(answer.selectedManager, employeeListObj);
    } else {
      newManagerId = null;
    }

    connection.query(sqlqueries.updateEmployeeManager(newManagerId, employeeIdToUpdate), function (err, results) {
      if (err) throw err;
      console.log('The manager for ' + answer.selectedEmployee + ' has been changed to ' + answer.selectedManager + '.');
      init();
    });
  });
}

function removeEmployee() {
  inquirer.prompt({
    message: "Which employee do you want to remove?",
    name: "employeeName",
    type: "list",
    choices: employeeList
  }).then(function (answer) {
    if (answer.employeeName === 'None') {
      start();
    } else {
      var employeeIdToRemove = (findEmployeeId(answer.employeeName, employeeListObj)) ? findEmployeeId(answer.employeeName, employeeListObj) : null;
      connection.query(sqlqueries.removeEmployee(employeeIdToRemove), function (err, results) {
        if (err) throw err;
        console.log(answer.employeeName + ' removed from the database.')
        init();
      });
    }
  });
}

// todo: implement
function removeDepartment() {
  inquirer.prompt([
    {
      message: "Which department do you want to remove?",
      name: "removeDepartment",
      type: "list",
      choices: departmentList
    }
  ]).then(function (answer) {
    console.log(answer.removeDepartment);
    var removeDepartmentId = findDepartmentId(answer.removeDepartment, departmentListObj).id;
    console.log(removeDepartmentId);
    connection.query(sqlqueries.removeDepartment(removeDepartmentId), function (err, results) {
      if (err) throw err;
      console.log(answer.removeDepartment + ' was removed from the database.')
      init();
    });
  });
}

// todo: implement
function removeRole() {
  inquirer.prompt([
    {
      message: "Which role do you want to remove?",
      name: "removeRole",
      type: "list",
      choices: roleList
    }
  ]).then(function (answer) {
    console.log(answer.removeRole);
    var removeRoleId = findRoleId(answer.removeRole, roleListObj).id;
    console.log(removeRoleId);
    connection.query(sqlqueries.removeRole(removeRoleId), function (err, results) {
      if (err) throw err;
      console.log(answer.removeRole + ' was removed from the database.')
      init();
    });
  });
}
