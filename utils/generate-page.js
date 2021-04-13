const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile("./dist/index.html", fileContent, err => {
            if(err){
                reject(err);
                return;
            }
            console.log("Portfolio Construction complete!");
            
            resolve({
                ok: true,
                message: "File Created"
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.writeFile("./dist/style.css", "", err => {
            if(err) {
                reject(err);
                return;
            }
        })
        fs.copyFile("./src/style.css", "./dist/style.css", err => {
            if(err) {
                reject(err);
                return;
            }
        });
        resolve({
            ok: true,
            message: "File Copied"
        });
    });
}

module.exports = {copyFile, writeFile};