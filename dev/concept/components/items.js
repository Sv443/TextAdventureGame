let x = {
    "displayName": "Name of the item - gets displayed in the UI",
    "description": "Like the purple lore text under Minecraft's item names",
    "type": "ingredient|tool|consumable",
    "fromStart": false, // whether or not the item should be in the player's inventory from the beginning of the game
    "icon": "image_file_name.png",
    "unlocksMilestone": "FoundCoconut", // possessing the item will unlock this milestone
    "crafting": {
        "craftable": true, // whether the item is craftable
        "ingredients": { // a list of items and their quantity that are needed to craft the item
            "vine": 1 // example: this item needs 1x vine to craft
        },
    },
    "finding": {
        "findable": true, // whether this item is findable
        "findableAfterMilestones": [ // after which milestone(s) this item is findable
            "LocationBeach"
        ]
    },
    "consuming": { // only exists if type = consumable
        "gainedEffects": [ // the effects that will be added when the item is consumed
            "saturation"
        ],
        "removedEffects": [ // the effects that will be removed when the item is consumed
            "hunger"
        ]
    },
    "stackSize": 4 // the maximum size of a stack of this item
};

`

Every time an item is added to an inventory, the method "itemAdded({inventory, quantity})" should be called
If an item is consumed, its method "itemConsumed()" will be called

`

require("svjsl").unused(x);
