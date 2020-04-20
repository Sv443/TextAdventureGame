const { ipcRenderer } = require("electron");
// const settings = require("../../settings");

const autosave = require("../autosave");
const gameManager = require("../gameMgr.js");

const meta = {
    windowName: "Game"
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btnExitM").addEventListener("click", () => ipcRenderer.send("openWindow", "main"));
    document.querySelector("#btnExitD").addEventListener("click", () => {
        autosave.create().then(() => {
            gameManager.unloadGame().then(() => {
                ipcRenderer.send("exit");
            }).catch(err => {
                alert(`There was an error while unloading the game: ${err}`);
                return ipcRenderer.send("exit");
            });
        }).catch(err => {
            alert(`There was an error while creating an autosave: ${err}`);
            return ipcRenderer.send("exit");
        });
    });

    document.addEventListener("keydown", e => {
        if(e.key.toLowerCase() == "escape")
            togglePauseMenu();
    });
});

/**
 * Toggles the pause menu. If the `enable` parameter is used, it will not toggle but instead set the paused state equal to that parameter's value
 * @param {Boolean} [enabled] 
 * @returns {Boolean|String} Returns `true`, if the state could be set, a string containing an error message if not
 */
function togglePauseMenu(enabled)
{
    if(typeof enabled === "undefined") // lgtm [js/unneeded-defensive-code]
    {
        if(gameManager.isPaused())
        {
            document.querySelector("#pauseMenu").dataset.opened = "false";
            gameManager.setPaused(false);
        }
        else
        {
            document.querySelector("#pauseMenu").dataset.opened = "true";
            gameManager.setPaused(true);
        }
        return true;
    }
    else if(typeof enabled === "boolean")
    {
        if(enabled === true)
        {
            document.querySelector("#pauseMenu").dataset.opened = "true";
            gameManager.setPaused(true);
        }
        else if(enabled === false)
        {
            document.querySelector("#pauseMenu").dataset.opened = "false";
            gameManager.setPaused(false);
        }
        return true;
    }
    else return `Parameter "enabled" is not of type "boolean" or "undefined" - got unexpected type "${typeof enabled}"`;
}

/**
 * Unloads the game
 * @returns {Promise<undefined, String>}
 */
function unloadGame()
{
    return new Promise((resolve, reject) => {
        if(!document)
            return reject("Error: document is undefined - the window was either not loaded or was already unloaded");
        else
        {
            // document obj exists, TODO: do the unloading:
            return resolve();
        }
    });
}

module.exports = { meta, unloadGame };
