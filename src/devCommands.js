const jsl = require("svjsl");

const componentMgr = require("./componentMgr");

const Player = require("./components/Player");
/** @type {Player} */
let player;

jsl.unused(Player);


/**
 * Initializes the dev commands module
 * @param {Player} playerObj 
 */
function init(playerObj)
{
    player = playerObj;
}

/**
 * Gives the player `itemName` x `count` - if `count` is empty or less than 1, it defaults to 1
 * @param {String} itemName 
 * @param {Number} [count=1] 
 * @returns {Boolean|String} Returns true if the operation was successful or a string containing an error message if not
 */
function give(itemName, count)
{
    count = parseInt(count);

    if(jsl.isEmpty(itemName))
        return `No item name specified`;

    if(jsl.isEmpty(count) || count <= 0 || isNaN(count))
        count = 1;
    
    if(componentMgr.exists("item", itemName))
        player.inventory.addItem(itemName);
    else
        return `The item with the name "${itemName}" doesn't exist.`;
}

/**
 * Unlocks a milestone
 * @param {String} milestone
 * @returns {Boolean|String} Returns true if the milestone was unlocked successfully or a string containing an error message if not
 */
function unlockMilestone(milestone)
{
    if(typeof milestone !== "string")
        return `Milestone is not of type string but instead ${typeof milestone}`;

    player.milestones.unlock(milestone);
    return true;
}

/**
 * Kills the player
 * @param {String} cause
 */
function kill(cause)
{
    player.kill(cause);
}

module.exports = { init, give, unlockMilestone, kill };
