const BaseComponent = require("./BaseComponent");

class Effect extends BaseComponent
{
    constructor(name)
    {
        super("effect", name);

        return this;
    }
}
module.exports = Effect;
