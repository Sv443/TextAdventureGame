const jsl = require("svjsl");

const BaseComponent = require("./BaseComponent");
const Inventory = require("./Inventory");


jsl.unused(Inventory);

/**
 * @typedef {Object} itmAddedData
 * @prop {Inventory} inventory The inventory the item was added to
 * @prop {Number} quantity
 */

class Item extends BaseComponent
{
    constructor(name)
    {
        super("item", name);

        this.maxQuantity = 1;

        return this;
    }

    /**
     * Gets called every time the item was added to an inventory
     * @param {itmAddedData} data 
     */
    itemAdded(data)
    {
        jsl.unused(data);
    }

    /**
     * Gets called every time the item is consumed - only applicable on items of type "consumable"
     */
    itemConsumed()
    {

    }
}
module.exports = Item;
