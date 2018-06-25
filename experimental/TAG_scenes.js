// Text Island scenes module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license

function scenechange(cres) {
	var ss = document.getElementById("sceneselector");
	var oe = document.getElementById("outputelem");
	var ui = document.getElementById("uicontainer");
	var ip = document.getElementById("timercontainer");
	var cpc = document.getElementById("controlpanelcontainer");
	var ite = document.getElementById("itemelem");
	var sceneval = ss.value;
	
	if(dbg && cres != 1){sendmsg("scene changed to: " + sceneval, "orange");}
	
	document.body.style="background-size: " + window.innerWidth + "px " + window.innerHeight + "px;";
	
	switch(sceneval){
		case "dncycle":
			dncycle(document.getElementById("TAG_cycle").dataset.nbr);
			ui.style="position:absolute;bottom:1vh;left:27vw;";
			oe.style="height:60vh;font-size:0.9vw;";
			cpc.style="position:static;top:0px;right:0px;";
			ite.style="position:fixed;top:120vh;";
			if(document.body.innerHTML.includes('id="structure_shipwreck"') && !document.body.innerHTML.includes("bg_sc_structure_shipwreck")){addscitem("sc_structure_shipwreck", "Shipwreck - A nice shelter and opportunity to do some exploration! (Structure Effects: provides shelter against rain and can be explored to find items)", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/shipwreck_16x16.png");}
			if(document.body.innerHTML.includes("bg_sc_structure_shelter")){removescitem("sc_structure_shelter");}
			if(document.body.innerHTML.includes("bg_sc_effect_hunger")){removescitem("sc_effect_hunger");}
			break;
		case "camp":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/camp_320x160.png";
			ui.style="position:fixed;top:120vh;";
			cpc.style="position:static;top:0px;right:0px;";
			ite.style="position:fixed;top:120vh;";
			if(document.body.innerHTML.includes('id="structure_shelter"') && !document.body.innerHTML.includes("bg_sc_structure_shelter")){addscitem("sc_structure_shelter", "Basic Shelter - Better than nothing (Structure Effects: provides shelter against rain and freezing)", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/shelter_2_16x16.png");}
			if(document.body.innerHTML.includes("bg_sc_structure_shipwreck")){removescitem("sc_structure_shipwreck");}
			if(document.body.innerHTML.includes("bg_sc_effect_hunger")){removescitem("sc_effect_hunger");}
			break;
		case "structures":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/structures_320x160.png";
			ui.style="position:fixed;top:120vh;";
			cpc.style="position:static;top:0px;right:0px;";
			ite.style="position:fixed;top:120vh;";
			if(document.body.innerHTML.includes("bg_sc_structure_shelter")){removescitem("sc_structure_shelter");}
			if(document.body.innerHTML.includes("bg_sc_structure_shipwreck")){removescitem("sc_structure_shipwreck");}
			if(document.body.innerHTML.includes("bg_sc_effect_hunger")){removescitem("sc_effect_hunger");}
			break;
		case "inventory":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/inventory_320x160.png";
			ui.style="position:absolute;bottom:1vh;left:1vh;";
			oe.style="height:30vh;font-size:0.75vw;";
			cpc.style="position:static;top:0px;right:0px;";
			ite.style="position:fixed;right:3.25vw;width:43.5vw;height:43.1vh;top:37.8vh;box-shadow:none;background-color:rgba(0,0,0,0);";
			if(document.body.innerHTML.includes("bg_sc_structure_shelter")){removescitem("sc_structure_shelter");}
			if(document.body.innerHTML.includes("bg_sc_structure_shipwreck")){removescitem("sc_structure_shipwreck");}
			if(document.body.innerHTML.includes("bg_sc_effect_hunger")){removescitem("sc_effect_hunger");}
			break;
		case "status":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/status_320x160.png";
			ui.style="position:absolute;bottom:1vh;left:1vh;";
			oe.style="height:30vh;font-size:0.75vw;";
			cpc.style="position:static;top:0px;right:0px;";
			ite.style="position:fixed;top:120vh;";
			if(document.body.innerHTML.includes("bg_sc_structure_shelter")){removescitem("sc_structure_shelter");}
			if(document.body.innerHTML.includes("bg_sc_structure_shipwreck")){removescitem("sc_structure_shipwreck");}
			if(document.body.innerHTML.includes('id="effect_hunger"') && !document.body.innerHTML.includes("bg_sc_effect_hunger")){addscitem("sc_effect_hunger", "Hunger - You are starving! Eat something ASAP else you'll die at the 10 minute mark!", "https://raw.githubusercontent.com/Sv443/code/master/resources/images/hunger_16x16.png");}
			break;
		default:
			error("An error occurred while switching scenes. Please choose another scene instead and post this bug on GitHub. Thanks!");
			break;
	}
}

function nextscene() {
	
}

function addscitem(id, title, src){
	if(dbg){sendmsg("adding scene item: id: " + id + " - title: " + title + " - src: " + src, "orange");}
	var newelem = document.createElement('span');
	newelem.id="bg_" + id;
	newelem.innerHTML='<abbr id="abbr" style="cursor:help;" title="' + title + '"><img id="' + id + '" src="' + src + '"></img></abbr>';
	document.body.appendChild(newelem);
	scenechange(1);
}

function removescitem(id){
	if(dbg){sendmsg("removing scene item: " + id, "orange");}
	document.getElementById("bg_" + id).innerHTML="";
	document.getElementById("bg_" + id).outerHTML="";
	scenechange(1);
}

console.log("initialized TAG_scenes.js");
modulecount += 1;
modules_displayname += ", TAG_scenes";