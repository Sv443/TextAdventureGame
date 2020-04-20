let x = {
    "name": "Name of the structure - gets displayed in the UI",
    "tooltip": "Tooltip / description",
    "fromStart": false, // whether the structure is available to the player from the start
    "icon": "image_file_name.png",
    "crafting": {
        "craftable": true, // whether the structure is craftable
        "ingredients": { // a list of items and their quantity that are needed to craft the structure
            "ropevine": 1,
            "flint": 1
        },
        "craftableAfterMilestones": [ // which milestones need to be unlocked in order to be able to craft the structure
            "FoundVineRope",
            "FoundFlint"
        ]
    },
    "finding": {
        "findable": true, // whether the structure is findable
        "findableAfterMilestones": [ // after which milestones the structure is findable
            "LocationRockyBeach"
        ]
    }
};

`

Every time a structure was crafted, the method "structureCrafted()" will be executed
Every time a structure is found, the method "structureFound()" will be executed

`

require("svjsl").unused(x);
