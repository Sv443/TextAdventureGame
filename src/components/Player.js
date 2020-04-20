const Inventory = require("./Inventory");
const MilestoneMgr = require("./MilestoneMgr");

class Player
{
    constructor()
    {
        this.inventory = new Inventory();
        this.milestones = new MilestoneMgr();
    }

    /**
     * This kills the player
     * @param {String} cause Why the player was killed
     */
    kill(cause)
    {
        
    }
}
module.exports = Player;
