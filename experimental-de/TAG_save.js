// Text Island save/load module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license

document.addEventListener("DOMContentLoaded", function () {document.getElementById("last_saved").innerHTML="nie";});

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
	sendmsg("Du hast das Spiel in die Browser-Cookies gespeichert. Sie werden am 01. Januar 2030 ablaufen. Gib 'laden' ein, um das Spiel zu laden. Aber lösch die Cookies nicht, sonst musst du von vorne anfangen!");
	sendmsg("<span style='color:red;'>LADEN FUNKTIONIERT MOMENTAN NICHT!</span>");
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
		sendmsg("Konnte keinen Speicherstand in den Cookies finden!");
	}
	sendmsg("<span style='color:red;'>Laden ist momentan in Arbeit!</span>");
}

console.log("initialized TAG_save.js");
modulecount += 1;