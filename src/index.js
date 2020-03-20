const jsl = require("svjsl");
const path = require("path");
const col = jsl.colors.fg;
const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");

const validateComponents = require("./validateComponents");
const userSettings = require("./userSettings");
const debug = require("./debug");

const settings = require("../settings");

const comp = Object.freeze({
    items: require("../data/components/items.json"),
    structs: require("../data/components/structures.json"),
    effects: require("../data/components/effects.json")
});
const inDebugger = (typeof v8debug === "object" || /--debug|--inspect/.test(process.execArgv.join(" ")));


//#MARKER init

function preInit()
{
    return new Promise((resolve, reject) => {
        debug("PreInit", "ValidateComponents", "Starting component validation");
        validateComponents(comp).then(() => {
            process.comp = comp;

            userSettings.init().then(() => {
                
                return resolve();

            }).catch(err => {
                //userSettings.init()
                return reject(`Error while initializing UserSettings module: ${err}`);
            });
        }).catch(err => {
            //validateComponents()
            err.forEach(error => {
                console.error(`${col.yellow}[PreInit/ValidateComponents] ${col.red}Error while validating an object of the "${error.component}" component: ${error.whatsWrong}${jsl.colors.rst}`);
            });
            return reject(`There ${err.length > 1 ? "were some errors" : "was an error"} while validating components.`);
        });
    });
}

/**
 * Initialize the Electron process and the main window
 */
function init()
{
    debug("Init", "Init", "Initializing Electron window");
    let win = new BrowserWindow({
        width: 800,
        height: 550,
        minWidth: 500,
        minHeight: 350,
        webPreferences: {
            nodeIntegration: true
        },
        icon: settings.resources.icon,
        frame: false,
        hasShadow: true,
        resizable: true
    });
    win.setMenu(null);

    // Shortcut for dev tools
    if(inDebugger || userSettings.get("general", "devMode") === true)
        globalShortcut.register(process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I", () => win.webContents.openDevTools());

    win.loadFile(settings.menu.mainMenuHTML);

    process.mainWindow = win;
}

/**
 * Initializes everything
 */
function initAll()
{
    debug("PreInit", "InitAll", "Starting initialization");
    preInit().then(() => {
        app.whenReady().then(() => {
            return init();
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
    debug("IpcMain", "Exit", "IpcMain got exit command - exiting application...");
    if(process.platform !== "darwin")
        return app.quit();
});

ipcMain.on("openWindow", (sender, name) => {
    jsl.unused(sender);

    debug("IpcMain", "OpenWindow", `Opening window "${name}"`);

    process.mainWindow.loadFile(path.join(settings.menu.windowsRootDir, `${name}.html`));
});



initAll();
