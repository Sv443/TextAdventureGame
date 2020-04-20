const jsl = require("svjsl");
const save = require("./save");

/**
 * Creates an autosave and saves it to save slot 0
 */
function create()
{
    let saveData = {};
    save.save(0, saveData);
}

function load()
{
    let loadData = save.load(0);
    jsl.unused(loadData);
}

module.exports = { create, load };
