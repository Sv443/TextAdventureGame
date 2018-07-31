// Text Island scenes module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license

function scenechange(cres, scene) {
	var ss = document.getElementById("sceneselector");
	if(scene === undefined){var sceneval = ss.value;} else {var sceneval = scene;document.getElementById("sceneselector").value=scene;}
	var oe = document.getElementById("outputelem");
	var ui = document.getElementById("uicontainer");
	var ip = document.getElementById("timercontainer");
	var cpc = document.getElementById("controlpanelcontainer");
	var ite = document.getElementById("itemelem");
	var cs = document.getElementById("collapseelem").dataset.state;
	
	if(dbg && cres != 1){sendmsg("scene changed to: " + sceneval, "orange");}
	
	document.body.style="background-size: " + window.innerWidth + "px " + window.innerHeight + "px;";
	
	switch(sceneval){
		case "dncycle":
			dncycle(document.getElementById("TAG_cycle").dataset.nbr);
			if(cs != "hidden"){ui.style="position:absolute;bottom:1vh;left:27vw;";}
			oe.style="height:60vh;font-size:0.9vw;";
			cpc.style="position:static;top:0px;right:0px;";
			ite.style="position:fixed;top:120vh;";
			if(document.body.innerHTML.includes('id="structure_shipwreck"') && !document.body.innerHTML.includes("bg_sc_structure_shipwreck")){addscitem("sc_structure_shipwreck", "Shipwreck - A nice shelter and opportunity to do some exploration! (Structure Effects: provides shelter against rain and can be explored to find items)", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/shipwreck_16x16.png");}
			if(document.body.innerHTML.includes("bg_sc_structure_shelter")){removescitem("sc_structure_shelter");}
			if(document.body.innerHTML.includes("bg_sc_effect_hunger")){removescitem("sc_effect_hunger");}
			if(document.body.innerHTML.includes("bg_sc_structure_chicken_coop")){removescitem("sc_structure_chicken_coop");}
			break;
		case "camp":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/camp_320x160.png";
			ui.style="position:fixed;top:120vh;";
			cpc.style="position:static;top:0px;right:0px;";
			ite.style="position:fixed;top:120vh;";
			if(document.body.innerHTML.includes('id="structure_shelter"') && !document.body.innerHTML.includes("bg_sc_structure_shelter")){addscitem("sc_structure_shelter", "Basic Shelter - Better than nothing (Structure Effects: provides shelter against rain and freezing)", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/shelter_2_16x16.png");}
			if(document.body.innerHTML.includes("bg_sc_structure_shipwreck")){removescitem("sc_structure_shipwreck");}
			if(document.body.innerHTML.includes("bg_sc_effect_hunger")){removescitem("sc_effect_hunger");}
			if(document.body.innerHTML.includes("bg_sc_structure_chicken_coop")){removescitem("sc_structure_chicken_coop");}
			break;
		case "structures":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/structures_320x160.png";
			ui.style="position:fixed;top:120vh;";
			cpc.style="position:static;top:0px;right:0px;";
			ite.style="position:fixed;top:120vh;";
			if(document.body.innerHTML.includes('id="structure_chicken_coop_elem"') && !document.body.innerHTML.includes("bg_sc_structure_chicken_coop")){addscitem("sc_structure_chicken_coop", "Chicken Coop - Source of Eggs (Structure Effects: provides food) (Click to enter coop and get extra information)", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/chicken_coop_16x16.png", "entercoop();", "pointer");}
			if(document.body.innerHTML.includes("bg_sc_structure_shelter")){removescitem("sc_structure_shelter");}
			if(document.body.innerHTML.includes("bg_sc_structure_shipwreck")){removescitem("sc_structure_shipwreck");}
			if(document.body.innerHTML.includes("bg_sc_effect_hunger")){removescitem("sc_effect_hunger");}
			break;
		case "inventory":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/inventory_320x160.png";
			if(cs != "hidden"){ui.style="position:absolute;bottom:1vh;left:1vh;";}
			oe.style="height:30vh;font-size:0.75vw;";
			cpc.style="position:static;top:0px;right:0px;";
			ite.style="position:fixed;right:3.25vw;width:43.5vw;height:43.1vh;top:37.8vh;box-shadow:none;background-color:rgba(0,0,0,0);overflow:auto;";
			if(document.body.innerHTML.includes("bg_sc_structure_shelter")){removescitem("sc_structure_shelter");}
			if(document.body.innerHTML.includes("bg_sc_structure_shipwreck")){removescitem("sc_structure_shipwreck");}
			if(document.body.innerHTML.includes("bg_sc_effect_hunger")){removescitem("sc_effect_hunger");}
			if(document.body.innerHTML.includes("bg_sc_structure_chicken_coop")){removescitem("sc_structure_chicken_coop");}
			break;
		case "status":
			document.body.background="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/scenes/status_320x160.png";
			if(cs != "hidden"){ui.style="position:absolute;bottom:1vh;left:1vh;";}
			oe.style="height:30vh;font-size:0.75vw;";
			cpc.style="position:static;top:0px;right:0px;";
			ite.style="position:fixed;top:120vh;";
			if(document.body.innerHTML.includes("bg_sc_structure_shelter")){removescitem("sc_structure_shelter");}
			if(document.body.innerHTML.includes("bg_sc_structure_shipwreck")){removescitem("sc_structure_shipwreck");}
			if(document.body.innerHTML.includes("bg_sc_structure_chicken_coop")){removescitem("sc_structure_chicken_coop");}
			if(document.body.innerHTML.includes('id="effect_hunger"') && !document.body.innerHTML.includes("bg_sc_effect_hunger")){addscitem("sc_effect_hunger", "Hunger - You are starving! Eat something ASAP else you'll die at the 10 minute mark!", "https://raw.githubusercontent.com/Sv443/code/master/resources/images/hunger_16x16.png");}
			break;
		default:
			error("An error occurred while switching scenes. Please choose another scene instead and post this bug on GitHub. Thanks!");
			break;
	}
}

function nextscene() {
	var cursc = document.getElementById("sceneselector").value;
	switch(cursc){
		case "dncycle":
			scenechange(0, "camp");
			break;
		case "camp":
			scenechange(0, "structures");
			break;
		case "structures":
			scenechange(0, "inventory");
			break;
		case "inventory":
			scenechange(0, "status");
			break;
		case "status":
			scenechange(0, "dncycle");
			break;
	}
}

function addscitem(id, title, src, onclick, cursor, style, append){
	if(append === undefined){append = document.body;} else {append = document.getElementById(append);}
	if(onclick === undefined){onclick = "";}
	if(style === undefined){style = "";}
	if(cursor === undefined){cursor = "help";}
	if(dbg){sendmsg("adding scene item: id: " + id + " - title: " + title + " - src: " + src, "orange");}
	var newelem = document.createElement('span');
	newelem.id="bg_" + id;
	newelem.innerHTML='<abbr id="abbr" style="cursor:' + cursor + ';" title="' + title + '"><img onclick="' + onclick + '" id="' + id + '" src="' + src + '" style="' + style + '"></img></abbr>';
	append.appendChild(newelem);
	scenechange(1);
}

function removescitem(id){
	if(dbg){sendmsg("removing scene item: " + id, "orange");}
	document.getElementById("bg_" + id).innerHTML="";
	document.getElementById("bg_" + id).outerHTML="";
	scenechange(1);
}

function entercoop() {
	var cpopupe = document.getElementById("chickencooppopup");
	var chickencount = cpopupe.dataset.chickencount;
	if(chickencount == 0){chickencount = 2;}
	cpopupe.style="top:5vh;position:relative;";
	for(var i = 0; i < chickencount; i++){
		var chickenage = "0";
		chickenage = cpopupe.dataset.chickenage;
		//addscitem("sc_structure_chicken", "Chicken - produces Eggs", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/chicken_" + chickenage + "_16x16.png", undefined, undefined, "z-index:3;", "appendchicken");
		addscitem("sc_structure_chicken", "Chicken - produces Eggs", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/placeholder.png", undefined, undefined, "z-index:3;", "appendchicken");
	}
	document.addEventListener("keydown", function (e) {if(e.keyCode == 27){leavecoop();}});
}

function leavecoop() {
	var cpopupe = document.getElementById("chickencooppopup");
	cpopupe.style="top:120vh;position:fixed;";
}

console.log("initialized TAG_scenes.js");
modulecount += 1;
modules_displayname += ", TAG_scenes";