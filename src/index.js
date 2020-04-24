const jsl = require("svjsl");
const path = require("path");
const col = jsl.colors.fg;
col.rst = jsl.colors.rst;
const { app, BrowserWindow, globalShortcut, ipcMain, screen } = require("electron");

const validateComponents = require("./validateComponents");
const userSettings = require("./userSettings");
const debug = require("./debug");
const displayMgr = require("./managers/displayMgr");
const updateCheck = require("./updateCheck");
const rpcMgr = require("./managers/rpcMgr");

const settings = require("../settings");

const comp = Object.freeze({
    items: require("../data/components/items.json"),
    structs: require("../data/components/structures.json"),
    effects: require("../data/components/effects.json")
});
const inDebugger = jsl.inDebugger();


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
        frame: true,
        hasShadow: false,
        resizable: false,
        fullscreen: true
    });
    win.setMenu(null);

    let dispID = userSettings.get("general", "displayID");
    if(typeof dispID === "number")
    {
        try
        {
            let scr = new Object(screen);
            displayMgr.listDisplays(scr).forEach(d => {
                if(d.id == dispID)
                    displayMgr.setDisplay(dispID, scr);
            });
        }
        catch(err)
        {
            jsl.unused(err);
        }
    }


    // Shortcut for dev tools
    if(inDebugger || userSettings.get("general", "devMode") === true)
    {
        globalShortcut.register(process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I", () => {
            if(process.mainWindow && !process.mainWindow.isDestroyed())
                process.mainWindow.webContents.openDevTools();
        });
    }

    // screen.getAllDisplays().forEach(disp => {
    //     debug("Init", "MultiScreen", `Detected screen with ID ${disp.id} - bounds: ${disp.bounds.width}x${disp.bounds.height}`);
    // });

    win.loadFile(settings.menu.mainMenuHTML);

    rpcMgr.init();

    module.exports.mainWindow = win;
    process.mainWindow = win;
}

/**
 * Initializes everything
 * @returns {void}
 */
function initAll()
{
    debug("PreInit", "InitAll", "Starting initialization");

    app.allowRendererProcessReuse = true;

    preInit().then(() => {
        app.whenReady().then(() => {
            updateCheck().then(updateInfo => {
                if(updateInfo.available)
                {
                    debug("InitAll", "UpdateCheck", `${col.red}A new version of ${settings.info.name} is available${col.rst} - Current version: v${updateInfo.oldVersion} - New version: v${updateInfo.newVersion}`);
                    alert(`A new version of ${settings.info.name} is available. Please visit this page to download it:\nhttps://github.com/Sv443/TextAdventureGame/releases\n\nCurrent version: v${updateInfo.oldVersion} - New version: v${updateInfo.newVersion}`);
                }
                else
                    debug("InitAll", "UpdateCheck", `${col.green}${settings.info.name} is up to date${col.rst} - Message: ${updateInfo.message}`);

                refreshDisplays();
                return init();
            })/*.catch(err => initError("UpdateCheck", err))*/;
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

function refreshDisplays()
{
    let disps = [];
    displayMgr.listDisplays(screen).forEach(disp => {
        let { id, width, height, bounds } = disp;
        disps.push({ id, width, height, bounds });
    });
    global.displays = disps;
}

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
    module.exports.mainWindow = process.mainWindow;
});

/**
 * Sets the window's bounds
 * @param {Electron.Rectangle} bounds 
 */
function setBounds(bounds)
{
    if(!process.mainWindow)
        throw new Error(`Can't set bounds because the mainWindow object doesn't exist`);
    process.mainWindow.setBounds(bounds);
}

ipcMain.on("setBounds", (sender, bounds) => {
    jsl.unused(sender);

    setBounds(bounds);
});

ipcMain.on("openGame", () => {
    debug("Init", "Game", "Initializing Electron window");

    let screenRes = screen.getPrimaryDisplay().workAreaSize;

    let gWin = new BrowserWindow({
        width: screenRes.width,
        height: screenRes.height,
        maxWidth: screenRes.width,
        maxHeight: screenRes.height,
        minWidth: screenRes.width,
        minHeight: screenRes.height,
        webPreferences: {
            nodeIntegration: true
        },
        icon: settings.resources.icon,
        fullscreen: true,
        transparent: true,
        // skipTaskbar: true,
        frame: false,
        resizable: false
    });
    gWin.setMenu(null);

    gWin.setFullScreen(true);
    gWin.setKiosk(true);

    debug("Init", "Game", `Opening main game HTML file ${settings.game.gameHTML}`);
    gWin.loadFile(settings.game.gameHTML);

    process.mainWindow.close();

    process.mainWindow = gWin;
    module.exports.mainWindow = gWin;
});

initAll();
