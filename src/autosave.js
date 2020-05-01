const jsl = require("svjsl");
const saveMgr = require("./managers/saveMgr");

/**
 * Creates an autosave and saves it to save slot 0
 */
function create()
{
    return new Promise((resolve, reject) => {
        jsl.unused(reject);

        let saveData = {};
        saveMgr.save(0, saveData);

        return resolve();
    });
}

function load()
{
    return new Promise((resolve, reject) => {
        jsl.unused(reject);

        let loadData = saveMgr.load(0);
        jsl.unused(loadData);

        return resolve();
    });
}

module.exports = { create, load };
