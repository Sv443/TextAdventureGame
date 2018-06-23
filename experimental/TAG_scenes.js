// Text Island scenes module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license

function scenechange(cres) {
	var ss = document.getElementById("sceneselector");
	var oe = document.getElementById("outputelem");
	var ui = document.getElementById("uicontainer");
	var ip = document.getElementById("timercontainer");
	var cpc = document.getElementById("controlpanelcontainer");
	var sceneval = ss.value;
	
	if(dbg && cres != 1){sendmsg("scene changed to: " + sceneval, "orange");}
	
	document.body.style="background-size: " + window.innerWidth + "px " + window.innerHeight + "px;";
	
	switch(sceneval){
		case "dncycle":
			dncycle(document.getElementById("TAG_cycle").dataset.nbr);
			ui.style="position:absolute;bottom:1vh;left:27vw;";
			oe.style="height:60vh;font-size:0.9vw;";
			cpc.style="position:static;top:0px;right:0px;";
			break;
		case "camp":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/camp_320x160.png";
			ui.style="position:fixed;top:120vh;";
			cpc.style="position:static;top:0px;right:0px;";
			break;
		case "inventory":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/inventory_320x160.png";
			ui.style="position:absolute;bottom:1vh;left:1vh;";
			oe.style="height:30vh;font-size:0.75vw;";
			cpc.style="position:static;top:0px;right:0px;";
			break;
		case "status":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/status_320x160.png";
			ui.style="position:absolute;bottom:1vh;left:1vh;";
			oe.style="height:30vh;font-size:0.75vw;";
			cpc.style="position:static;top:0px;right:0px;";
			break;
		default:
			error("An error occurred while switching scenes. Please choose another scene instead and post this bug on GitHub. Thanks!");
			break;
	}
}

console.log("initialized TAG_scenes.js");
modulecount += 1;
modules_displayname += ", TAG_scenes";