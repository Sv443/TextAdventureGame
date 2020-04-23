const jsl = require("svjsl");
const save = require("./save");

/**
 * Creates an autosave and saves it to save slot 0
 */
function create()
{
    return new Promise((resolve, reject) => {
        let saveData = {};
        save.save(0, saveData);

        return resolve();
    });
}

function load()
{
    return new Promise((resolve, reject) => {
        let loadData = save.load(0);
        jsl.unused(loadData);

        return resolve();
    });
}

module.exports = { create, load };
