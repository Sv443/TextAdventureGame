// Text Island save/load module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license

function saveinit() {document.getElementById("last_saved").innerHTML="never - type save";}

var savestring;var cscore;
function savegame() {
	getuserdata();
	cscore = parseInt(document.getElementById("current_score").innerHTML);
	if(cscore <= 0 || cscore === undefined){cscore = 0;}
	savestring = browser + "_"; // save browser for incompatibility reasons that may occur some time in the future
	savestring += savetime + "_";
	savestring += cscore + "_";
	if(document.body.innerHTML.includes("item_army_knife_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_coconut_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_lianas_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_rope_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_flint_stone_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_logs_elem")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("item_hatchet_elem")){ savestring += "1_" } else { savestring += "0_" }
	if(document.body.innerHTML.includes("structure_shipwreck")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("structure_shelter")){ savestring += "1_" } else { savestring += "0_" }
	if(document.body.innerHTML.includes("effect_hunger")){ savestring += "1-" } else { savestring += "0-" }
	if(document.body.innerHTML.includes("effect_rain")){ savestring += "1" } else { savestring += "0" }

	document.getElementById("last_saved").innerHTML=timerval;
	sendmsg("You saved the game to your browser cookies. They will expire in exactly 10 years. Enter 'load' to load your game. But don't delete the cookies or you'll have to start over!");
	sendmsg("<span style='color:red;'>Loading only works for the score and your items currently!</span>");
	savetocookies();
}

function savetocookies() {
	if(dbg){sendmsg("saving to cookies: " + savestring, "orange");}
	Cookies.set('sstr', savestring, { expires: 3650 }); // save savestring to cookies that expire in 10 years
}

function loadgame(loadstring) { // [browser_minutes-seconds_score_item1-item2-item3..._structure1-structure2..._status1-status2-status3...]
// [armyknife-coconut-lianas-rope-flint-hatchet-logs_shipwreck-basicshelter_hunger-rain]
	if(loadstring === undefined){
		var loadstring = Cookies.get('sstr');
	}
	if(loadstring != "" && loadstring != undefined){
		sendmsg("Loading game... (only works for score and items currently)");
	}
	else {
		sendmsg("Couldn't find load string in your browser cookies!");
		return;
	}
	if(dbg){sendmsg("loading game: " + loadstring, "orange");}
	
	
	
	var sa = loadstring.split("_");
	var san = ["browser", "time", "score", "items", "structures", "statuses"]; //savestring section name registry
	
	for(var i = 0; i < sa.length; i++) {
		if(dbg){sendmsg(san[i] + " - " + sa[i], "orange");}
		
		var sap = sa[i].split("-");
		
		var lbrowser;var lmin;var lsec;var lscore;
		var item1;var item2;var item3;var item4;var item5;var item6;var item7;
		var strc1;var strc2;
		var stat1;var stat2;
		switch(i){
			case 0: //browser
				for(var ii = 0; ii < sap.length; ii++){
					lbrowser = sap[0];
				}
				break;
			case 1: //time
				for(var ii = 0; ii < sap.length; ii++){
					lmin = sap[0];
					lsec = sap[1];
				}
				break;
			case 2: //score
				for(var ii = 0; ii < sap.length; ii++){
					lscore = sap[0];
				}
				break;
			case 3: //items
				for(var ii = 0; ii < sap.length; ii++){
					item1 = sap[0];
					item2 = sap[1];
					item3 = sap[2];
					item4 = sap[3];
					item5 = sap[4];
					item6 = sap[5];
					item7 = sap[6];
				}
				break;
			case 4: //structures
				for(var ii = 0; ii < sap.length; ii++){
					strc1 = sap[0];
					strc2 = sap[1];
				}
				break;
			case 5: //statuses
				for(var ii = 0; ii < sap.length; ii++){
					stat1 = sap[0];
					stat2 = sap[1];
				}
				break;
		}
	}
	if(dbg){sendmsg("compressed load vars: " + lbrowser + " " + lmin + " " + lsec + " " + lscore + " " + item1 + " " + item2 + " " + item3 + " " + item4 + " " + item5 + " " + item6 + " " + item7 + " " + strc1 + " " + strc2 + " " + stat1 + " " + stat2, "orange")}
	
	if(lbrowser == "incompatible"){
		alert("Your browser is incompatible with this script!");
	}

	/*minutes = lmin;
	seconds = lsec;*/
	
	document.getElementById("current_score").innerHTML=lscore;
	
	
	// [armyknife-coconut-lianas-rope-flint-hatchet-logs_shipwreck-basicshelter_hunger-rain]
	if(!document.body.innerHTML.includes("item_coconut_elem") && item2 == "1"){
		getitem("item_coconut_elem", "Coconut - Useful if you are hungry (Consumable Effects: provides saturation)", "https://sv443.github.io/TextAdventureGame/coconut_16x16.png", "appenditem");
	}
	if(!document.body.innerHTML.includes("item_lianas_elem") && item3 == "1"){
		getitem("item_lianas_elem", "Lianas - Maybe you can craft something with these, Tarzan", "https://sv443.github.io/TextAdventureGame/lianas_16x16.png", "appenditem");
	}
	if(!document.body.innerHTML.includes("item_rope_elem") && item4 == "1"){
		getitem("item_rope_elem", "Rope - Tie something together", "https://sv443.github.io/TextAdventureGame/rope_16x16.png", "appenditem");
	}
	if(!document.body.innerHTML.includes("item_flint_stone_elem") && item5 == "1"){
		getitem("item_flint_stone_elem", "Flint Stone - MISSING DESCRIPTION", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/flint_stone_16x16.png", "appenditem");
	}
	if(!document.body.innerHTML.includes("item_hatchet_elem") && item6 == "1"){
		getitem("item_hatchet_elem", "Hatchet - Anything but an axe", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/hatchet_16x16.png", "appenditem");
	}
	if(!document.body.innerHTML.includes("item_logs_elem") && item7 == "1"){
		getitem("item_logs_elem", "Logs - Sturdy building material", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/logs_16x16.png", "appenditem");
	}
	
	sendmsg("Loaded game!");
}

console.log("initialized TAG_save.js");
modulecount += 1;
modules_displayname += ", TAG_save";