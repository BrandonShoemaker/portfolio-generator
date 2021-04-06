const profileDataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = (profileDataArray) => {
    profileDataArray.forEach(profileItem => {
        console.log("===========================");
        console.log(profileItem);
    });
}

printProfileData(profileDataArgs);

