const jsl = require("svjsl");
const { screen, ipcRenderer, remote } = require("electron");

const debug = require("../debug");

jsl.unused(screen);

/**
 * Returns all connected displays
 * @param {Electron.Screen} electronScreen
 * @returns {Array<Electron.Display>}
 */
function listDisplays(electronScreen)
{
    if(!electronScreen && remote)
        electronScreen = remote.screen;

    let allDisplays = [];
    electronScreen.getAllDisplays().forEach((disp, i) => {
        debug("DisplayMgr", "ListDisplays", `Found display #${i} (${disp.bounds.width}x${disp.bounds.height}) <${disp.id}>`);
        let pDisp = disp;
        pDisp.index = i;
        allDisplays.push(pDisp);
    });
    return allDisplays;
}

/**
 * Sets the electron window to be on a different display
 * @param {Number} id Internal ID of the display, not index
 * @param {Electron.Screen} electronScreen
 * @param {Electron.BrowserWindow} [bw]
 * @returns {Boolean}
 */
function setDisplay(id, electronScreen, bw)
{
    if(!electronScreen && remote)
        electronScreen = remote.screen;

    try
    {
        electronScreen.getAllDisplays().forEach(elD => {
            if(elD.id == id)
            {
                let newBounds = elD.bounds;
                debug("DisplayMgr", "Set", `Changing to display with ID ${elD.id} - ${newBounds.width}x${newBounds.height}`);
                if(!ipcRenderer && bw) // if in main process
                    bw.setBounds(newBounds);
                else if(ipcRenderer) // if in renderer process
                    ipcRenderer.send("setBounds", newBounds);
                else throw new Error(`Error while setting display in displayMgr.setDisplay(): Either in main process and "bw" is not set, or in renderer process and ipcRenderer is not available.`);
                return true;
            }
        });
        return false;
    }
    catch(err)
    {
        jsl.unused(err);
        return false;
    }
}

/**
 * Gets the current Electron Display
 * @param {Electron.BrowserWindow} bw
 * @param {Electron.Screen} [electronScreen]
 * @returns {Electron.Display|null} Returns null if no matching display was found
 */
function getDisplay(bw, electronScreen)
{
    if(!screen && !electronScreen)
        throw new Error(`Error in displayMgr.getDisplay(): "screen" is not available and "electronScreen" is not set`);

    let scr = screen || electronScreen;

    listDisplays(scr).forEach(disp => {
        let pX = disp.bounds.x == bw.getBounds().x;
        let pY = disp.bounds.y == bw.getBounds().y;
        let w = disp.bounds.width == bw.getBounds().width;
        let h = disp.bounds.height == bw.getBounds().height;

        debug("displayMgr", "Get", `Found display - matching properties:\nx: ${pX} - y: ${pY} - w: ${w} - h: ${h}`);

        if(pX && pY && w && h)
            return disp;
    });

    return null;
}

module.exports = { setDisplay, getDisplay, listDisplays };
