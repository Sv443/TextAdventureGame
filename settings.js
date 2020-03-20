const packageJSON = Object.freeze(require("./package.json"));
const resolve = require("path").resolve;

const settings = {
    debug: {
        verboseLogging: true, // set to true to enable extra debug output
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
        windowsRootDir: resolve("./src/gui/"),
        mainMenuHTML: resolve("./src/gui/main.html")
    },
    game: {
        mainFolder: "TextIsland", // the main folder where everything will be located. This folder will be situated in the user's home directory
        save: { //#SECTION saving and loading
            settingsFile: "settings.json", // the file the settings will be saved to
        }
    },
    translate: {
        translationsFolder: "translations", // the folder where all translation files are located in
        langCodes: ["en", "de"], // the available language codes
    }
};

module.exports = settings;
