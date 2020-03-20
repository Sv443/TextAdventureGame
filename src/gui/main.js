const { ipcRenderer } = require("electron");
const settings = require("../../settings");

const meta = {
    windowName: "Main Menu"
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#titleText").innerHTML = settings.info.name;

    document.querySelector("#btnSettings").addEventListener("click", () => ipcRenderer.send("openWindow", "settings"));

    document.querySelector("#btnDevGame").addEventListener("click", () => ipcRenderer.send("openGame"));

    document.querySelector("#btnExit").addEventListener("click", () => ipcRenderer.send("exit"));
});



module.exports = { meta };
