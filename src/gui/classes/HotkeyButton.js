// TODO: this whole thing

// const jsl = require("svjsl");

/**
 * @typedef {Object} HotkeyValue
 * @prop {Number} keyCode The key code of the selected key
 * @prop {Boolean} ctrl Whether the LCTRL key was held down
 * @prop {Boolean} rctrl Whether the RCTRL key was held down
 * @prop {Boolean} shift Whether the LSHIFT key was held down
 * @prop {Boolean} rshift Whether the RSHIFT key was held down
 * @prop {Boolean} alt Whether the ALT key was held down
 * @prop {Boolean} altgr Whether the ALT GR key was held down
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
     * @param {String} [identifier] An optional identifier string
     */
    constructor(buttonElement, defaultValue, identifier)
    {
        this.id = (typeof identifier === "string" ? identifier : "");

        /** @type {HotkeyValue} */
        this.hotkey = {
            keyCode: defaultValue.keyCode || 0,
            ctrl: defaultValue.ctrl || false,
            rctrl: defaultValue.rctrl || false,
            shift: defaultValue.shift || false,
            rshift: defaultValue.rshift || false,
            alt: defaultValue.alt || false,
            altgr: defaultValue.altgr || false
        };

        return this;
    }

    /**
     * Registers a function to be triggered whenever the hotkey was changed
     * @param {HotkeyChangedCallback} execFunction 
     */
    onHotkeyChanged(execFunction)
    {
        if(typeof execFunction !== "function")
            throw new Error(`Callback function for HotkeyButton.onHotkeyChanged() is not of type function but instead ${typeof execFunction}`);

        return execFunction(this.hotkey);
    }
}

module.exports = HotkeyButton;


// let hb = new HotkeyButton(new HTMLButtonElement(), {
//     ctrl: true,
//     keyCode: 77
// }, "testBtn");

// hb.onHotkeyChanged((newHotkey) => {
    
// });
