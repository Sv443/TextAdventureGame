const semver = require("semver");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const debug = require("./debug");

const releasesURL = "https://api.github.com/repos/Sv443/TextAdventureGame/releases/latest";


/**
 * @typedef {Object} UpdateCheckResult
 * @prop {Boolean} available Whether a new version is available
 * @prop {String} [message] Property is only there if no update is available
 * @prop {String} [newVersion] Property is only there if an update is available
 * @prop {String} [oldVersion] Property is only there if an update is available
 */

/**
 * Checks if there is a new update available
 * @returns {Promise<UpdateCheckResult, String>}
 */
function check()
{
    return new Promise((resolve, reject) => {
        debug("UpdateCheck", "Check", `Calling GitHub API...`);

        let packageJSON = require("../package.json");
        let clientVersion = packageJSON.version;

        let xhr = new XMLHttpRequest();
        xhr.open("GET", releasesURL);
        xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4)
                debug("UpdateCheck", "Check", `Got a response with status ${xhr.status}`);
            
            if(xhr.readyState == 4 && xhr.status < 300)
            {
                let resp = JSON.parse(xhr.responseText);
                let newestVersion = resp.tag_name;

                if(newestVersion == undefined)
                {
                    if(resp.message == "Not Found")
                    {
                        return resolve({
                            available: false,
                            message: "No new release found or it is a prerelease"
                        });
                    }
                    else return reject(`Error while checking for a new update: ${resp.message}`);
                }

                newestVersion = semver.clean(newestVersion);
                clientVersion = semver.clean(clientVersion);

                if(semver.gt(newestVersion, clientVersion))
                {
                    return resolve({
                        available: true,
                        newVersion: newestVersion,
                        oldVersion: clientVersion
                    });
                }
                else
                {
                    return resolve({
                        available: false,
                        message: "No new version is available"
                    });
                }
            }
            else if(xhr.readyState == 4 && xhr.status == 404)
            {
                return resolve({
                    available: false,
                    message: "No new release found or it is a prerelease"
                });
            }
            else if(xhr.readyState == 4 && xhr.status >= 300)
                return reject(`Error ${xhr.status} while checking for a new update`);
        };
        xhr.send();
    });
}

module.exports = check;
