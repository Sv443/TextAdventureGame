// TextAdventureGame save/load module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license

var savestring;
function savegame() {
	savestring = browser + "_";
	savestring += savetime + "_";
	if(document.body.innerHTML.includes("item_army_knife_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_coconut_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_lianas_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_rope_elem")){ savestring += "1_" } else { savestring += "0_" }
	if(document.body.innerHTML.includes("effect_hunger")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("effect_rain")){ savestring += "1" } else { savestring += "0" }

	document.getElementById("last_save_string").innerHTML=savestring;
	sendmsg("You saved the game to your browser cookies. They will expire on January 1st, 2030. Enter 'load' to load your game. But don't delete the cookies or you'll have to start over!");
	savetocookies();
}

function savetocookies() {
	if(dbg){sendmsg("saving to cookies");}
	document.cookie = "savestring=" + savestring + "; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/";
}

function loadgame(loadstring) { // [browser_minutes-seconds_item1-item2-item3..._status1-status2-status3...] [armyknife-coconut-lianas-rope_hunger-rain]
	if(dbg){sendmsg("loading game");}
	var loadstring = document.cookie;
	if(document.cookie != ""){
		sendmsg("Loading game... " + "(" + loadstring + ")");
	}
	else {
		sendmsg("Couldn't find load string in your browser cookies!");
	}
	sendmsg("Loading is currently disabled!");
}

console.log("initialized TAG_save.js");
modulecount += 1;