const jsl = require("svjsl");
const { app, BrowserWindow, Menu, MenuItem, globalShortcut, ipcMain } = require("electron");

const settings = require("../settings");

const comp = Object.freeze({
    items: require("../data/items.json"),
    structs: require("../data/structures.json"),
    effects: require("../data/effects.json")
});



//#MARKER init

function preInit()
{
    return new Promise((resolve, reject) => {
        return resolve();
    });
}

/**
 * Initialize the Electron process and the main window
 */
function init()
{
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: settings.resources.icon,
        frame: false
    });

    // let devMenu = new MenuItem();
    // devMenu.click = () => win.webContents.openDevTools();
    // devMenu.accelerator = process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I";
    // let menu = new Menu();
    // menu.append(devMenu);

    win.setMenu(null);

    globalShortcut.register(process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I", () => win.webContents.openDevTools());

    // win.setMenuBarVisibility(false);

    win.loadFile(settings.menu.mainMenuHTML);

    global.mainWindow = win;
}

/**
 * Sends an error message to the console
 * @param {String} section
 * @param {Error|String} err
 */
function initError(section, err)
{
    console.error(`Error in ${section}: ${err}`);
}

/**
 * Initializes everything
 */
function initAll()
{
    preInit().then(() => {
        app.whenReady().then(() => {
            init();
        })/*.catch(err => initError("ElectronInit", err))*/;
    })/*.catch(err => initError("PreInit", err))*/;
}

app.on("window-all-closed", () => {
    if(process.platform !== "darwin")
        return app.quit();
});

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0)
        return initAll();
});

initAll();