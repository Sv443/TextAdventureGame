const jsl = require("svjsl");

const Inventory = require("./Inventory");
const MilestoneMgr = require("./MilestoneMgr");

class Player
{
    constructor()
    {
        this.inventory = new Inventory();
        this.milestones = new MilestoneMgr();

        return this;
    }

    /**
     * This kills the player
     * @param {String} cause Why the player was killed
     */
    kill(cause)
    {
        jsl.unused(cause);
    }
}
module.exports = Player;
