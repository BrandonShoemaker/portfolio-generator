const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template.js');
const Choices = require('inquirer/lib/objects/choices');
const PromptUI = require('inquirer/lib/ui/prompt');

// const pageHTML = generatePage(name, github);

// fs.writeFile("index.html", pageHTML, err => {
//     if(err) throw err;
//     console.log("Portfolio Construction complete!");
// });

const promptUser = () => {
    return inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your Github username?"
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself"
        }
    ])
    
};

const promptProject = (portfolioData) =>{
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log("\n===================\n"+
                " Add a New Project     \n" +
                "===================\n");
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is name of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)"
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
            message: "Enter the Github link to your project. (Required)"
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
promptUser()
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData)
});;
