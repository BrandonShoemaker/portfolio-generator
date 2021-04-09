const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template.js');


const promptUser = () => {
    return inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name? (Required)",
            validate: nameInput => {
                if(nameInput) return true;
                else {
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is your Github username? (Required)",
            validate: githubInput => {
                if(githubInput) return true;
                else {
                    console.log("Please enter your Github username!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "Would you like to add an about section?",
            default: true
        },
        {
            type: "input",
            name: "about",
            message: "Tell us a little about you: ",
            when: ({confirmAbout}) => {
                if(confirmAbout) return true;
                return false;
            }
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself"
        }
    ])
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

        fs.writeFile("index.html", pageHTML, err => {
            if(err) throw err;
            console.log("Portfolio Construction complete!");
        });

    });
};

const promptProject = (portfolioData) =>{
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log("\n===================\n"+
                " Add a New Project     \n" +
                "===================\n");
    return inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is name of your project? (Required)",
            validate: projectNameInput => {
                if(projectNameInput) return true;
                else {
                    console.log("Please enter your projects name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: projectDescription => {
                if(projectDescription) return true;
                else {
                    console.log("Please enter a description for your project!");
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What languages did you use to make this project? (Check all that apply)",
            choices: ['JavaScipt', 'CSS', 'HTML', 'ES6', 'JQuery', 'Bootstrap', 'Node']
        },
        {
            type: "input",
            name: "link",
            message: "Enter the Github link to your project. (Required)",
            validate: linkInput => {
                if(linkInput) return true;
                else {
                    console.log("Please enter your project link!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to add another project?",
            default: false
        }

    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject)
            return promptProject(portfolioData);
        else
            return portfolioData;
    })
}

promptUser();