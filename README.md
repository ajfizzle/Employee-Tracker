# Employee Tracker System

Module 12 Challenge

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents:

- [Description](#Description)
- [Acceptance Criteria](#Acceptance-Criteria)
- [Technologies](#Technologies)
- [Installation](#Installation)
- [Usage](#Usage)
- [Preview / Screenshot](#Preview-Screenshot)
- [Contact](#Contact)
- [References](#References)
- [License](#License)

## Description

This command-line application allows business owners to view, manage, and organize departments, roles, and employees within their company.

## Acceptance Criteria

- GIVEN a command-line application that accepts user input
- WHEN I start the application
  - THEN I am presented with the following options:
    - view all departments
    - view all roles
    - view all employees
    - add a department
    - add a role
    - add an employee
    - update an employee role
- WHEN I choose to view all departments
  - THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
  - THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
  - THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
  - THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
  - THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
  - THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
  - THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Technologies Used

- express
- inquirer@8.2.4
- pg
- console.table
- dotenv
- cfonts

## Installation

To run this application locally, follow these steps:

- Simply clone the repository
- Set up your PostgreSQL database and configure connection details in a `.env` file.
- Install the following dependencies:
  - `npm i`
  - `npm init -y`
  - `npm i express`
  - `npm i inquirer@8.2.4`
  - `npm i pg`
  - `npm i console.table`
  - `npm i dotenv`
  - `npm i cfonts`
    ## Note: Ensure "package.json" is configured with the accurate attributes.
  - Run the application using `node server.js`.

## Usage

- To start the application, run `node server.js` or `npm start` in your terminal.
- Follow the on-screen prompts to navigate through different options and manage your employee database.

## Preview / Screenshot

<video controls src="Employee-Tracker.mp4" title="Title"></video>
![alt text](<Employee Tracker.gif>)

## Contact

For more projects and information about the developer, please visit:

- https://ajfizzle.github.io/Employee_Tracker
- https://github.com/ajfizzle/Employee_Tracker

## References:

- UT Austin Bootcamp - UTA-VIRT-FSF-PT-02-2024-U-LOLC
- https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- https://expressjs.com/en/starter/installing.html
- https://www.npmjs.com/package/inquirer/v/8.2.4
- https://docs.npmjs.com/cli/v10/commands/npm-init
- https://www.npmjs.com/package/dotenv#-install
- https://www.npmjs.com/package/cfonts
- https://developer.mozilla.org/en-US/docs/Web/API/console/table_static
- https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546
- https://github.com/Martin-BG/SoftUni-DatabaseBasics-MySQL/blob/master/07.%20Subqueries%20And%20Joins/Subqueries%20And%20Joins%20Exercise.sql
- https://www.w3resource.com/mysql-exercises/insert-into-statement/insert-into-statement-exercise-14.php

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
