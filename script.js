const fs = require('fs');
const generatePage = require('./src/page-template.js');
const profileDataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = (profileDataArray) => {
    const [name, github] = profileDataArray;
    writeHTMLFile(generatePage(name, github));
}

const writeHTMLFile = html => fs.writeFile("index.html", html, err => {
    if(err) throw err;
    console.log("Portfolio Construction complete!");
});

printProfileData(profileDataArgs);

