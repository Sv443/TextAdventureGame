const col = require("svjsl").colors.fg;
const rst = require("svjsl").colors.rst;

const debug = require("./debug");

/**
 * @typedef {Object} Components
 * @prop {Object} items
 * @prop {Object} structs
 * @prop {Object} effects
 */

/**
 * Validates all the component data.
 * Run this function in the pre-init phase.
 * @param {Components} components 
 */
function validateComponents(components)
{
    return new Promise((resolve, reject) => {

        //#SECTION items
        let wrong = [];
        let addWrong = (component, whatsWrong) => {
            wrong.push({
                "component": component,
                "whatsWrong": whatsWrong
            });
        };

        let componentTypes = ["items", "structs", "effects"];

        componentTypes.forEach(compType => {
            let validatedComps = [];
            Object.keys(components[compType]).forEach(objKey => {
                let obj = components[compType][objKey];

                //#SECTION shared properties:
                if(check(obj, "displayName", "string"))
                    addWrong(compType, `"${objKey}" doesn't have a "displayName" property or it is of the wrong type`);

                if(check(obj, "description", "string"))
                    addWrong(compType, `"${objKey}" doesn't have a "description" property or it is of the wrong type`);

                if(check(obj, "fromStart", "boolean"))
                    addWrong(compType, `"${objKey}" doesn't have a "fromStart" property or it is of the wrong type`);

                if(check(obj, "icon", "string"))
                    addWrong(compType, `"${objKey}" doesn't have a "icon" property or it is of the wrong type`);

                switch(compType)
                {
                    case "items":
                        //#SECTION items specific stuff:
                        if(check(obj, "type", "string"))
                            addWrong(compType, `"${objKey}" doesn't have a "type" property or it is of the wrong type`);

                        if(check(obj, "unlocksMilestone", "string", true))
                            addWrong(compType, `"${objKey}" doesn't have a "unlocksMilestone" property or it is of the wrong type`);
                    break;
                    case "structs":
                        //#SECTION structs specific stuff:
                        
                    break;
                    case "effects":
                        //#SECTION effects specific stuff:

                    break;
                    default: throw new Error(`Unknown component type "${compType}"`);
                }

                validatedComps.push(objKey);
            });
            debug("ValidateComp", "Valid", `Validated components of type "${compType}": ${col.yellow}${validatedComps.join(`${rst}, ${col.yellow}`)}${rst}`);
        });

        if(wrong.length > 0)
            return reject(wrong);
        else return resolve();
    });
}

/**
 * Checks if a property exists on an object or is empty and if it matches the expected type
 * @param {Object} object 
 * @param {String} property 
 * @param {("bigint"|"boolean"|"function"|"number"|"object"|"string"|"symbol"|"undefined")} type 
 * @param {Boolean} [canBeEmpty=false] Whether the property can be empty
 * @returns {Boolean} Returns false, if the `property` exists on the `object` and the type matches, true if it doesn't exist or the type doesn't match
 */
function check(object, property, type, canBeEmpty = false)
{
    if(typeof object !== "object")
        return true;
    else
    {
        if(typeof object[property] !== "undefined")
        {
            if((!canBeEmpty && object[property] === "") || typeof object[property] !== type)
                return true;
            return false;
        }
        return true;
    }
}

module.exports = validateComponents;
