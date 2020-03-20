const { ipcRenderer, shell } = require("electron");
// const settings = require("../../settings");

const meta = {
    windowName: "Settings"
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#titleText").innerHTML = "Settings - Game";

    document.querySelector("#btnCancel").addEventListener("click", () => {
        closeWindow();
    });

    document.querySelector("#btnSave").addEventListener("click", () => {
        saveSettings();
        ipcRenderer.send("openWindow", "main");
    });

    document.querySelectorAll(".tabSwitchButton").forEach(elem => {
        elem.addEventListener("click", () => switchTab(elem.dataset.tab));
    });

    document.addEventListener("keydown", e => {
        if(e.key.toLowerCase() === "escape")
            closeWindow();
    });

    document.querySelector("#licenseTxt").addEventListener("click", () => shell.openExternal("https://sv443.net/LICENSE"));
});

function switchTab(tabName)
{
    document.querySelectorAll(".settingsTab").forEach(tabElem => {
        if(tabElem.dataset.tab == tabName)
            tabElem.style.display = "block";
        else tabElem.style.display = "none";
    });

    document.querySelectorAll(".tabSwitchButton").forEach(swBtn => {
        if(swBtn.dataset.tab == tabName)
            swBtn.classList.add("active");
        else if(swBtn.classList.contains("active"))
            swBtn.classList.remove("active");
    });

    document.querySelector("#titleText").innerHTML = `Settings - ${capitalize(tabName)}`; // eslint-disable-line no-undef
}

function closeWindow()
{
    if(confirm("Discard the changes and quit to the main menu?"))
        ipcRenderer.send("openWindow", "main");
}

function saveSettings()
{

}



module.exports = { meta };
