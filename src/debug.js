const jsl = require("svjsl");

const settings = require("../settings");

/**
 * Logs a message to the console if the `settings.debug.verboseLogging` property is set to true
 * @param {String} section 
 * @param {String} subSection 
 * @param {String} message 
 */
function debug(section, subSection, message)
{
    if(settings.debug.verboseLogging === true)
        console.log(`${jsl.colors.fg.yellow}[${jsl.colors.fg.blue}${section}${jsl.colors.fg.yellow}/${jsl.colors.fg.cyan}${subSection}${jsl.colors.fg.yellow}]${jsl.colors.rst} ${message}`);
}
module.exports = debug;
