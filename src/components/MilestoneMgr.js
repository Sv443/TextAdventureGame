class MilestoneMgr {
    constructor()
    {
        this.milestones = [];
    }

    /**
     * Unlocks `milestone` on this MilestoneManager object
     * @param {String} milestone
     * @throws Throws an error if the `milestone` parameter is not a string
     */
    unlock(milestone)
    {
        if(typeof milestone !== "string")
            throw new Error(`Wrong type in MilestoneMgr.unlock() - expected string, got ${typeof milestone}`);

        this.milestones.push(milestone);
    }

    /**
     * Checks whether or not the `milestone` was already unlocked on this MilestoneManager object
     * @param {String} milestone 
     * @returns {Boolean}
     * @throws Throws an error if the `milestone` parameter is not a string
     */
    isUnlocked(milestone)
    {
        if(typeof milestone !== "string")
            throw new Error(`Wrong type in MilestoneMgr.unlock() - expected string, got ${typeof milestone}`);
        
        return this.milestones.includes(milestone);
    }
}

module.exports = MilestoneMgr;
