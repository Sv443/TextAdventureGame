const jsl = require("svjsl");

const gameMgr = require("./gameMgr");
const SaveData = require("../SaveData");

/** @type {SaveData} */
var data = null;


/**
 * Initializes the save/load manager
 */
function init()
{
    if(data === null)
        data = new SaveData();
}

/**
 * Creates a save - only call this from the main process!
 * @param {Number} slot 0 = autosave
 * @returns {Boolean} Returns true if saved successfully, false if not
 */
function save(slot, saveData)
{
    data.setIsPaused(gameMgr.isPaused());

    jsl.unused(slot, saveData);
}

/**
 * Loads a save from the specified `slot` - only call this from the main process!
 * @param {Number} slot 0 = autosave
 * @returns {Object}
 */
function load(slot)
{
    let saveData = {};

    jsl.unused(slot);

    return saveData;
}

/**
 * Returns the current game's save data
 * @returns {Object}
 */
function getCurrentSaveData()
{
    return data.toObject();
}

module.exports = { init, save, load, getCurrentSaveData };
