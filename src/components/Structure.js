const BaseComponent = require("./BaseComponent");

class Structure extends BaseComponent
{
    constructor(name)
    {
        super("structure", name);

        return this;
    }

    /**
     * Gets called when the structure object is crafted
     */
    structureCrafted()
    {

    }

    /**
     * Gets called when the structure object was found
     */
    structureFound()
    {

    }
}
module.exports = Structure;
