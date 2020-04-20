const jsl = require("svjsl");
const componentMgr = require("../componentMgr");

const Item = require("./Item");

jsl.unused(Item);


class Inventory {
    /**
     * Constructs a new Inventory object
     * @param {Number} size How many item stacks this inventory can hold
     */
    constructor(size)
    {
        /** @type {Array<Item>} */
        this.items = [];

        this.size = size;
    }

    /**
     * Adds an item to this inventory
     * @param {Item} itemName 
     * @returns {Boolean|String} Returns true if the item could be added, a string containing an error message if not
     */
    addItem(itemName)
    {
        if(this.items.length >= this.size)
            return "This inventory is full";

        let item = componentMgr.get("item", itemName);

        if(typeof item === "string")
            return `Error while adding item "${itemName}": ${item}`;
        else
        {
            this.items.push(item);
            return true;
        }
    }
}

module.exports = Inventory;
