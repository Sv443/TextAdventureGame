const jsl = require("svjsl");
const col = jsl.colors.fg;
const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");

const validateComponents = require("./validateComponents");
const debug = require("./debug");

const settings = require("../settings");

const comp = Object.freeze({
    items: require("../data/components/items.json"),
    structs: require("../data/components/structures.json"),
    effects: require("../data/components/effects.json")
});



//#MARKER init

function preInit()
{
    return new Promise((resolve, reject) => {
        debug("PreInit", "ValidateComponents", "Starting component validation");
        validateComponents(comp).then(() => {
            global.comp = comp;
        }).catch(err => {
            err.forEach(error => {
                console.error(`${col.yellow}[PreInit/ValidateComponents] ${col.red}Error while validating an object of the "${error.component}" component: ${error.whatsWrong}${jsl.colors.rst}`);
            });
            return reject(`There ${err.length > 1 ? "were some errors" : "was an error"} while validating components.`);
        });
        return resolve();
    });
}

/**
 * Initialize the Electron process and the main window
 */
function init()
{
    debug("Init", "ElectronWindow", "Initializing Electron window");
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
    debug("PreInit", "InitAll", "Starting initialization");
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
    debug("MainController", "IpcMain", "IpcMain got exit command - exiting application...");
    if(process.platform !== "darwin")
        return app.quit();
});



initAll();
