const { ipcRenderer } = require("electron");
const settings = require("../../settings");

const meta = {
    windowName: "Main Menu"
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#titleText").innerHTML = settings.info.name;

    document.querySelector("#btnExit").addEventListener("click", () => ipcRenderer.send("exit"));
});



module.exports = { meta };
