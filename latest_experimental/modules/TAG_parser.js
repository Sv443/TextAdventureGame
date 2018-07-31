// Text Island input parsing and output giving module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license



// Command List:

// retry, test, ping, sv443, github, tutorial, help, suicide, die, succ, swim (to) [X], save,
// load, time(r), look (at) [X], get/take/retrieve [X], eat [X], kill [X], craft/create/make/build [X]


function compareival(inputval) {
	var lcival = inputval.toLowerCase().replace(/[^-_a-zäöüß0-9 ]/g, ""); // convert entered string to lowercase and remove all special characters except space, - and _
    switch(lcival){ // compare with available commands
		case "list":
			sendmsg("Available Commands:<br><br>"
			+ "<span title='Instantly restart the game' class='hoverhelp'>retry/restart</span>, <span title='Ping the website to test for connection issues' class='hoverhelp'>ping</span>, <span title='Visit Sv443 on GitHub and view the code of this page' class='hoverhelp'>sv443/github/code</span>"
			+ ", <span title='Display a tutorial' class='hoverhelp'>tutorial/help</span>, <span title='Instantly die!' class='hoverhelp'>suicide/die</span>, <span title='Swim somewhere' class='hoverhelp'>swim (to) [XY]</span>"
			+ ", <span title='Save or load the game to/from the browser cookies' class='hoverhelp'>save/load</span>, <span title='Display the current game timer' class='hoverhelp'>time(r)</span>, <span title='Look at something to get more information' class='hoverhelp'>look (at) [XY]</span>, <span title='Take something' class='hoverhelp'>get/take/retrieve/obtain/harvest [XY]</span>"
			+ ", <span title='Eat something' class='hoverhelp'>eat [XY]</span>, <span title='Kill something' class='hoverhelp'>kill [XY]</span>, <span title='Craft something' class='hoverhelp'>craft/create/make/build [XY]</span>");
			break;
		case "retry":
			window.location.reload();
			break;
		case "credits":
			game_ending();
			break;
		case "credit":
			credits();
			break;
		case "restart":
			window.location.reload();
			break;
		case "dev_menu":
			document.getElementById("devmenu").style="display:block;";
			sendmsg("activating dev menu", "orange");
			break;
		case "dev_ua":
			alert("u_agent    : " + ua);sendmsg("browser    : " + browser, "orange");
			break;
		case "dev_wh":
			sendmsg("inner width: " + window.innerWidth + " - inner height: " + window.innerHeight);
			break;
		case "ping":
			sendmsg("Pong!");
			break;
		case "sv443":
			sendmsg("<a href='https://github.com/Sv443' target='blank_'>Sv443 on GitHub</a>");
			break;
		case "time":
			sendmsg("Current In-Game Time: Day " + document.getElementById("ingame_day").innerHTML + ", " + document.getElementById("ingame_time").innerHTML + ", Real Passed Time: " + document.getElementById("game_timer").innerHTML);
			break;
		case "timer":
			sendmsg("Current In-Game Time: Day " + document.getElementById("ingame_day").innerHTML + ", " + document.getElementById("ingame_time").innerHTML + ", Real Passed Time: " + document.getElementById("game_timer").innerHTML);
			break;
		case "code":
			sendmsg("<a href='https://github.com/Sv443' target='blank_'>Sv443 on GitHub</a>");
			break;
		case "github":
			sendmsg("<a href='https://github.com/Sv443' target='blank_'>Sv443 on GitHub</a>");
			break;
		case "tutorial":
			sendmsg("This is a text adventure game. Most of the times you start off in a specific situation you have to escape and you have to type what you want the character to do."
			+ "<br><br> At the top right you see a control panel. Here you can mute the audio, change the UI size, view the changelog, save/load the game, change your language or switch scenes to access your inventory, your status or your built structures. Hover over them to get more information."
			+ "<br><br> At the bottom is your Interface. Type actions and get responses there."
			+ "<br><br> At the top left you'll see the info panel. Here you will get some useful information about the game."
			+ "<br><br> If text is marked with a <span title='Yes, just like this :)' style='cursor:help;background-color:#fff493;'>yellow</span> background, you can hover over it to get extra information."
			+ "<br><br> Also, some actions like " + '"' + "look around" + '"' + " can be performed multiple times to get different results."
			+ "<br><br> To start off, try typing " + '"' + "look around" + '".<br><br>');
			break;
		case "help":
			sendmsg("This is a text adventure game. Most of the times you start off in a specific situation you have to escape and you have to type what you want the character to do."
			+ "<br><br> At the top right you see a control panel. Here you can mute the audio, change the UI size, view the changelog, save/load the game, change your language or switch scenes to access your inventory, your status or your built structures. Hover over them to get more information."
			+ "<br><br> At the bottom is your Interface. Type actions and get responses there."
			+ "<br><br> At the top left you'll see the info panel. Here you will get some useful information about the game."
			+ "<br><br> If text is marked with a <span title='Yes, just like this :)' style='cursor:help;background-color:#fff493;'>yellow</span> background, you can hover over it to get extra information."
			+ "<br><br> Also, some actions like " + '"' + "look around" + '"' + " can be performed multiple times to get different results."
			+ "<br><br> To start off, try typing " + '"' + "look around" + '".<br><br>');
			break;
		case "suicide":
			sendmsg("... you asked for it ...");
			playerdied("suicide");
			break;
		case "tooteral":
			sendmsg("<b><i><span style='color:red;'>TOOTERAL:</span></i></b>");
			sendmsg("This is a text adventure game. Most of the times you start off in a specific situation you have to escape and you have to type what you want the character to do."
			+ "<br><br> At the top right you see a control panel. Here you can mute the audio, change the UI size, view the changelog, save/load the game, change your language or switch scenes to access your inventory, your status or your built structures. Hover over them to get more information."
			+ "<br><br> At the bottom is your Interface. Type actions and get responses there."
			+ "<br><br> At the top left you'll see the info panel. Here you will get some useful information about the game."
			+ "<br><br> If text is marked with a <span title='Yes, just like this :)' style='cursor:help;background-color:#fff493;'>yellow</span> background, you can hover over it to get extra information."
			+ "<br><br> Also, some actions like " + '"' + "look around" + '"' + " can be performed multiple times to get different results."
			+ "<br><br> To start off, try typing " + '"' + "look around" + '".<br><br>');
			break;
		case "die":
			sendmsg("... you asked for it ...");
			playerdied("suicide");
			break;
		case "succ": //please dont                                                    trust me
			var ivi = 0;
			setInterval(function (){
				ivi++;
				if(ivi > 100){
					return;
				}
				else {
					sendmsg("<a href='https://sv443.github.io/code/succ.html' target='_blank'>CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME CLICK ME</a>");
				}
			}, 50);
			break;
		case "save":
			savegame();
			break;
		case "":
			break;
		default:
			if(lcival.includes("swim") || lcival.includes("chop") || lcival.includes("look") || lcival.includes("get") || lcival.includes("harvest") || lcival.includes("retrieve") || lcival.includes("take") || lcival.includes("eat") || lcival.includes("kill") || lcival.includes("load") || lcival.includes("craft") || lcival.includes("create") || lcival.includes("make") || lcival.includes("build") || lcival.includes("explore")){
				multiaction(lcival);
			}
			else if(lcival.includes("fuck")){
				incscore(-1);
				sendmsg("Watch your profanity! (-1 score)");
			}
			else { //if nothing fits, send message
				sendmsg("I don't know how to " + '"' + lcival + '".');
			}
			break;
	}
}

var item_coconut;var item_lianas;var item_rope;
function multiaction(lcival) { // actions that consist of multiple variations and/or attributes
	if(dbg){sendmsg("multiaction triggered", "orange");}
	if(lcival.includes("look")){
		if(lcival.includes("look at")){
			if(lcival.includes("island") && !document.body.innerHTML.includes('You look around on the small island.')){ incscore(150); sendmsg("You look around on the small island. You see a bunch of coconut palm trees. One of the coconuts is hanging very low. Maybe you can get it.");localStorage.setItem("coconut", true); }
			else if(lcival.includes("island") && !document.body.innerHTML.includes('You look around further and find a bunch of lianas.') && document.body.innerHTML.includes('You look around on the small island.')){ incscore(150); sendmsg("You look around further and find a bunch of lianas."); }
			else if(lcival.includes("island") && document.body.innerHTML.includes('You look around further and find a bunch of lianas.')){ if(!document.body.innerHTML.includes("find some flint stones beneath a cliff")){incscore(150);} sendmsg("After exploring the island for the third time you find some flint stones beneath a cliff."); }
			else{ sendmsg("Look at what?"); }
		}
		else if(lcival.includes("around") && !document.body.innerHTML.includes('You look around on the small island.')){ incscore(150);sendmsg("You look around on the small island. You see a bunch of coconut palm trees. One of the coconuts is hanging very low. Maybe you can get it.");localStorage.setItem("coconut", true); }
		else if(lcival.includes("around") && !document.body.innerHTML.includes('You look around further and find a bunch of lianas.') && document.body.innerHTML.includes('You look around on the small island.')){ incscore(150);sendmsg("You look around further and find a bunch of lianas."); }
		else if(lcival.includes("around") && document.body.innerHTML.includes('You look around further and find a bunch of lianas.')){ if(!document.body.innerHTML.includes("find some flint stones beneath a cliff")){incscore(150);}sendmsg("After exploring the island for the third time you find some flint stones beneath a cliff."); }
		else { sendmsg("Look at what?"); }
	}
	else if(lcival.includes("get") || lcival.includes("retrieve") || lcival.includes("take") || lcival.includes("obtain") || lcival.includes("harvest")){
		
		// coconut
		if(lcival.includes("coconut") && !document.body.innerHTML.includes('img id="item_coconut_elem"') && document.body.innerHTML.includes('One of the coconuts is hanging very low')){
			if(dbg){sendmsg("got item: coconut", "orange");}
			if(!document.body.innerHTML.includes("cut the low hanging coconut off")){incscore(100);}
			playaudio("item_knife", 1);
			sendmsg("You take your knife and cut the low hanging coconut off.");
			getitem("item_coconut_elem", "Coconut - Useful if you are hungry (Consumable Effects: provides saturation)", "https://sv443.github.io/TextAdventureGame/coconut_16x16.png", "appenditem");
		}
		else if(lcival.includes("coconut") && !document.body.innerHTML.includes('img id="item_coconut_elem"')){
			sendmsg("You don't know where to get a coconut from! Try looking around first!");
		}
		else if(lcival.includes("coconut") && document.body.innerHTML.includes('img id="item_coconut_elem"')){
			sendmsg("You can't reach any other coconuts!");
		}
		
		
		// flint stone
		else if(lcival.includes("flint") && !document.body.innerHTML.includes('img id="item_flint_stone_elem"') && document.body.innerHTML.includes('find some flint stones beneath a cliff')){
			if(dbg){sendmsg("got item: flint stone", "orange");}
			if(!document.body.innerHTML.includes("discovered and take one of the flint stones")){incscore(100);}
			sendmsg("You get to the cliff you discovered and take one of the flint stones.");
			getitem("item_flint_stone_elem", "Flint Stone - Allan please add details", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/flint_stone_16x16.png", "appenditem");
		}
		else if(lcival.includes("flint") && !document.body.innerHTML.includes('img id="item_flint_stone_elem"')){
			sendmsg("You don't know where to get flint stones from! Try looking around again!");
		}
		else if(lcival.includes("flint") && document.body.innerHTML.includes('img id="item_flint_stone_elem"')){
			sendmsg("You can't carry any more flint stones! Try using the one you have first.");
		}
		
		// lianas
		else if(lcival.includes("liana") && !document.body.innerHTML.includes('img id="item_lianas_elem"') && document.body.innerHTML.includes('find a bunch of lianas.')){
			if(dbg){sendmsg("got item: lianas", "orange");}
			if(!document.body.innerHTML.includes("cut some of the lianas off")){incscore(100);}
			sendmsg("You take your knife and cut some of the lianas off.");
			playaudio("item_knife", 1);
			getitem("item_lianas_elem", "Lianas - Maybe you can craft something with these, Tarzan", "https://sv443.github.io/TextAdventureGame/lianas_16x16.png", "appenditem");
		}
		else if(lcival.includes("liana") && !document.body.innerHTML.includes('img id="item_lianas_elem"')){
			sendmsg("You don't know where to get lianas from! Try looking around first!");
		}
		else if(lcival.includes("liana") && document.body.innerHTML.includes('img id="item_lianas_elem"')){
			sendmsg("You can't reach any other lianas!");
		}
		
		
		else {
			sendmsg("What do you want to get?");
		}
	}
	else if(lcival.includes("craft") || lcival.includes("create") || lcival.includes("make") || lcival.includes("build")){
		
		// rope hint
		if(lcival.includes("liana") && document.body.innerHTML.includes('You take your knife and cut some of the lianas off')){
			sendmsg("You try to figure out what you can craft with the lianas. The first thing that comes to your mind is to make a rope out of it.");
		}
		
		
		// rope
		else if(lcival.includes("rope") && !document.body.innerHTML.includes('img id="item_rope_elem"') && document.body.innerHTML.includes('You take your knife and cut some of the lianas off')){
			if(dbg){sendmsg("got item: rope", "orange");}
			if(!document.body.innerHTML.includes("and get a rope")){incscore(100);}
			sendmsg("You tie the lianas together and get a rope.");
			removeitem("item_lianas_elem");
			getitem("item_rope_elem", "Rope - Tie something together", "https://sv443.github.io/TextAdventureGame/rope_16x16.png", "appenditem");
		}
		else if(lcival.includes("rope") && document.body.innerHTML.includes('img id="item_rope_elem"') && document.body.innerHTML.includes('You take your knife and cut some of the lianas off')) {
			sendmsg("You already have a rope.");
		}
		else if(lcival.includes("rope") && !document.body.innerHTML.includes('img id="item_rope_elem"') && !document.body.innerHTML.includes('You take your knife and cut some of the lianas off')) {
			sendmsg("You'll need some lianas to craft a rope!");
		}
		
		
		// chicken coop
		else if(lcival.includes("coop") && !document.body.innerHTML.includes('img id="structure_chicken_coop_elem"') && document.body.innerHTML.includes('id="item_rope_elem"') && document.body.innerHTML.includes('id="item_logs_elem"')){
			if(dbg){sendmsg("built structure: chicken coop", "orange");}
			if(!document.body.innerHTML.includes("end up with a chicken coop")){incscore(200);}
			sendmsg("You take your logs and tie them together with ropes and end up with a chicken coop. You managed to hatch some eggs you found and also got two hens!");
			removeitem("item_rope_elem");removeitem("item_logs_elem");
			document.getElementById("chickencooppopup").dataset.chickencount="2";
			getitem("structure_chicken_coop_elem", "Chicken Coop - Source of Eggs (Structure Effects: provides food) (Click to enter coop and get extra information)", "https://sv443.github.io/TextAdventureGame/chicken_coop_16x16.png", "appendstructure");
			scenechange(1);
		}
		else if(lcival.includes("coop") && document.body.innerHTML.includes('img id="structure_chicken_coop_elem"') && document.body.innerHTML.includes('id="item_rope_elem"') && document.body.innerHTML.includes('id="item_rope_elem"')) {
			sendmsg("You already have a chicken coop.");
		}
		else if(lcival.includes("coop") && document.body.innerHTML.includes('img id="item_rope_elem"') && !document.body.innerHTML.includes('id="item_logs_elem"')) {
			sendmsg("You'll need some rope and logs to build a chicken coop!");
		}
		else if(lcival.includes("coop") && !document.body.innerHTML.includes('img id="item_rope_elem"') && document.body.innerHTML.includes('id="item_logs_elem"')) {
			sendmsg("You'll need some rope and logs to build a chicken coop!");
		}
		
		
		// shelter
		else if(lcival.includes("shelter") && !document.body.innerHTML.includes('img id="structure_shelter_elem"') && document.body.innerHTML.includes('You tie the lianas together and get a rope') && document.body.innerHTML.includes("take one of the flint stones")){
			if(dbg){sendmsg("built structure: shelter", "orange");}
			if(!document.body.innerHTML.includes("and get a basic shelter")){incscore(200);}
			sendmsg("You tie some trees together with the rope, light a fire with your flint stone and get a basic shelter that'll protect you against rain and freezing.");
			removeitem("item_rope_elem");
			playaudio("crafting", 1);
			removeitem("item_flint_stone_elem");
			if(document.body.innerHTML.includes('title="Raining')){
				removeitem("effect_rain");
			}
			getitem("structure_shelter", "Basic Shelter - Better than nothing (Structure Effects: provides shelter against rain and freezing)", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/shelter_2_16x16.png", "appendstructure");
		}
		else if(lcival.includes("shelter") && document.body.innerHTML.includes("take one of the flint stones") && document.body.innerHTML.includes('img id="structure_shelter_elem"') && document.body.innerHTML.includes('You tie the lianas together and get a rope')) {
			sendmsg("You already have a shelter.");
		}
		else if(lcival.includes("shelter") && !document.body.innerHTML.includes("take one of the flint stones")) {
			sendmsg("You'll need some rope and a flint stone to build a shelter!");
		}
		else if(lcival.includes("shelter") && !document.body.innerHTML.includes('img id="structure_shelter_elem"') && !document.body.innerHTML.includes('You tie the lianas together and get a rope')){
			sendmsg("You'll need some rope and a flint stone to build a shelter!");
		}
		
		
		else {
			sendmsg("What do you want to craft?");
		}
	}
	else if(lcival.includes("eat") || lcival.includes("consume")){
		if(lcival.includes("coconut") && document.body.innerHTML.includes('item_coconut_elem')){
			sendmsg("You ate the coconut and feel saturated. If you didn't eat it, you may have died.");
			playaudio("eating", 1);
			removeitem("effect_hunger");
			removeitem("item_coconut_elem");
		}
		else if(lcival.includes("coconut") && !document.body.innerHTML.includes('img id="item_coconut_elem"')){
			sendmsg("You don't have a coconut yet!");
		}
		else if(lcival.includes("army knife") || lcival.includes("knife")){
			sendmsg("You suffered extreme internal bleeding and died!");
			playerdied("internal bleeding");
		}
		else if(lcival.includes("ass") || lcival.includes("booty") || lcival.includes("butt") || lcival.includes("behind")){
			sendmsg("Da booty too fat to eat.");
		}
		else {
			sendmsg("Eat what?");
		}
		if(document.body.innerHTML.includes("bg_sc_effect_hunger")){removescitem("sc_effect_hunger");}
		scenechange(1);
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
		if(lcival.includes("swim to")){
			if(lcival.includes("your mom") || lcival.includes("ur mom")){
				sendmsg("no u");
			}
			else if(lcival.includes("other island") || lcival.includes("island")){
				sendmsg("You'll need to build a boat to make it to another island!");
			}
			else if(lcival.includes("mainland") || lcival.includes("main land")){
				sendmsg("You'll need to build a boat to make it to the mainland!");
			}
			else {
				sendmsg("Swim where?");
			}
		}
		else {
			sendmsg("Swim where?");
		}
	}
	else if(lcival.includes("explore")){
			if(lcival.includes("your mom") || lcival.includes("ur mom")){
				sendmsg("no u");
			}
			else if(lcival.includes("other island") || lcival.includes("island")){
				sendmsg("You'll need to build a boat to make it to another island to be able to explore it!");
			}
			else if(document.body.innerHTML.includes('discovered a shipwreck') && lcival.includes("wreck")) {
				sendmsg("You explore the shipwreck and stumble upon a hatchet. Maybe you can now cut down some trees!");
				if(!document.body.innerHTML.includes("and stumble upon a hatchet")){incscore(100);}
				getitem("item_hatchet_elem", "Hatchet - Anything but an axe", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/hatchet_16x16.png", "appenditem");
			}
			else if(!document.body.innerHTML.includes('discovered a shipwreck') && lcival.includes("wreck")) {
				sendmsg("You didn't find a shipwreck yet!");
			}
			else {
				sendmsg("Explore what?");
			}
	}
	else if(lcival.includes("chop") && document.body.innerHTML.includes("Maybe you can now cut down some trees!")){
		if(lcival.includes("tree")){
			sendmsg("You chopped down a tree and got some logs.");
			getitem("item_logs_elem", "Logs - Sturdy building material", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/logs_16x16.png", "appenditem");
			playaudio("tree_falling", 1);
		}
		else {
			sendmsg("Chop down what?");
		}
	}
	else if(lcival.includes("chop") && !document.body.innerHTML.includes("Maybe you can now cut down some trees!")){
		sendmsg("You have nothing to chop down a tree with!");
	}
	else if(lcival.includes("load")){
		var loadstring = lcival.replace(/[load ]/g, "");
		loadgame(loadstring);
	}
	else {
		sendmsg("Internal error while comparing entered value. Please contact me via <a href='https://github.com/sv443'>GitHub</a> and tell me what you entered. Thanks!");
	}
}

console.log("initialized TAG_parse.js");
modulecount += 1;
modules_displayname += ", TAG_parser";