const path = require("path");
const itemData = require("../../data/items.json");

class Item {
    constructor(name)
    {
        let dat = itemData[name];
        if(typeof dat === "object")
        {
            // itemdata exists
            this.name = dat.name;
            this.iconPath = path.join(this._getResourceBasePath(), dat.icon);
        }
        else
        {
            // itemdata doesn't exist
        }
    }

    /**
     * Returns the base path of the resources
     * @returns {String}
     */
    _getResourceBasePath()
    {
        return path.resolve("../../resources/items");
    }

    /**
     * Returns the path to the icon of this item
     * @returns {String}
     */
    getIconPath()
    {
        return path.resolve(this.iconPath);
    }
}
module.exports = Item;
