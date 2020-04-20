const jsl = require("svjsl");

const Item = require("./components/Item");
const Effect = require("./components/Effect");
const Structure = require("./components/Structure");
/** @typedef {("item"|"structure"|"effect")} ComponentType */
/**
 * @typedef {Object} Components
 * @prop {Object} items
 * @prop {Object} structs
 * @prop {Object} effects
 */

const componentTypes = ["items", "structs", "effects"];

jsl.unused(Item, Effect, Structure);

/**
 * Returns the object with `objectName` of type `componentType`
 * @param {ComponentType} componentType 
 * @param {String} objectName 
 * @returns {(Item|Effect|Structure|String)} Returns the object or a string containing an error message
 */
function get(componentType, objectName)
{
    /** @type {Components} */
    let comps = process.comp;

    if(jsl.isEmpty(comps))
        throw new Error(`No components were loaded but components.get() was called before the PreInit phase finished`);

    if(!componentTypes.includes(componentType))
        return `Component type "${componentType}" doesn't exist. Valid types are: ${componentTypes.join(", ")}`;

    if(exists(componentType, objectName))
        return comps[componentType][objectName];
}

/**
 * Checks if the object with `objectName` of type `componentType` exists
 * @param {ComponentType} componentType 
 * @param {String} objectName 
 * @returns {Boolean}
 */
function exists(componentType, objectName)
{
    /** @type {Components} */
    let comps = process.comp;

    if(jsl.isEmpty(comps))
        throw new Error(`No components were loaded but components.get() was called before the PreInit phase finished`);

    if(!componentTypes.includes(componentType))
        return `Component type "${componentType}" doesn't exist. Valid types are: ${componentTypes.join(", ")}`;
    
    let gottenComp = comps[componentType][objectName];

    if(typeof gottenComp === "object" && typeof gottenComp.name === "string")
        return true;
    else return false;
}

module.exports = { get, exists };
