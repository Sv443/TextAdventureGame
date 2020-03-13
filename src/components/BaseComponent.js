const settings = require("../../settings");

const path = require("path");


class BaseComponent {
    /**
     * The base component that is used for all the components, like Item, Structure and Effect.
     * See supported types in the autocompletion for the `type` parameter.
     * @param {("item"|"structure"|"effect")} type The type of the component. This determines stuff like component data files and resource locations
     * @param {String} objectName 
     * @returns {BaseComponent|String} Returns the constructed object, or, if an error was encountered, returns the error message as a string
     */
    constructor(type, objectName)
    {
        let availableTypes = ["item", "structure", "effect"];
        if(!availableTypes.includes(type))
            return `Invalid type "${type}" provided in the construction of a Component. Available types are: "${availableTypes.join(", ")}"`;

        let fileName = "";
        
        switch(type)
        {
            case "item":
                fileName = "items";
            break;
            case "effect":
                fileName = "effects";
            break;
            case "structure":
                fileName = "structures";
            break;
            default:
                return `Unknown component type "${type}"`;
        }

        this.type = fileName;
        
        let dat = require(path.resolve(`../../data/components/${fileName}.json`))[objectName];

        if(typeof dat === "object")
        {
            // itemdata exists
            this.objName = objectName;
            this.name = dat.name;
            this.iconPath = path.join(this._getResourceBasePath(), dat.icon);


            return this; // initialization complete, return the object
        }
        else // itemdata doesn't exist
            return `Itemdata doesn't exist for requested object "${objectName}"`;
    }

    /**
     * Returns the base path of the resources
     * @returns {String}
     */
    _getResourceBasePath()
    {
        return path.resolve(`../../resources/${this.type}`);
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

module.exports = BaseComponent;
