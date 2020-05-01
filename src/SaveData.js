const Item = require("./components/Item");
const Structure = require("./components/Structure");
const Effects = require("./components/Effect");

const jsl = require("svjsl");
const crypto = require("crypto");
const machineId = require("node-machine-id").machineIdSync;

jsl.unused(Item, Structure, Effects);

/**
 * @typedef {Object} SaveDataObject
 * @prop {String} playerName
 * @prop {Array<String>} unlockedMilestones
 * @prop {Object} possessions
 * @prop {Array<Item>} possessions.items
 * @prop {Array<Structure>} possessions.structs
 * @prop {Array<Effect>} possessions.effects
 */


class SaveData {
    constructor()
    {
        /** @type {SaveDataObject} */
        this.data = {
            playerName: null,
            unlockedMilestones: [],
            possessions: {
                items: [],
                structs: [],
                effects: []
            }
        };
    }

    /**
     * Turns the save data into a JSON-like object and returns it
     * @returns {SaveDataObject}
     */
    toObject()
    {
        
    }

    /**
     * Encrypts the save data with AES-256 and returns it
     * @returns {String}
     */
    toEncrypted()
    {
        return this._encrypt(JSON.stringify(this.toObject()));
    }

    /**
     * Encrypts a string with AES-256 and the private encryption key and returns it as a buffer
     * @private
     * @param {String} data
     * @returns {Buffer}
     */
    _encrypt(data)
    {
        let mid = Buffer.from(machineId());
        let privateKey = Buffer.from("");
        let key = crypto.createHash("md5").update(Buffer.concat([mid, privateKey]).toString(), "utf8").digest("hex");

        let iv = crypto.randomBytes(16);

        let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
        cipher.update(data, "utf8");
        let buf = cipher.final();

        return buf;
    }
}

module.exports = SaveData;
