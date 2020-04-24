// TODO: this whole thing

// const jsl = require("svjsl");

const debug = require("../../debug");

/**
 * @typedef {Object} HotkeyValue
 * @prop {String} key The `key` value of the selected key - something like `m` or `Enter`
 * @prop {Boolean} ctrl Whether the LCTRL key was held down
 * @prop {Boolean} shift Whether the LSHIFT key was held down
 * @prop {Boolean} alt Whether the ALT key was held down
 */

/**
 * @callback HotkeyChangedCallback
 * @param {HotkeyValue} hotkey
 */

class HotkeyButton {
    /**
     * Constructs a new object of type HotkeyButton
     * @param {HTMLButtonElement} buttonElement The button that should be turned into this HotkeyButton
     * @param {HotkeyValue} defaultValue The default / fallback key combination of this HotkeyButton
     * @param {HotkeyChangedCallback} [onHotkeyChanged] A function that will be called whenever the hotkey was changed
     * @param {String} [identifier] An optional identifier string
     */
    constructor(buttonElement, defaultValue, onHotkeyChanged, identifier)
    {
        if(!(buttonElement instanceof HTMLButtonElement))
            throw new Error(`Wrong parameter type provided in new HotkeyButton() - expected: "HTMLButtonElement" - got "${buttonElement.constructor ? buttonElement.constructor.name : typeof buttonElement}" instead`);

        if(typeof onHotkeyChanged !== "function")
            onHotkeyChanged = () => {};

        this.id = (typeof identifier === "string" ? identifier : "");

        this.element = buttonElement;

        /** @type {HotkeyValue} */
        let hotkey = {
            key: defaultValue.key || 0,
            ctrl: defaultValue.ctrl || false,
            shift: defaultValue.shift || false,
            alt: defaultValue.alt || false
        };

        this.element.innerText = keyToText(new KeyboardEvent("keypress", {
            key: hotkey.key,
            ctrlKey: hotkey.ctrl,
            shiftKey: hotkey.shift,
            altKey: hotkey.alt
        }));

        debug("HotkeyButton", "Constructor", `Creating HotkeyButton with default values ${JSON.stringify(hotkey)} - identifier: ${identifier}`);

        this.element.onclick = () => {
            this.element.innerText = "...";

            let keyListener = document.addEventListener("keypress", e => {

                // TODO: Stuff like Shift + -, which creates "_" in text saves the key value as "_" instead of "Shift + -"
                // maybe use a JSON map with the keyCodes: https://gist.github.com/jiyinyiyong/5915004#file-reverse-map-json

                console.warn(e);
                debug("HotkeyButton", "Keypress", `Detected keypress: ${keyToText(e)}`);

                this.element.innerText = keyToText(e);

                document.removeEventListener("keyup", keyListener);

                hotkey = {
                    key: e.key,
                    ctrl: e.ctrlKey,
                    shift: e.shiftKey,
                    alt: e.altKey
                };

                return onHotkeyChanged(hotkey);
            });
        };

        return this;
    }
}

/**
 * Turns a KeyboardEvent into text - example: "M" or "CTRL + SHIFT + Q"
 * @param {KeyboardEvent} e 
 * @returns {String}
 */
function keyToText(e)
{
    return e.ctrlKey || e.shiftKey || e.altKey ? `${e.ctrlKey ? "CTRL + " : ""}${e.ctrlKey ? "SHIFT + " : ""}${e.ctrlKey ? "ALT + " : ""}${capitalize(e.key)}` : capitalize(e.key);
}

/**
 * Capitalizes the first letter of a string
 * @param {String} str
 * @returns {String}
 */
function capitalize(str)
{
    return (str.substr(0, 1).toUpperCase() + str.substr(1, str.length - 1));
}

module.exports = HotkeyButton;
