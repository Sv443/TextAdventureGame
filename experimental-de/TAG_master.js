// Text Island master code
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license

/*

code tested with Mozilla Firefox, Google Chrome, Opera, Edge (IE 12+) and Tor
code incompatible with Internet Explorer 1-11

*/




// Settings
var curversion = "[B]-0.0.4-de";
var death_enabled = true; //enable / disable death - default true
var max_volume = 0.2; //maximum volume level of played audios - default 0.2 - min 0 - max 1
var dbg = false; //debug to the html output - default false
var module_load_time = 500; //time buffer for the modules to load / reload. increase if they don't load correctly or decrease if they load too slowly
var daynightcycle_delay = 3000; /*time in ms between the day/night cycle states (12 states/day) (entered time in seconds * 12 / 60 = duration of a full day/night cycle) (or uncomment the following and look in the console to see the duration)*/       //console.log("daynightcycle - full cycle duration: " + daynightcycle_delay/1000*12/60 + " minutes or " + daynightcycle_delay/1000*12 + " seconds");
var unlock_all_timed = true; //unlocks all positive timed events (eg. finding the wreck) - default false

var key_send = 13; //key to send action - default 13 (enter)
var key_repeat = 38; //key to paste the last action to the <input> - default 38 (arrow_up)

var time_starving = 7; //in min - default 7
var time_died_of_hunger = 10; //in min - default 10
var time_raining = 12; //in min - default 12
var time_died_of_freezing = 20; //in min - default 20
var time_raining_again = 32; //in min - default 32
var time_died_of_freezing_again = 40; //in min - default 40
var time_found_boat = 22; // in min - default 22
var timer_multiplier = 1; //timer multiplier, make timer faster / slower (2 for double speed, 1 for normal speed, 0.5 for half speed, and so on) - (some things may not work correctly at higher speeds)

//var reg_1 = ['inputval1', 'action1', 'content1', 'inputval2', 'action2', 'content2'];





//load all modules, comment out a module if you don't want it loaded and decrease the max_modules variable by 1 (if you need it to) to update the UI accordingly
//listeners and parser modules are needed, else the script will either not work or error
var modulecount = 0;var max_modules = 5;



//listener and initialization module - comment out to partially break the script (have fun)
module_tag_listeners = document.createElement('script');module_tag_listeners.src="TAG_listeners.js";module_tag_listeners.id="script_tag_listeners";document.getElementById("script_tag_master").appendChild(module_tag_listeners);

//save / load module - comment out to disable the usage of the "save" and "load" commands
module_tag_save = document.createElement('script');module_tag_save.src="TAG_save.js";module_tag_save.id="script_tag_save";document.getElementById("script_tag_master").appendChild(module_tag_save);

//timer and timed events module - comment out to disable the timer, day/night cycle and all timed events
module_tag_timer = document.createElement('script');module_tag_timer.src="TAG_timer.js";module_tag_timer.id="script_tag_timer";document.getElementById("script_tag_master").appendChild(module_tag_timer);

//input parsing and processing module - comment out to completely disable all user input processing
module_tag_parser = document.createElement('script');module_tag_parser.src="TAG_parser.js";module_tag_parser.id="script_tag_parser";document.getElementById("script_tag_master").appendChild(module_tag_parser);

//audio playback module - comment out to disable audio
module_tag_audio = document.createElement('script');module_tag_audio.src="TAG_audio.js";module_tag_audio.id="script_tag_audio";document.getElementById("script_tag_master").appendChild(module_tag_audio);



// changelog

/* 0.0.1 */   var changelogcontent =  "<br><br><br><span style='font-size:0.75vw;'><b>[B]-0.0.1</b></span><br><div style='width:100%;border-top-style:solid;border-width:2px;'></div><br>- basic framework and beginning of story added<br><br>- added coocnut item<br>"
/* 0.0.2 */ 						+ "<br><br><br><span style='font-size:0.75vw;'><b>[B]-0.0.2</b></span><br><div style='width:100%;border-top-style:solid;border-width:2px;'></div><br>- completely reworked UI<br><br>- added status effects, inventory and crafting system<br><br>- added timed events<br><br>- added sidebar with infos<br><br>- added saving and loading mechanism (although loading is disabled)<br>"
/* 0.0.3 */ 						+ "<br><br><br><span style='font-size:0.75vw;'><b>[B]-0.0.3</b></span><br><div style='width:100%;border-top-style:solid;border-width:2px;'></div><br>- added structure system, added basic shelter and explorable shipwreck<br><br>- renamed to Text Island<br><br>- tons and tons of fixes to improve convenience<br><br>- added flint stone and hatchet<br><br>- changed retry button<br><br>- modified sidebar<br><br>- fixed incompatibility errors<br><br>- added score system<br><br>- added many synonyms<br><br>- added day/night cycle with ingame time and time display (currently very fast and with no function)<br><br>- improved scaling of all elements<br>"
/* 0.0.4 */ 						+ "<br><br><br><span style='font-size:0.75vw;'><b>[B]-0.0.4</b></span><br><div style='width:100%;border-top-style:solid;border-width:2px;'></div><br>- added audio system, added some basic placeholder-sounds<br><br>- added ambient sound that plays on load<br><br>- added mute/unmute button<br><br>- redesigned retry button<br><br>- added tree chopping with logs item drop<br><br>- improved day/night cycle and made it independent from game timer<br><br>- added this collapsable ingame changelog display<br><br>- added day/night dependant ambient sounds<br><br>- fixed bug of 'make' always executing the not enough material to build shelter message<br><br>- fixed bug of 'what do you want to get?' message executed after coconut was taken<br><br>- changed position of mute button to the left of the changelog arrow<br><br>- fixed position changes of top right control panel when changelog is opened<br><br>- reformatted changelog a bit<br><br>- removed image display of day/night cycle and made it so the background displays it instead<br><br>- added background underlay behind in/output elements, info panel and control panel<br><br>- changed last save string in the info panel to last saved at (ingame time)<br>";




function submit() {
	if(!document.body.innerHTML.includes("Du bist gestorben") && document.getElementById("inputelem").value != ""){
		if(dbg){sendmsg("submitting");}
		var inputval = document.getElementById("inputelem").value; // get input value from <input> tag
		//sendmsg("&nbsp;&nbsp;&nbsp;You entered: " + inputval);
		document.getElementById("inputelem").value=""; // clear the text in the <input> tag
		document.getElementById("last_entered").innerHTML=inputval.toLowerCase().replace(/[^-_a-zäöüß0-9 ]/g, "");
		compareival(inputval); // compare the entered value with the available commands
	}
	else if(document.body.innerHTML.includes("Du bist gestorben")) {
		window.location.reload();
	}
	document.getElementById("inputelem").focus(); // focus on the <input> tag for convenience
}

function repeat() {
	if(document.getElementById("inputelem").value == ""){
		var latestval = document.getElementById("last_entered").innerHTML.toLowerCase().replace(/[^-_a-zäöüß0-9 ]/g, "");
		if(latestval != ""){document.getElementById("inputelem").value=latestval;}
	}
}

var isie;var ua = window.navigator.userAgent;
detectIE();
function detectIE() {

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older
        isie = true;
		return;
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11
        isie = true;
		return;
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) (works with edge so i'll parse it as not IE)
       isie = false;
	   return;
    }

    // other browser
    isie = false;
	return;
}

function getitem(elemid, title, src, append){
	if(dbg){sendmsg("giving item: id: " + elemid + " - title: " + title + " - src: " + src + " - append: " + append);}
	
	var newelem = document.createElement('span');
	newelem.innerHTML='<abbr id="abbr" style="cursor:help;" title="' + title + '"><img id="' + elemid + '" src="' + src + '" style="width:2vw;height:2vw;"></img></abbr>';
	document.getElementById("" + append).appendChild(newelem);
}

function removeitem(id) {
	if(dbg){sendmsg("removing item: " + id);}
	document.getElementById(id).innerHTML="";
	document.getElementById(id).outerHTML="";
}

var browser;
function getuserdata() {
	if(!isie){
		if(ua.includes("Firefox/")){
			browser = "ff";
		}
		else if(ua.includes("Chrome/") && !ua.includes("OPR/") && !ua.includes("Edge/")){
			browser = "gc";
		}
		else if(ua.includes("Chrome/") && ua.includes("OPR/")){
			browser = "opr";
		}
		else if(ua.includes("Chrome/") && ua.includes("Edge/")){
			browser = "ie12";
		}
		else {
			browser = "incompatible";
		}
	}
	else {
		browser = "incompatible";
		error("Bitte benutze Firefox, Chrome, Opera, Edge oder Tor, da Internet Explorer 11 und niedriger noch nicht unterstützt wird!");
		document.getElementById("inputcontainer").innerHTML="";
		document.getElementById("effectselem").innerHTML="";document.getElementById("effectselem").outerHTML="";
		document.getElementById("structureelem").innerHTML="";document.getElementById("structureelem").outerHTML="";
		document.getElementById("itemelem").innerHTML="";document.getElementById("itemelem").outerHTML="";
		document.getElementById("timercontainer").innerHTML="";document.getElementById("timercontainer").outerHTML="";
	}
	if(dbg){sendmsg("u_agent    : " + ua);sendmsg("browser    : " + browser);}
}

function sendmsg(msgcontent){
	var msgelem = document.createElement("div");
	msgelem.id="jsout";
	msgelem.innerHTML="<div class='outmsg'>&gt;&nbsp;" + msgcontent + "</div><br>";
	document.getElementById("out").appendChild(msgelem);
	document.getElementById("outputelem").scrollTop = document.getElementById("outputelem").scrollHeight - document.getElementById("outputelem").getBoundingClientRect().height;
}

function playerdied(deathcause) {
	if(death_enabled){
		document.title="[B] Text Island (Tot)";
		sendmsg("<span id='status_dead' style='color:red;'>Du bist gestorben an " + deathcause + " bei " + timerval + "! Klicke auf 'Neu Starten' oder drücke die 'Enter'-Taste, um es noch Mal zu versuchen!</span>");
		document.getElementById("retryelem").innerHTML="<br><a onclick='window.location.reload();'><img style='cursor:pointer;width:4vw;height:4vw;' src='https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/retry_arrow_160x160.png' id='retrybtn'></img></a>";
		document.getElementById("effectselem").innerHTML="";document.getElementById("effectselem").outerHTML="";
		document.getElementById("itemelem").innerHTML="";document.getElementById("itemelem").outerHTML="";
		document.getElementById("structureelem").innerHTML="";document.getElementById("structureelem").outerHTML="";
		document.getElementById("inputcontainer").innerHTML="";document.getElementById("inputcontainer").outerHTML="";
	}
	else if(deathcause == "suicide" && !death_enabled){
		document.title="[B] Text Island (Tot)";
		sendmsg("<span id='status_dead' style='color:red;'>Du bist gestorben an " + deathcause + " bei " + timerval + "! Klicke auf 'Neu Starten' oder drücke die 'Enter'-Taste, um es noch Mal zu versuchen!</span>");
		document.getElementById("retryelem").innerHTML="<br><a onclick='window.location.reload();'><img style='cursor:pointer;width:4vw;height:4vw;' src='https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/retry_arrow_160x160.png' id='retrybtn'></img></a>";
		document.getElementById("effectselem").innerHTML="";document.getElementById("effectselem").outerHTML="";
		document.getElementById("structureelem").innerHTML="";document.getElementById("structureelem").outerHTML="";
		document.getElementById("itemelem").innerHTML="";document.getElementById("itemelem").outerHTML="";
	}
	else {
		sendmsg("<span id='status_dead' style='color:red;'>Du wärst an " + deathcause + " bei " + timerval + " gestorben, wenn Tod nicht ausgeschaltet wäre!<br><br><a style='cursor:pointer;' onclick='playerdied(" + '"' + "suicide" + '"' + ")'>&gt;&nbsp;Klicke hier um trotzdem zu sterben!&nbsp;&lt;</a></span>");
	}
}

function error(cause) {
	document.title="[B] Text Island (ERROR)";
	sendmsg("<span style='color:red;font-size:1.5em;'>Ein Error wurde festgestellt :(<br>Error verursacht durch: " + cause + "</span>");
	if(!document.body.innerHTML.includes(cause)){
		alert("Ein Error wurde festgestellt :(\nError verursacht durch: " + cause);
	}
}

var currentscore;
function incscore(increment) { //item: 100, discovered thing: 150, structure: 200
	var beforescore = document.getElementById("current_score").innerHTML;
	currentscore = parseInt(beforescore) + parseInt(increment);
	document.getElementById("current_score").innerHTML=parseInt(currentscore);
}

setTimeout(function (){

	document.addEventListener("keydown", function () {document.getElementById("inputelem").focus();});

	//document.addEventListener("DOMContentLoaded", function (){ //master initialization
		document.getElementById("checkload").innerHTML="";
		document.getElementById("checkload").outerHTML="";
		setInterval(dncycletimer, daynightcycle_delay);
		currentscore = 0;
		startupdater();
		sendmsg("Gib " + '"' + "speichern" + '"' + ", um zu speichern, oder " + '"' + "laden" + '"' + ", um zu laden ein.<br>&gt;&nbsp;Du wachst auf einer Insel gestrandet auf.<br>&gt;&nbsp;Alles was du hast, ist ein Taschenmesser und einen höllischen Hunger.<br>&gt;&nbsp;Finde etwas zu essen!<br><br>");
		setTimeout(function () {
			console.log("initialized " + modulecount + "/" + max_modules + " modules");
		}, module_load_time);
		setTimeout(function () {
			if(unlock_all_timed){sendmsg("Alle positiven Events werden durch die Script-Einstellungen freigeschalten...");}
		}, 100);
	//});
}, 200);

function startupdater() {
    setTimeout(function () {
		document.getElementById("current_score").innerHTML=currentscore;
		document.getElementById("module_counter").innerHTML=modulecount;
		document.getElementById("max_modules").innerHTML=max_modules;
    }, module_load_time);
}

function dncycle(nbr) {
	var path = "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/daynightcycle%20-%20320x160/time_" + nbr + "_320x160.png";
	document.body.background=path;
	document.body.style="background-size: " + window.innerWidth + "px " + window.innerHeight + "px;";
	document.getElementById("TAG_cycle").dataset.nbr=nbr;
}

function togglechangelog() {
	var cl = document.getElementById("changelogelem")
	if(cl.dataset.opened == parseInt(1)){
		cl.innerHTML="";
		cl.dataset.opened="0";
		cl.style="padding:0px;";
		document.getElementById("changelogarrow").src="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/arrow_left_160x160.png";
	}
	else {
		cl.innerHTML="<span style='font-size:1vw;'><b>Changelog (Auf Englisch):</b></span><span style='font-size:0.75vw;'>" + changelogcontent + "</span><br><br>";
		cl.style="background-color:white;box-shadow:5px 5px 10px grey;border-radius:15px;padding:1vw;overflow:auto;height:50vh;width:22vw;";
		document.getElementById("changelogarrow").src="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/arrow_right_160x160.png";
		cl.scrollTop = cl.scrollHeight - cl.getBoundingClientRect().height;
		cl.dataset.opened="1";
	}
}

function general_game_ending() {
	credits();
}

function credits(){
	sendmsg("<span style='font-size:1vw;'><b>Credits:</b></span><br><br>"
	+ "&nbsp;&nbsp;&nbsp;Programmierung:&nbsp;&nbsp;<a href='https://www.github.com/Sv443' target='blank_' style='text-decoration:none;color:blue;'>Sv443 / Sven Fehler</a><br>"
	+ "&nbsp;&nbsp;&nbsp;Grafikdesign:&nbsp;&nbsp;&nbsp;<a href='https://www.github.com/Sv443' target='blank_' style='text-decoration:none;color:blue;'>Sv443 / Sven Fehler</a><br>"
	+ "&nbsp;&nbsp;&nbsp;Audio:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://www.freesound.org' target='blank_' style='text-decoration:none;color:blue;'>Freesound</a> und <a href='https://www.audiomicro.com' target='blank_' style='text-decoration:none;color:blue;'>AudioMicro</a><br>"
	+ "<br><br>&gt;&nbsp;<span style='font-size:1vw;'><b>Speziellen Dank an:</b></span><br><br>"
	+ "&nbsp;&nbsp;&nbsp;<a href='https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer/20618517#20618517' target='blank_' style='text-decoration:none;color:blue;'>Diese</a> StackOverflow Antwort für Inspiration für den Timer-Code<br>"
	+ "&nbsp;&nbsp;&nbsp;LordHamdi für das Testen<br>"
	+ "<br>&nbsp;&nbsp;&nbsp;<b title='Dankeschön :)'><i>Dich</i></b>&nbsp;&nbsp;&nbsp;für das Spielen dieses Spiels :)");
}