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
        debug("DisplayMgr", "ListDisplays", `Found display #${i} with bounds ${disp.bounds.width}x${disp.bounds.height}`);
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
 * @returns {Boolean}
 */
function setDisplay(id, electronScreen)
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
                if(!ipcRenderer) // if in main process
                    jsl.unused(); // TODO: set bounds on main window - I CANT FOR THE LOVE OF FUCK GET THIS TO WORK NO MATTER WHAT I TRY
                else // if in renderer process
                    ipcRenderer.emit("setBounds", newBounds);
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

module.exports = { setDisplay, listDisplays };
