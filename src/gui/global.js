const jsl = require("svjsl");

/**
 * Capitalizes the first letter of a string
 * @param {String} str
 * @returns {String}
 */
function capitalize(str)
{
    return (str.substr(0, 1).toUpperCase() + str.substr(1, str.length - 1));
}




jsl.unused(capitalize);
