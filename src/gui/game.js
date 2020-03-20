const { ipcRenderer } = require("electron");
const settings = require("../../settings");

const autosave = require("../autosave");
const gameManager = require("../gameManager.js");

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
});

module.exports = { meta };
