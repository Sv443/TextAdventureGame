const jsl = require("svjsl");

/**
 * Creates a save
 * @param {Number} slot 0 = autosave
 * @returns {Boolean} Returns true if saved successfully, false if not
 */
function save(slot, saveData)
{
    jsl.unused(slot, saveData);
}

/**
 * Loads a save from the specified `slot`
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
 * Creates an object of the current game's save data and returns it
 * @returns {Object}
 */
function getCurrentSaveData()
{
    let milestones = process.game.unlockedMilestones;
    let items = process.game.player.inventory;
    let structs = process.game.player.structures;
    let effects = process.game.player.effects;

    return {
        name: process.game.player.name,
        character: process.game.player.character,
        unlockedMilestones: milestones,
        possessions: {
            items: items,
            structs: structs,
            effects: effects
        }
    };
}

module.exports = { save, load, getCurrentSaveData };
