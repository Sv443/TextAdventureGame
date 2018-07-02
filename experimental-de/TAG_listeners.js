// Text Island event listener and additional initialization module
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
	document.getElementById("inputelem").value="";
});

window.onload = function () {
	if(dbg){sendmsg("window loaded");}
    var display = document.getElementById("game_timer");
    startTimer(0, display);
	dncycletimer(0, display);
};

console.log("initialized TAG_listeners.js");
modulecount += 1;