// Text Island master code
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license

/*

code tested with Mozilla Firefox, Google Chrome, Opera, Edge (IE 12+) and Tor
code incompatible with Internet Explorer 1-11

*/




// Settings
var curversion = "[B]-0.0.4";
var death_enabled = true; //enable / disable death - default true
var dbg = false; //debug to the html output - default false
var module_load_time = 500; //time buffer for the modules to load / reload. increase if they don't load correctly or decrease if they load too slowly
var daynightcycle_delay = 30000; /*time in ms between the day/night cycle states (12 states/day) (entered time in seconds * 12 / 60 = duration of a full day/night cycle) (or uncomment the following and look in the console to see the duration)*/       //console.log("daynightcycle - full cycle duration: " + daynightcycle_delay/1000*12/60 + " minutes or " + daynightcycle_delay/1000*12 + " seconds");

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
var modulecount = 0;var max_modules = 4;



//listener and initialization module - comment out to partially break the script (have fun)
module_tag_listeners = document.createElement('script');module_tag_listeners.src="TAG_listeners.js";module_tag_listeners.id="script_tag_listeners";document.getElementById("script_tag_master").appendChild(module_tag_listeners);

//save / load module - comment out to disable the usage of the "save" and "load" commands
module_tag_save = document.createElement('script');module_tag_save.src="TAG_save.js";module_tag_save.id="script_tag_save";document.getElementById("script_tag_master").appendChild(module_tag_save);

//timer and timed events module - comment out to disable the timer, day/night cycle and all timed events
module_tag_timer = document.createElement('script');module_tag_timer.src="TAG_timer.js";module_tag_timer.id="script_tag_timer";document.getElementById("script_tag_master").appendChild(module_tag_timer);

//input parsing and processing module - comment out to completely disable all user input processing
module_tag_parser = document.createElement('script');module_tag_parser.src="TAG_parser.js";module_tag_parser.id="script_tag_parser";document.getElementById("script_tag_master").appendChild(module_tag_parser);







function submit() {
	if(!document.body.innerHTML.includes("You died") && document.getElementById("inputelem").value != ""){
		if(dbg){sendmsg("submitting");}
		var inputval = document.getElementById("inputelem").value; // get input value from <input> tag
		//sendmsg("&nbsp;&nbsp;&nbsp;You entered: " + inputval);
		document.getElementById("inputelem").value=""; // clear the text in the <input> tag
		document.getElementById("last_entered").innerHTML=inputval.toLowerCase().replace(/[^-_a-zäöüß0-9 ]/g, "");
		compareival(inputval); // compare the entered value with the available commands
	}
	else if(document.body.innerHTML.includes("You died")) {
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
		error("Please use Firefox, Chrome, Opera, Edge or Tor since Internet Explorer 11 or lower is not supported yet!");
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
		document.title="[B] Text Island (Dead)";
		sendmsg("<span id='status_dead' style='color:red;'>You died of " + deathcause + " at " + timerval + "! Click 'Retry' or press 'Enter' to try again!</span>");
		document.getElementById("retryelem").innerHTML="<br><a onclick='window.location.reload();'><img style='cursor:pointer;width:4vw;height:4vw;' src='https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/retry_arrow_160x160.png' id='retrybtn'></img></a>";
		document.getElementById("effectselem").innerHTML="";document.getElementById("effectselem").outerHTML="";
		document.getElementById("itemelem").innerHTML="";document.getElementById("itemelem").outerHTML="";
		document.getElementById("structureelem").innerHTML="";document.getElementById("structureelem").outerHTML="";
		document.getElementById("inputcontainer").innerHTML="";document.getElementById("inputcontainer").outerHTML="";
	}
	else if(deathcause == "suicide" && !death_enabled){
		document.title="[B] Text Island (Dead)";
		sendmsg("<span id='status_dead' style='color:red;'>You died of " + deathcause + " at " + timerval + "! Click 'Retry' or press 'Enter' to try again!</span>");
		document.getElementById("retryelem").innerHTML="<br><a onclick='window.location.reload();'><img style='cursor:pointer;width:4vw;height:4vw;' src='https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/retry_arrow_160x160.png' id='retrybtn'></img></a>";
		document.getElementById("effectselem").innerHTML="";document.getElementById("effectselem").outerHTML="";
		document.getElementById("structureelem").innerHTML="";document.getElementById("structureelem").outerHTML="";
		document.getElementById("itemelem").innerHTML="";document.getElementById("itemelem").outerHTML="";
	}
	else {
		sendmsg("<span id='status_dead' style='color:red;'>You would have died of " + deathcause + " at " + timerval + " if death wasn't disabled!<br><br><a style='cursor:pointer;' onclick='playerdied(" + '"' + "suicide" + '"' + ")'>&gt;&nbsp;Click here to die anyways&nbsp;&lt;</a></span>");
	}
}

function error(cause) {
	document.title="[B] Text Island (ERROR)";
	sendmsg("<span style='color:red;font-size:1.5em;'>An Error seems to have occured :(<br>Error cause: " + cause + "</span>");
	if(!document.body.innerHTML.includes(cause)){
		alert("An Error seems to have occured :(\nError cause: " + cause);
	}
}

var currentscore;
function incscore(increment) { //item: 100, discovered thing: 150, structure: 200
	var beforescore = document.getElementById("current_score").innerHTML;
	currentscore = parseInt(beforescore) + parseInt(increment);
	document.getElementById("current_score").innerHTML=parseInt(currentscore);
}

document.addEventListener("keydown", function () {document.getElementById("inputelem").focus();});

document.addEventListener("DOMContentLoaded", function (){ //master initialization
	document.getElementById("checkload").innerHTML="";
	document.getElementById("checkload").outerHTML="";
	setInterval(dncycletimer, daynightcycle_delay);
	currentscore = 0;
	startupdater();
	sendmsg("Type " + '"' + "save" + '"' + " to save or " + '"' + "load" + '"' + " to load the game.<br>&gt;&nbsp;You start out stranded on a small island.<br>&gt;&nbsp;All you've got on you is an army knife.<br>&gt;&nbsp;Also you are starving. Find something to eat to survive!<br><br>");
	setTimeout(function () {
		console.log("initialized " + modulecount + "/" + max_modules + " modules");
	}, module_load_time);
});

function startupdater() {
    setTimeout(function () {
		document.getElementById("current_score").innerHTML=currentscore;
		document.getElementById("module_counter").innerHTML=modulecount;
		document.getElementById("max_modules").innerHTML=max_modules;
    }, module_load_time);
}

function dncycle(nbr) {
	var path = "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/daynightcycle%20-%20320x160/time_" + nbr + "_320x160.png";
	document.getElementById("TAG_cycle").src=path;
	document.getElementById("TAG_cycle").dataset.nbr=nbr;
}