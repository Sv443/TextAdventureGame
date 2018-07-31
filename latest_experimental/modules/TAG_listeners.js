// Text Island event listener and additional initialization module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license


document.addEventListener("keyup", function (e){
	if(e.keyCode == key_send){
		submit();
	}
	else if(e.keyCode == key_repeat){
		repeat();
	}
	else if(e.keyCode == key_next_scene){
		nextscene();
	}
});

document.addEventListener("DOMContentLoaded", function(){
	scenechange();
	getuserdata();
	document.getElementById("inputelem").focus();
	document.getElementById("inputelem").value="";
	document.getElementById("TAG_cycle").title="(TAG) Text Island v" + curversion;
});

window.onload = function () {
    var display = document.querySelector('#game_timer');
    startTimer(0, display);
	dncycletimer(0, display);
};

window.onresize = function(event) {
	dncycle(document.getElementById("TAG_cycle").dataset.nbr); // instantly resizes background image if window size is changed
	scenechange(1);
}

document.addEventListener("orientationchange", function (){
	dncycle(document.getElementById("TAG_cycle").dataset.nbr); // instantly resizes background image if window orientation is changed
	scenechange(1);
});

console.log("initialized TAG_listeners.js");
modulecount += 1;
modules_displayname += ", TAG_listeners";