const BaseComponent = require("./BaseComponent");

class Item extends BaseComponent
{
    constructor(name)
    {
        super("item", name);

        this.maxQuantity = 1;
    }
}
module.exports = Item;
