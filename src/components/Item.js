const Component = require("./Component");

class Item extends Component {
    constructor(name)
    {
        super("item", name);
    }
}
module.exports = Item;
