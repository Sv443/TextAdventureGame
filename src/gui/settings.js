const { ipcRenderer, shell, remote } = require("electron");
// const settings = require("../../settings");

const userSettings = require("../userSettings");
const HotkeyButton = require("./classes/HotkeyButton");

let unsavedSettings = false; // TODO: implement settings cache

const meta = {
    windowName: "Settings"
};


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#titleText").innerText = "Settings - Game";

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

    populateDisplayList();

    let dispList = document.getElementById("displayList");
    dispList.addEventListener("change", () => {
        /** @type {Electron.Display} */
        let d = remote.getGlobal("displays")[parseInt(dispList.value)];
        console.log(`Selected display #${parseInt(dispList.value)} - ID: ${d.id}`);
        
        ipcRenderer.send("setBounds", d.bounds);
        userSettings.set("general", "displayID", d.id);
    });

    registerHotkeyButtons();
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

    document.querySelector("#titleText").innerText = `Settings - ${capitalize(tabName)}`; // eslint-disable-line no-undef
}

function closeWindow()
{
    if(!unsavedSettings || (unsavedSettings && confirm("Discard the changes and quit to the main menu?")))
        ipcRenderer.send("openWindow", "main");
}

function saveSettings()
{
    unsavedSettings = false;
}

function populateDisplayList()
{
    remote.getGlobal("displays").forEach((disp, i) => {
        let opt = document.createElement("option");
        opt.classList.add("displaySelectOption");
        opt.value = i;
        opt.innerText = `#${i} - ${disp.bounds.width}x${disp.bounds.height}`;

        document.getElementById("displayList").appendChild(opt);
    });
}

function registerHotkeyButtons()
{
    let kb = {};

    kb.openMap = new HotkeyButton(document.getElementById("keybindOpenMap"), {
        key: (userSettings.get("keybinds", "openMap") || {key: "M"}).key
    }, function(hotkey) {
        userSettings.set("keybinds", "openMap", hotkey);
    }, "openMap");

    kb.openInventory = new HotkeyButton(document.getElementById("keybindOpenInventory"), {
        key: (userSettings.get("keybinds", "openInventory") || {key: "I"}).key
    }, function(hotkey) {
        userSettings.set("keybinds", "openInventory", hotkey);
    }, "openInventory");
}

module.exports = { meta };
