// Text Island save/load module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license

document.addEventListener("DOMContentLoaded", function () {document.getElementById("last_saved").innerHTML="never - type save";});

var savestring;
function savegame() {
	savestring = browser + "_"; // save browser to account for incompatibility reasons that may occur some time in the future
	savestring += savetime + "_";
	if(document.body.innerHTML.includes("item_army_knife_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_coconut_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_lianas_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_rope_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_hatchet_elem")){ savestring += "1_" } else { savestring += "0_" }
	if(document.body.innerHTML.includes("structure_shipwreck")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("structure_shelter")){ savestring += "1_" } else { savestring += "0_" }
	if(document.body.innerHTML.includes("effect_hunger")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("effect_rain")){ savestring += "1" } else { savestring += "0" }

	document.getElementById("last_saved").innerHTML=timerval;
	sendmsg("You saved the game to your browser cookies. They will expire on January 1st, 2030. Enter 'load' to load your game. But don't delete the cookies or you'll have to start over!");
	sendmsg("<span style='color:red;'>LOADING DOESN'T WORK CURRENTLY!</span>");
	savetocookies();
}

function savetocookies() {
	if(dbg){sendmsg("saving to cookies");}
	document.cookie = "savestring=" + savestring + "; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/";
}

function loadgame(loadstring) { // [browser_minutes-seconds_item1-item2-item3..._structure1-structure2..._status1-status2-status3...]
// [armyknife-coconut-lianas-rope-hatchet_shipwreck-basicshelter_hunger-rain]
	if(dbg){sendmsg("loading game");}
	var loadstring = document.cookie;
	if(document.cookie != ""){
		sendmsg("Loading game... " + "(" + loadstring + ")");
	}
	else {
		sendmsg("Couldn't find load string in your browser cookies!");
	}
	sendmsg("<span style='color:red;'>Loading is currently disabled!</span>");
}

console.log("initialized TAG_save.js");
modulecount += 1;