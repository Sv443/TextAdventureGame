const electron = require("electron");
const path = require("path");
const fs = require("fs");
const jsl = require("svjsl");

const settings = require("../settings");
const debug = require("./debug");


/**
 * @typedef {("general"|"sound"|"graphics"|"keybinds")} Section
 */


/**
 * Initializes the UserSettings module
 * @returns {Promise}
 */
function init()
{
    return new Promise((resolve, reject) => {
        try
        {
            let basePath = getBasePath();
            let settingsPath = getSettingsFilePath();

            if(!fs.existsSync(basePath))
                fs.mkdirSync(basePath);

            if(!fs.existsSync(settingsPath))
                fs.writeFileSync(settingsPath, JSON.stringify({}, null, 4));
            
            debug("UserSettings", "Init", `Initialized UserSettings module. Base dir is "${basePath}" - settings file is "${settingsPath}"`);

            return resolve();
        }
        catch(err)
        {
            return reject(err);
        }
    });
}

/**
 * Saves a setting to the user settings file
 * @param {Section} section 
 * @param {String} key 
 * @param {String|Number|Boolean|null|NaN} value Any JSON-compatible value
 */
function set(section, key, value)
{
    let settingsFilePath = getSettingsFilePath();
    debug("UserSettings", "Set", `Saving value "${value}" to "${section}.${key}"`);

    let userSettings = JSON.parse(fs.readFileSync(settingsFilePath).toString());
    if(typeof userSettings[section] !== "object")
        userSettings[section] = {};
    
    userSettings[section][key] = value;

    fs.writeFileSync(settingsFilePath, JSON.stringify(userSettings, null, 4));
}

/**
 * Loads a setting from the user settings file
 * @param {Section} section 
 * @param {String} key 
 * @returns {String|Number|Boolean|Object|null}
 */
function get(section, key)
{
    let settingsFilePath = getSettingsFilePath();

    let userSettings = JSON.parse(fs.readFileSync(settingsFilePath).toString());

    if(typeof userSettings[section] === "undefined")
    {
        debug("UserSettings", "Get", `Loaded value "null" (section nonexistant) (from "${section}.${key}")`);
        return null;
    }
    else if(userSettings[section][key] === undefined)
    {
        debug("UserSettings", "Get", `Loaded value "null" (key nonexistant) (from "${section}.${key}")`);
        return null;
    }
    else
    {
        let jsonified = "";
        try
        {
            jsonified = JSON.stringify(userSettings[section][key]);

            debug("UserSettings", "Get", `Loaded value "${jsonified}" (from "${section}.${key}")`);
            return userSettings[section][key];
        }
        catch(err)
        {
            jsl.unused(err);

            debug("UserSettings", "Get", `Loaded value "${userSettings[section][key]}" (from "${section}.${key}")`);
            return userSettings[section][key];
        }
    }
}

/**
 * Returns the path to the main game folder
 * @returns {String}
 */
function getBasePath()
{
    return path.resolve(path.join((electron.app || electron.remote.app).getPath("appData"), settings.game.mainFolder));
}

/**
 * Returns the path to the settings file
 * @returns {String}
 */
function getSettingsFilePath()
{
    return path.resolve(path.join(getBasePath(), settings.game.save.settingsFile));
}

module.exports = { init, set, get, getBasePath, getSettingsFilePath };
