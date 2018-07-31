// Text Island audio playback module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license


var muteelem;var mutedstate;var audiovolume;

function playaudio(name, volume) {
	if(volume >= max_volume || volume === undefined || volume === null || volume == ""){
		volume = 0.2;
	}
	
	if(dbg){sendmsg("playing audio " + name + " with volume " + volume, "orange");}
	console.log("playing audio " + name + " with volume " + volume);
	
	muteelem = document.getElementById("muteelem");
	mutedstate = muteelem.dataset.muted;
	
	if(mutedstate != 1){
		switch(name){
			case "ambient_0":
				document.getElementById("audio0elem").volume=volume;document.getElementById("audio0elem").play();
				break;
			case "ambient_1":
				document.getElementById("audio1elem").volume=volume;document.getElementById("audio1elem").play();
				break;
			case "ambient_2":
				document.getElementById("audio7elem").volume=volume;document.getElementById("audio7elem").play();
				break;
			case "ambient_3":
				document.getElementById("audio8elem").volume=volume;document.getElementById("audio8elem").play();
				break;
			case "item_knife":
				document.getElementById("audio2elem").volume=volume;document.getElementById("audio2elem").play();
				break;
			case "crafting":
				document.getElementById("audio3elem").volume=volume;document.getElementById("audio3elem").play();
				break;
			case "eating":
				document.getElementById("audio4elem").volume=volume;document.getElementById("audio4elem").play();
				break;
			case "starving":
				document.getElementById("audio5elem").volume=volume+0.3;document.getElementById("audio5elem").play(); //stomach rumbling is turned up a bit so it's a bit more noticable
				break;
			case "tree_falling":
				document.getElementById("audio6elem").volume=volume+0.1;document.getElementById("audio6elem").play();
				break;
			case "chicken_0_0":
				document.getElementById("audio9elem").volume=volume+0.1;document.getElementById("audio9elem").play();
				break;
			case "chicken_0_1":
				document.getElementById("audio10elem").volume=volume+0.1;document.getElementById("audio10elem").play();
				break;
			case "chicken_1_0":
				document.getElementById("audio11elem").volume=volume+0.1;document.getElementById("audio11elem").play();
				break;
			case "chicken_1_1":
				document.getElementById("audio12elem").volume=volume+0.1;document.getElementById("audio12elem").play();
				break;
			case "chicken_2_0":
				document.getElementById("audio13elem").volume=volume+0.1;document.getElementById("audio13elem").play();
				break;
			case "chicken_2_1":
				document.getElementById("audio14elem").volume=volume+0.1;document.getElementById("audio14elem").play();
				break;
			default:break;
		}
	}
}

function togglemute() {
	
	muteelem = document.getElementById("muteelem");
	mutedstate = muteelem.dataset.muted;
	
	if(dbg){sendmsg(mutedstate, "orange");}
	
	if(mutedstate == 0){
		muteelem.src="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/mute_1_128x128.png";
		muteelem.dataset.muted=1;
		mutedstate = 1;
	}
	else if (mutedstate == 1){
		muteelem.src="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/mute_0_128x128.png";
		muteelem.dataset.muted=0;
		mutedstate = 0;
	}
	
	mutedstate = parseInt(muteelem.dataset.muted);
	if(mutedstate == 0){
		sendmsg("You unmuted the game.");
		volume = max_volume;
	}
	else if(mutedstate == 1) {
		sendmsg("You muted the game.");
		document.title = document.title + " 🔇";
		volume = 0;
	}
	document.getElementById("audio0elem").volume=volume;document.getElementById("audio1elem").volume=volume;document.getElementById("audio2elem").volume=volume;document.getElementById("audio3elem").volume=volume;document.getElementById("audio4elem").volume=volume;document.getElementById("audio5elem").volume=volume;document.getElementById("audio6elem").volume=volume;document.getElementById("audio7elem").volume=volume;document.getElementById("audio8elem").volume=volume;
}

function ambientsounds() {
	var delay = Math.floor(Math.random()*120000); //120000
	if(delay < 60000){delay+=60000;}
	if(dbg){sendmsg("ambient sound interval: " + delay, "orange");}
	console.log("ambient sound interval: " + Math.floor(delay/1000));
	setInterval(function (){
		if(document.getElementById().dataset.nbr >= 4 && document.getElementById().dataset.nbr <= 8){
			var anbr = Math.floor(Math.random()*2) + 2;
			playaudio("ambient_" + anbr, 1); //play ambient nighttime sound at a random interval between 1 and 2 minutes
		}
		else {
			playaudio("ambient_" + Math.floor(Math.random()*2), 1); //play ambient daytime sound at a random interval between 1 and 2 minutes
		}
	}, delay);
}

document.addEventListener("DOMContentLoaded", function (){ambientsounds();});

setTimeout(function () {playaudio("ambient_" + Math.floor(Math.random()*2), 1);}, 1500);


console.log("initialized TAG_audio.js");
modulecount += 1;
modules_displayname += ", TAG_audio";