// TextAdventureGame event listener module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license


document.addEventListener("keyup", function (e){
	if(e.keyCode == key_send){
		submit();
	}
	else if(e.keyCode == key_repeat){
		repeat();
	}
});

document.addEventListener("DOMContentLoaded", function(){
	getuserdata();
	document.getElementById("inputelem").focus();
	document.getElementById("checkload").innerHTML="";
	sendmsg("Type " + '"' + "save" + '"' + " to save or " + '"' + "load" + '"' + " to load the game.<br>&gt;&nbsp;You start out stranded on a small island.<br>&gt;&nbsp;All you've got on you is an army knife.<br>&gt;&nbsp;Also you are starving. Find something to eat to survive!<br><br>");
});

window.onload = function () {
	if(dbg){sendmsg("window loaded");}
    var display = document.querySelector('#game_timer');
    startTimer(0, display);
};

console.log("initialized TAG_listeners.js");
modulecount += 1;