let x = {
    "displayName": "Name of the effect - gets displayed in the UI",
    "description": "Tooltip / description of the effect",
    "icon": "image_file_name.png",
    "fromStart": true, // whether or not the player should have the effect from the beginning of the game
    "timing": {
        "timed": true, // whether the effect gets added to the player based on a timed event
        "type": "random", // the type of timed trigger
        "quantity": -1, // how often the effect can be added to the player - set to -1 for infinite
        "minTime": [0, 20, 0], // the minimum amount of absolute game time that needs to pass in order for this effect to be available
        "cooldown": [0, 20, 0], // after the effect has worn off or was removed, this is the cooldown until it can be added again by the timed event
        "initialChance": 0.5, // after the minTime or cooldown have elapsed, the effect has this initial chance to get added to the player, every time the `chanceInterval` fires off
        "chanceInterval": [0, 0, 20],
        "chanceIncrement": 0.05 // every chance interval, this value will be added to the chance, making it more likely to get the effect the more time passes
    }
};

`

Every time an effect's event is triggered, the method "eventTriggered()" will be called
Every time an effect wears off or is removed, the method "effectRemoved()" will be called

`

require("svjsl").unused(x);
