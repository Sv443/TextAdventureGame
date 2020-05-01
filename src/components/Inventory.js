const jsl = require("svjsl");
const componentMgr = require("../managers/componentMgr");

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
        
        return this;
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

    /**
     * Lists all items in this inventory
     * @returns {Array<Item>}
     */
    listItems()
    {
        if(this.items.length > 0)
            return this.items;
        else
            return [];
    }

    /**
     * Removes one or multiple items from this inventory
     * @param {String} itemName 
     * @param {Number} [count=1]
     * @returns {Boolean}
     */
    removeItem(itemName, count)
    {
        try
        {
            count = parseInt(count);
        }
        catch(err)
        {
            throw new Error(`Parameter "count" in Inventory.removeItem() can not be resolved as an integer`);
        }

        if(typeof itemName !== "string")
            throw new Error(`Parameter "itemName" in Inventory.removeItem() is of wrong type "${typeof itemName}" - expected "string"`);

        if(isNaN(count) || count <= 0)
            throw new Error(`Parameter "count" in Inventory.removeItem() has to be a number above 0`);

        let removableCount = 0;
        this.items.forEach(itm => {
            if(itm.objName == itemName)
                removableCount++;
        });

        if(removableCount >= count)
        {
            let newItems = [];
            this.items.forEach(itm => {
                if(itm.objName != itemName && count > 0)
                    newItems.push(itm);
                else
                    count--;
            });

            this.items = newItems;
            return true;
        }
        else return false;
    }

    /**
     * Checks if a specified item occurs in the inventory. If it doesn't occur, returns false. If `returnCount` is set to `true`, this instead returns a number
     * @param {String} itemName 
     * @param {Boolean} [returnCount=false]
     * @returns {Number|Boolean}
     */
    contains(itemName, returnCount)
    {
        if(!returnCount)
            returnCount = false;
        
        if(typeof itemName !== "string")
            throw new Error(`Parameter "itemName" in Inventory.contains() is of wrong type "${typeof itemName}" - expected "string"`);
        
        let count = this.items.filter((itm) => itm.objName == itemName).length;

        if(count == 0)
            return (!returnCount ? false : 0);
        else
            return (!returnCount ? true : count);
    }
}

module.exports = Inventory;
