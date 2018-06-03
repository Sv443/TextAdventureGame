// Init
//var debugmode = 2;// 0 = off, 1 = console, 2 = console + alert
var key_send = 13;
var curversion = "0.0.1";
var time_starving = 300000; //in ms
var time_died_of_hunger = 600000; //in ms
//reg1[] = "test", "dbg", "Sv443";

// Script



document.addEventListener("keyup", function (e){
	if(e.keyCode == key_send){
		submit();
	}	
});

function submit() {
	var inputval = document.getElementById("inputelem").value;
	//sendmsg("&nbsp;&nbsp;&nbsp;You entered: " + inputval);
	document.getElementById("inputelem").value="";
	compareival(inputval);
}

function compareival(inputval) {
	var lcival = inputval.toLowerCase().replace(/[^a-zA-Z ]/g, "");
    switch(lcival){
		case "ping":
			sendmsg("Pong!");
			break;
		case "sv443":
			sendmsg("<a href='https://github.com/Sv443' target='_blank'>Sv443 on GitHub</a>");
			break;
		case "tutorial":
			sendmsg("This is a text adventure game. Most of the times you start off in a specific situation you have to escape and you have to type what you want the character to do."
			+ " Here you can start off by typing " + '"' + "look around" + '"' + ". Try it!");
			break;
		case "look":
			multiaction(lcival);
			break;
		case "die":
			sendmsg("... you asked for it ...");
			playerdied("");
			break;
		case "succ":
			window.location.replace("http://sv443.net/succ");
			break;
		case "":
			break;
		default:
			if(lcival.includes("look") || lcival.includes("get") || lcival.includes("retrieve") || lcival.includes("take") || lcival.includes("eat")){
				multiaction(lcival);
			}
			else {
				callaction(0, 0, lcival);
			}
			break;
	}
}

function multiaction(lcival) {
	if(lcival.includes("look")){
		if(lcival.includes("look at")){
			if(lcival.includes("island")){ sendmsg("You look around on the small island. You see a bunch of coconut palm trees. One of the coconuts is hanging very low. Maybe you can get it.");localStorage.setItem("coconut", true); }
			else{ sendmsg("Look at what?"); }
		}
		else if(lcival.includes("around")){ sendmsg("You look around on the small island. You see a bunch of coconut palm trees. One of the coconuts is hanging very low. Maybe you can get it.");localStorage.setItem("coconut", true); }
		else { sendmsg("Look at what?"); }
	}
	else if(lcival.includes("get") || lcival.includes("retrieve") || lcival.includes("take")){
		if(lcival.includes("coconut")){
			sendmsg("You take your knife and cut the low hanging coconut off.");
		}
		else {
			sendmsg("What do you want to get?");
		}
	}
	else if(lcival.includes("eat")){
		if(lcival.includes("coconut")){
			sendmsg("You ate the coconut and feel saturated. If you didn't eat it, you may have died.");
		}
		else if(lcival.includes("ass") || lcival.includes("booty")){
			sendmsg("Da booty too fat to eat.");
		}
		else {
			sendmsg("Eat what?");
		}
	}
	else {
		sendmsg("Internal error.");
	}
}

function timeevent(timeelapsed){
	switch(timeelapsed){
		case 300000:
			if(!document.body.innerHTML.includes("ate the coconut")){
				sendmsg("You are starving! If you don't eat in five minutes, you'll die!");
			}
			break;
		case 600000:
			if(!document.body.innerHTML.includes("ate the coconut")){
				sendmsg("You didn't eat fast enough!");
				playerdied();
			}
			break;
	}
}

function playerdied() {
	sendmsg("<span style='color:red;'>You succumbed to the island!</span>");
	document.getElementById("inputcontainer").innerHTML="<a style='text-decoration:none;color:blue;' href=''>Retry</a>";
}

function callaction(regnbr, entrynbr, inputval){
	if(regnbr == 0){
		sendmsg("I don't know what you mean by " + '"' + inputval + '".');
	}
	else{
		alert("RegNbr: " + regnbr + "Entrynbr" + entrynbr);
	}
}

function sendmsg(msgcontent){
	var newelem = document.createElement("div");
	newelem.id="jsout";
	newelem.innerHTML="<div class='outmsg'>&gt;&nbsp;" + msgcontent + "</div><br>";
	document.getElementById("out").appendChild(newelem);
	document.getElementById("outputelem").scrollTop = document.getElementById("outputelem").scrollHeight - document.getElementById("outputelem").getBoundingClientRect().height;
}

document.addEventListener("DOMContentLoaded", function(){
	setTimeout(function() { timeevent(300000); }, time_starving);setTimeout(function() { timeevent(600000); }, time_died_of_hunger);
	document.getElementById("checkload").innerHTML="";
	sendmsg("You start out on a small island.<br>&gt;&nbsp;All you've got on you is an army knife.<br>");
});