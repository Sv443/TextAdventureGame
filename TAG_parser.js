// TextAdventureGame input parsing and output giving module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license


function compareival(inputval) {
	var lcival = inputval.toLowerCase().replace(/[^-_a-z0-9 ]/g, ""); // convert entered string to lowercase and remove all special characters except space
    switch(lcival){ // compare with available commands
		case "retry":
			window.location.reload();
			break;
		case "test":
			sendmsg("dbg: " + dbg + " - v" + curversion + " - sendkey: " + key_send + " - repeatkey: " + key_repeat + " - time_starving: " + time_starving + " - time_died_of_hunger: " + time_died_of_hunger);
			break;
		case "ping":
			sendmsg("Pong!");
			break;
		case "sv443":
			sendmsg("<a href='https://github.com/Sv443' target='_blank'>Sv443 on GitHub</a>");
			break;
		case "github":
			sendmsg("<a href='https://github.com/Sv443' target='_blank'>Sv443 on GitHub</a>");
			break;
		case "tutorial":
			sendmsg("This is a text adventure game. Most of the times you start off in a specific situation you have to escape and you have to type what you want the character to do."
			+ "<br><br> At the bottom you see a brown rectangle. This is your inventory. If you hover over an item you'll see a short information."
			+ "<br><br> Underneath is the blue rectangle. Here you see your current status effects. Hover over an effect to see information and the duration of the effect."
			+ "<br><br> If text is marked with a <span title='Yes, just like this :)' style='cursor:help;background-color:#fff493;'>yellow</span> background, you can also hover over it to get extra information."
			+ "<br><br> To start off, try typing " + '"' + "look around" + '".<br><br>');
			break;
		case "look":
			multiaction(lcival);
			break;
		case "suicide":
			sendmsg("... you asked for it ...");
			playerdied("suicide");
			break;
		case "die":
			sendmsg("... you asked for it ...");
			playerdied("suicide");
			break;
		case "succ":
			while(true){
				setTimeout(function (){
				sendmsg("<a href='https://sv443.github.io/code/succ.html' target='_blank'>CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME</a>");
				}, 100);
			}
			break;
		case "swim":
			multiaction(lcival);
			break;
		case "save":
			savegame();
			break;
		case "":
			break;
		default:
			if(lcival.includes("look") || lcival.includes("get") || lcival.includes("retrieve") || lcival.includes("take") || lcival.includes("eat") || lcival.includes("kill") || lcival.includes("load") || lcival.includes("craft") || lcival.includes("create") || lcival.includes("make") || lcival.includes("build")){
				multiaction(lcival);
			}
			else if(lcival.includes("fuck")){
				sendmsg("Watch your profanity!");
			}
			else { //if nothing fits, send message
				sendmsg("I don't know how to " + '"' + lcival + '".');
			}
			break;
	}
}

var item_coconut;var item_lianas;var item_rope;
function multiaction(lcival) { // actions that consist of multiple variations and/or attributes
	if(dbg){sendmsg("multiaction triggered");}
	if(lcival.includes("look")){
		if(lcival.includes("look at")){
			if(lcival.includes("island") && !document.body.innerHTML.includes('You look around on the small island.')){ sendmsg("You look around on the small island. You see a bunch of coconut palm trees. One of the coconuts is hanging very low. Maybe you can get it.");localStorage.setItem("coconut", true); }
			else if(lcival.includes("island") && document.body.innerHTML.includes('You look around on the small island.')){ sendmsg("You look around further and find a bunch of lianas."); }
			else{ sendmsg("Look at what?"); }
		}
		else if(lcival.includes("around") && !document.body.innerHTML.includes('You look around on the small island.')){ sendmsg("You look around on the small island. You see a bunch of coconut palm trees. One of the coconuts is hanging very low. Maybe you can get it.");localStorage.setItem("coconut", true); }
		else if(lcival.includes("around") && document.body.innerHTML.includes('You look around on the small island.')){ sendmsg("You look around further and find a bunch of lianas."); }
		else { sendmsg("Look at what?"); }
	}
	else if(lcival.includes("get") || lcival.includes("retrieve") || lcival.includes("take") || lcival.includes("obtain")){
		
		// coconut
		if(lcival.includes("coconut") && !document.body.innerHTML.includes('img id="item_coconut_elem"') && document.body.innerHTML.includes('One of the coconuts is hanging very low')){
			if(dbg){sendmsg("got item: coconut");}
			sendmsg("You take your knife and cut the low hanging coconut off.");
			item_coconut = document.createElement('span');item_coconut.innerHTML='<abbr id="itemabbr" style="cursor:help;" title="Coconut - Useful if you are hungry"><img id="item_coconut_elem" src="https://sv443.github.io/TextAdventureGame/coconut_16x16.png" width="32px" height="32px"></img></abbr>';document.getElementById("appenditem").appendChild(item_coconut);
		}
		else if(lcival.includes("coconut") && !document.body.innerHTML.includes('img id="item_coconut_elem"')){
			sendmsg("You don't know where to get a coconut from! Try looking around first!");
		}
		else if(lcival.includes("coconut") && document.body.innerHTML.includes('img id="item_coconut_elem"')){
			sendmsg("You can't reach any other coconuts!");
		}
		
		// lianas
		else if(lcival.includes("lianas") && !document.body.innerHTML.includes('img id="item_lianas_elem"') && document.body.innerHTML.includes('find a bunch of lianas.')){
			if(dbg){sendmsg("got item: lianas");}
			sendmsg("You take your knife and cut some of the lianas off.");
			item_lianas = document.createElement('span');item_lianas.innerHTML='<abbr id="itemabbr" style="cursor:help;" title="Lianas - Maybe you can craft something with these"><img id="item_lianas_elem" src="https://sv443.github.io/TextAdventureGame/lianas_16x16.png" width="32px" height="32px"></img></abbr>';document.getElementById("appenditem").appendChild(item_lianas);
		}
		else if(lcival.includes("lianas") && !document.body.innerHTML.includes('img id="item_lianas_elem"')){
			sendmsg("You don't know where to get lianas from! Try looking around first!");
		}
		else if(lcival.includes("lianas") && document.body.innerHTML.includes('img id="item_lianas_elem"')){
			sendmsg("You can't reach any other lianas!");
		}
		
		
		else {
			sendmsg("What do you want to get?");
		}
	}
	else if(lcival.includes("craft") || lcival.includes("create") || lcival.includes("make") || lcival.includes("build")){
		
		// rope
		if(lcival.includes("rope") && !document.body.innerHTML.includes('img id="item_rope_elem"') && document.body.innerHTML.includes('You take your knife and cut some of the lianas off')){
			if(dbg){sendmsg("got item: rope");}
			sendmsg("You tie the lianas together and get a rope.");
			item_lianas.innerHTML="";item_lianas.outerHTML="";
			item_rope = document.createElement('span');item_rope.innerHTML='<abbr id="itemabbr" style="cursor:help;" title="Rope - Tie up loose ends"><img id="item_rope_elem" src="https://sv443.github.io/TextAdventureGame/rope_16x16.png" width="32px" height="32px"></img></abbr>';document.getElementById("appenditem").appendChild(item_rope);
		}
		else if(lcival.includes("rope") && document.body.innerHTML.includes('img id="item_rope_elem"') && document.body.innerHTML.includes('You take your knife and cut some of the lianas off')) {
			sendmsg("You already have a rope.");
		}
		else if(lcival.includes("rope") && !document.body.innerHTML.includes('img id="item_rope_elem"') && !document.body.innerHTML.includes('You take your knife and cut some of the lianas off')) {
			sendmsg("You'll need some lianas to craft a rope!");
		}
		
		
		else {
			sendmsg("What do you want to craft?");
		}
	}
	else if(lcival.includes("eat") || lcival.includes("consume")){
		if(lcival.includes("coconut") && document.body.innerHTML.includes('item_coconut_elem')){
			sendmsg("You ate the coconut and feel saturated. If you didn't eat it, you may have died.");
			document.getElementById("effect_hunger").innerHTML="";document.getElementById("effect_hunger").outerHTML="";
			document.getElementById("item_coconut_elem").innerHTML="";document.getElementById("item_coconut_elem").outerHTML="";
		}
		else if(lcival.includes("coconut") && !document.body.innerHTML.includes('img id="item_coconut_elem"')){
			sendmsg("You don't have a coconut yet!");
		}
		else if(lcival.includes("army knife") || lcival.includes("knife")){
			sendmsg("You suffered extreme internal bleeding and died!");
			playerdied("internal bleeding");
		}
		else if(lcival.includes("ass") || lcival.includes("booty")){
			sendmsg("Da booty too fat to eat.");
		}
		else {
			sendmsg("Eat what?");
		}
	}
	else if(lcival.includes("kill")){
		if(lcival.includes("myself") || lcival.includes("yourself")){
			sendmsg("... you asked for it ...");
			playerdied("suicide");
		}
		else {
			sendmsg("Kill what?");
		}
	}
	else if(lcival.includes("swim")){
		if(lcival.includes("to your mom")){
			sendmsg("no u");
		}
		else {
			sendmsg("Swim where?");
		}
	}
	else if(lcival.includes("load")){
		var loadstring = lcival.replace(/[load ]/g, "");
		loadgame(loadstring);
	}
	else {
		sendmsg("Internal error while comparing entered value to regex");
	}
}

console.log("initialized TAG_parse.js");
modulecount += 1;