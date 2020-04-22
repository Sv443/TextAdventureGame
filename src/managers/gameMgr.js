const gameModule = require("../gui/game");

var game = {
    paused: false
}

/**
 * Unloads the game and makes sure it is safe to close the window
 */
function unloadGame()
{
    return new Promise((resolve, reject) => {
        try
        {
            gameModule.unloadGame().then(() => {
                return resolve();
            }).catch(err => {
                return reject(err);
            });
        }
        catch(err)
        {
            return reject(`General Error while unloading the game: ${err}`);
        }
    });
}

/**
 * Checks whether the game is currently paused
 * @returns {Boolean}
 */
function isPaused()
{
    return game.paused;
}

/**
 * Sets the pause state of the game.
 * Setting the game to paused will pause all events on the game window and main game process
 * @param {Boolean} paused 
 * @returns {Boolean} Returns true, if the pause state was set, false if not
 */
function setPaused(paused)
{
    if(typeof paused === "boolean")
    {
        game.paused = paused;
        return true;
    }
    else
    {
        game.paused = false;
        return false;
    }
}

module.exports = { unloadGame, isPaused, setPaused };
