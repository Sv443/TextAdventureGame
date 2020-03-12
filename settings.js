const packageJSON = Object.freeze(require("./package.json"));
const resolve = require("path").resolve;

const settings = {
    debug: {
        verboseLogging: false,      // set to true to enable extra debug output
    },
    info: {
        name: "Text Island",                                      // the name of the project
        desc: packageJSON.description,                            // the description from package.json
        projGitHub: "https://github.com/Sv443/TextAdventureGame", // URL to the project's GitHub page
        version: packageJSON.version,                             // the version as a string
        versionInt: packageJSON.version.split("."),               // the version as a number array
        author: packageJSON.author,                               // the author information from package.json
        privacyPolicyUrl: "https://sv443.net/privacypolicy/en"    // URL to the privacy policy
    },
    resources: {
        icon: resolve("./resources/other/icon.ico")
    },
    menu: {
        mainMenuHTML: resolve("./src/gui/main.html")
    }
};

module.exports = settings;
