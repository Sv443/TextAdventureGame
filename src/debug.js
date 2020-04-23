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
    // format: [hh:mm:ss.msc] <section/subSection> message

    if(settings.debug.verboseLogging === true)
        console.log(`\x1b[2m[${getDateTime()}]${jsl.colors.rst} ${jsl.colors.fg.yellow}<${jsl.colors.fg.blue}${section}${jsl.colors.fg.yellow}/${jsl.colors.fg.cyan}${subSection}${jsl.colors.fg.yellow}>${jsl.colors.rst} %c${message}`, "color: inherit;");
}

function getDateTime()
{
    let d = new Date();

    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let milliseconds = d.getMilliseconds();

    let t = {
        h: (hours < 10 ? "0" : "") + hours,
        m: (minutes < 10 ? "0" : "") + minutes,
        s: (seconds < 10 ? "0" : "") + seconds,
        ms: (milliseconds < 10 ? "00" : (milliseconds < 100 ? "0" : "")) + milliseconds
    };

    return `${t.h}:${t.m}:${t.s}:${t.ms}`;
}

module.exports = debug;
