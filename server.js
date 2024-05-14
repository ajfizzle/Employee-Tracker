const { Pool } = require('pg');
const inquirer = require('inquirer');
const cTable = require('console.table');
const cfonts = require('cfonts');

require('dotenv').config();

// Create a PostgreSQL pool with connection details
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Function to start the application of CFONT 
cfonts.say('\nSQL Employee Tracker', {
  font: 'block',              
  align: 'left',              
  colors: ['blue'],         
  background: 'transparent',  
  letterSpacing: 1,           
  lineHeight: 1,              
  space: true,                
  maxLength: '0',             
  gradient: false,            
  independentGradient: false, 
  transitionGradient: false,  
  env: 'node'                 
});

// Function to handle user interaction
function selectQuestion() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do today?',
        name: 'queryOptions',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add New Department',
          'Add New Role',
          'Add New Employee',
          'Update Employee Role',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.queryOptions) {
        case 'View All Departments':
          manageDepartments();
          break;
        case 'View All Roles':
          manageRoles();
          break;
        case 'View All Employees':
          viewEmployees();
          break;
        case 'Add New Department':
          addNewDepartment();
          break;
        case 'Add New Role':
          addNewRole();
          break;
        case 'Add New Employee':
          addNewEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Quit':
          exitApp();
          break;
      }
    });
}

// Function to handle viewing all departments
async function manageDepartments() {
  const res = await pool.query('SELECT * FROM department ORDER BY department_id');
  console.log('\n');
  console.table(res.rows);
  selectQuestion();
}

// Function to handle viewing all roles
async function manageRoles() {
  const res = await pool.query('SELECT * FROM role');
  console.log('\n');
  console.table(res.rows);
  selectQuestion();
}

// Function to handle viewing all employees
async function viewEmployees() {
  const res = await pool.query('SELECT * FROM employee');
  console.log('\n');
  console.table(res.rows);
  selectQuestion();
}

// Function to add a new department
async function addNewDepartment() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the department you would like to add?',
      name: 'addDepartment',
    },
  ]);
  
  await pool.query('INSERT INTO department (name) VALUES ($1)', [answer.addDepartment]);
  console.log('\nNew department added successfully!\n');
  selectQuestion();
}

// Function to add a new role
async function addNewRole() {
  const departments = await pool.query('SELECT * FROM department');
  const departmentChoices = departments.rows.map((dept) => ({
    name: dept.name,
    value: dept.department_id,
  }));

  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the title of the role you would like to add?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'What is the salary of the role?',
      name: 'salary',
    },
    {
      type: 'list',
      message: 'Select the department for this role:',
      name: 'department_id',
      choices: departmentChoices,
    },
  ]);

  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [
    answer.title,
    answer.salary,
    answer.department_id,
  ]);

  console.log('\nNew role added successfully!\n');
  selectQuestion();
}


// Function to add a new employee
async function addNewEmployee() {
  try {
    // Retrieve list of roles from the database
    const results = await pool.query("SELECT role_id, title FROM role");
    const roles = results.rows.map(({ role_id, title }) => ({
      name: title,
      value: role_id,
    }));

    // Retrieve list of employees from the database to use as managers
    const employees = await pool.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee");
    const managers = employees.rows.map(({ id, name }) => ({
      name,
      value: id,
    }));

     // Prompt the user for employee information
     const answers = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name:",
      },
      {
        type: "list",
        name: "roleId",
        message: "Select the employee role:",
        choices: roles,
      },
      {
        type: "list",
        name: "managerId",
        message: "Select the employee manager:",
        choices: [
          { name: "None", value: null },
          ...managers,
        ],
      },
    ]);

     // Insert the employee into the database
     const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
     const values = [answers.firstName, answers.lastName, answers.roleId, answers.managerId];
     await pool.query(sql, values);
 
     console.log("Employee added successfully");
     selectQuestion(); // Return to main menu
   } catch (error) {
     console.error("Error adding employee:", error.message);
   }
 }


// Function to update employee role
async function updateEmployeeRole() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: 'Which employee ID would you like to update the role for?',
      name: 'employee_id',
    },
    {
      type: 'input',
      message: 'What is the new role ID for this employee?',
      name: 'role_id',
    },
  ]);

  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [
    answer.role_id,
    answer.employee_id,
  ]);
  console.log('\nEmployee role updated successfully!\n');
  selectQuestion();
}

// Function to exit the application
function exitApp() {
  pool.end(); // Close the connection pool
  console.log('\nExiting Employee Tracker...');
  process.exit(0); // Exit the process
}

// Start the application by invoking the selectQuestion function
selectQuestion();
