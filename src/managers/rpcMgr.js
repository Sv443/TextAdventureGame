// const Discord = require("discord-game");

// const settings = require("../../settings");

// const isRequireDiscord = true;
// Discord.create(settings.info.discordClientID, isRequireDiscord);


/**
 * Sets the initial Discord Rich Presence
 */
function init()
{
    // const activity = {
    //     details: 'Details',
    //     state: 'State',
    //     assets: {
    //         largeImage: 'icon_512x512',
    //         largeText: 'Large',
    //         samllImage: 'icon_512x512',
    //         smallText: 'Small'
    //     },
    //     timestamps: {
    //         startAt: new Date()
    //     }
    // }
    // Discord.Activity
    //     .update(activity)
    //     .then(() => {
    //         console.log("Rich Presence updated");
    //     });
      
    // setInterval(() => {
    //     Discord.runCallback();
    // }, 1000/60);
}

/**
 * Updates the Discord Rich Presence
 * @param {Object} data 
 */
function update(data)
{

}

module.exports = { init, update };
