const jsl = require("svjsl");
const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");

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
        width: 400,
        height: 450,
        webPreferences: {
            nodeIntegration: true
        },
        icon: settings.resources.icon,
        frame: false,
        transparent: true,
        resizable: true
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

//#MARKER IPC

ipcMain.on("exit", () => {
    if(process.platform !== "darwin")
        return app.quit();
});



initAll();
