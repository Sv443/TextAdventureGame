const { ipcRenderer, remote } = require("electron");
// const settings = require("../../settings");

const debug = require("../debug");
const autosave = require("../autosave");
// const gameManager = require("../managers/gameMgr");

const meta = {
    windowName: "Game"
};


if(remote == undefined) // if not in renderer process, cancel loading
    return;

document.domWasLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
    debug("Game", "Init", `Loading from context ${remote ? "Renderer" : "Main"}`);
    
    if(document.domWasLoaded) // event was firing twice for some reason and this is only a very crude workaround
        return;
    document.domWasLoaded = true;

    debug("Game", "DOM", "DOM is ready");
    
    document.querySelector("#btnExitM").addEventListener("click", () => {
        //TODO: same prompt as in exit to desktop
        ipcRenderer.send("openWindow", "main");
    });
    document.querySelector("#btnExitD").addEventListener("click", () => {
        debug("Game", "PauseMenu", "Exit to Desktop button was clicked, opening confirmation prompt...");
        remote.dialog.showMessageBox(remote.getCurrentWindow(), {
            title: "Quit to Desktop",
            message: "Do you want to save before quitting?",
            type: "question",
            buttons: [
                "Yes",
                "No",
                "Cancel"
            ],
            cancelId: 2,
            defaultId: 0
        }).then(result => {
            let gameMgr = require("../managers/gameMgr");

            switch(result.response)
            {
                case 0: // yes
                    autosave.create().then(() => {
                        gameMgr.unloadGame().then(() => {
                            return ipcRenderer.send("exit");
                        }).catch(err => {
                            alert(`There was an error while unloading the game: ${err}\nPlease try manually saving in the pause menu.`);
                        });
                    }).catch(err => {
                        return alert(`There was an error while creating an autosave: ${err}\nPlease try manually saving in the pause menu.`);
                    });
                break;
                case 1: // no
                    gameMgr.unloadGame().then(() => {
                        return ipcRenderer.send("exit");
                    }).catch(err => {
                        alert(`There was an error while unloading the game: ${err}\nPlease try manually saving in the pause menu.`);
                    });
                break;
                case 2: // cancel
                    return;
            }
        }).catch(err => {
            return alert(`There was an error while showing the exit confirmation dialog: ${err}\nPlease try manually saving in the pause menu and exiting again.`);
        })
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
function togglePauseMenu(enabled = undefined)
{
    let gameMgr = require("../managers/gameMgr");
    if(typeof enabled === "undefined") // lgtm [js/unneeded-defensive-code]
    {
        if(gameMgr.isPaused())
        {
            debug("Game", "PauseMenu", "Closing PauseMenu");
            document.querySelector("#pauseMenu").dataset.opened = "false";
            gameMgr.setPaused(false);
        }
        else
        {
            debug("Game", "PauseMenu", "Opening PauseMenu");
            document.querySelector("#pauseMenu").dataset.opened = "true";
            gameMgr.setPaused(true);
        }
        return true;
    }
    else if(typeof enabled === "boolean")
    {
        if(enabled === true)
        {
            debug("Game", "PauseMenu", "Opening PauseMenu");
            document.querySelector("#pauseMenu").dataset.opened = "true";
            gameMgr.setPaused(true);
        }
        else if(enabled === false)
        {
            debug("Game", "PauseMenu", "Closing PauseMenu");
            document.querySelector("#pauseMenu").dataset.opened = "false";
            gameMgr.setPaused(false);
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
