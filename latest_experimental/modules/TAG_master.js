// Text Island master code
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license

/*

code tested with Mozilla Firefox, Google Chrome, Opera, Edge (IE 12+) and Tor
code incompatible with Internet Explorer 1-11

*/


// Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings
// Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings
// Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings  --  --  Settings

var curversion = "[B]-0.0.5";
var death_enabled = true; //enable / disable death - default true
var max_volume = 0.2; //maximum volume level of played audios - default and recommended 0.2 - min 0 - max 1
var dbg = false; //debug to the html output - default false
var devmenu = true; //enable developer menu - default false
var module_load_time = 500; //time buffer for the modules to load / reload. increase if they don't load correctly or decrease if they load too slowly
var daynightcycle_delay = 3000; /*time in ms between the day/night cycle states (12 states/day) (entered time in seconds * 12 / 60 = duration of a full day/night cycle) (or uncomment the following and look in the console to see the duration)*/       //console.log("daynightcycle - full cycle duration: " + daynightcycle_delay/1000*12/60 + " minutes or " + daynightcycle_delay/1000*12 + " seconds");
var unlock_all_timed = true; //unlocks all positive timed events (eg. finding the wreck) - default false
var test_item_container = false; //adds a placeholder item every second to test item container - default false

var key_send = 13; //key to send action - default 13 (enter)
var key_repeat = 38; //key to paste the last action to the <input> - default 38 (arrow_up)
var key_next_scene = 9; //key to switch to the next scene - default 9 (tab)

var time_starving = 7; //in min - default 7
var time_died_of_hunger = 10; //in min - default 10
var time_raining = 12; //in min - default 12
var time_died_of_freezing = 20; //in min - default 20
var time_raining_again = 32; //in min - default 32
var time_died_of_freezing_again = 40; //in min - default 40
var time_found_boat = 22; // in min - default 22
var timer_multiplier = 1; //timer multiplier, make timer faster / slower (2 for double speed, 1 for normal speed, 0.5 for half speed, and so on) - (some things may not work correctly at higher speeds)



//load all modules, comment out a module if you don't want it loaded and decrease the max_modules variable by 1 (if you need it to) to update the UI accordingly
//listeners and parser modules are needed, else the script will either not work or error
var modulecount = 0;var max_modules = 7;var modules_displayname = "TAG_master";



//scenes module - comment out to disable different scenes (inventory, structures and status effects cannot be accessed!)
module_tag_scenes = document.createElement('script');module_tag_scenes.src="modules/TAG_scenes.js";module_tag_scenes.id="script_tag_scenes";document.getElementById("script_tag_master").appendChild(module_tag_scenes);

//listener and initialization module - comment out to partially break the script (have fun)
module_tag_listeners = document.createElement('script');module_tag_listeners.src="modules/TAG_listeners.js";module_tag_listeners.id="script_tag_listeners";document.getElementById("script_tag_master").appendChild(module_tag_listeners);

//save / load module - comment out to disable the usage of the "save" and "load" commands
module_tag_save = document.createElement('script');module_tag_save.src="modules/TAG_save.js";module_tag_save.id="script_tag_save";document.getElementById("script_tag_master").appendChild(module_tag_save);

//timer and timed events module - comment out to disable the timer, day/night cycle and all timed events
module_tag_timer = document.createElement('script');module_tag_timer.src="modules/TAG_timer.js";module_tag_timer.id="script_tag_timer";document.getElementById("script_tag_master").appendChild(module_tag_timer);

//input parsing and processing module - comment out to completely disable all user input processing
module_tag_parser = document.createElement('script');module_tag_parser.src="modules/TAG_parser.js";module_tag_parser.id="script_tag_parser";document.getElementById("script_tag_master").appendChild(module_tag_parser);

//audio playback module - comment out to disable audio
module_tag_audio = document.createElement('script');module_tag_audio.src="modules/TAG_audio.js";module_tag_audio.id="script_tag_audio";document.getElementById("script_tag_master").appendChild(module_tag_audio);

//localization module - comment out to disable language changing
module_tag_lang = document.createElement('script');module_tag_lang.src="modules/TAG_lang.js";module_tag_lang.id="script_tag_lang";document.getElementById("script_tag_master").appendChild(module_tag_lang);


// changelog

/* 0.0.1 */   var changelogcontent =  "<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div><span style='font-size:0.75vw;'><b>[B]-0.0.1</b></span><div style='width:0.3vw;height:0.2vw;'></div><div style='width:100%;border-top-style:solid;border-width:2px;'></div><div style='width:0.3vw;height:0.2vw;'></div>- basic framework and beginning of story added<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.2vw;height:0.3vw;'></div>- added coconut item<br><br>"
/* 0.0.2 */ 						+ "<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div><span style='font-size:0.75vw;'><b>[B]-0.0.2</b></span><div style='width:0.3vw;height:0.2vw;'></div><div style='width:100%;border-top-style:solid;border-width:2px;'></div><div style='width:0.3vw;height:0.2vw;'></div>- completely reworked UI<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added status effects, inventory and crafting system<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added timed events<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added sidebar with infos<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added saving and loading mechanism (although loading is disabled)<br><br>"
/* 0.0.3 */ 						+ "<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div><span style='font-size:0.75vw;'><b>[B]-0.0.3</b></span><div style='width:0.3vw;height:0.2vw;'></div><div style='width:100%;border-top-style:solid;border-width:2px;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added structure system, added basic shelter and explorable shipwreck<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- renamed to Text Island<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- tons and tons of fixes to improve convenience<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added flint stone and hatchet<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- changed retry button<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- modified sidebar<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- fixed incompatibility errors<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added score system<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added many synonyms<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added day/night cycle with ingame time and time display (currently very fast and with no function)<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- improved scaling of all elements<br><br>"
/* 0.0.4 */ 						+ "<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div><span style='font-size:0.75vw;'><b>[B]-0.0.4</b></span><div style='width:0.3vw;height:0.2vw;'></div><div style='width:100%;border-top-style:solid;border-width:2px;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added audio system, added some basic placeholder-sounds<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added ambient sound that plays on load<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added mute/unmute button<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- redesigned retry button<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added tree chopping with logs item drop<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- improved day/night cycle and made it independent from game timer<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added this collapsable ingame changelog display<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added day/night dependant ambient sounds<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- fixed bug of 'make' always executing the not enough material to build shelter message<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- fixed bug of 'what do you want to get?' message executed after coconut was taken<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- changed position of mute button to the left of the changelog arrow<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- fixed position changes of top right control panel when changelog is opened<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- reformatted changelog a bit<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- removed image display of day/night cycle and made it so the background displays it instead<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added background underlay behind in/output elements, info panel and control panel<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- changed last save string in the info panel to last saved at (ingame time)<br><br>"
/* 0.0.5 */                         + "<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div><span style='font-size:0.75vw;'><b>[B]-0.0.5</b></span><div style='width:0.3vw;height:0.2vw;'></div><div style='width:100%;border-top-style:solid;border-width:2px;'></div><div style='width:0.3vw;height:0.2vw;'></div>- made it so the modules will be loaded twice for more stability in the UI<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- telling the user if they are using a mobile device because they are currently unsupported<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- hovering over the loaded modules indicator will show all loaded modules<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added css to remove antialiasing on all images which makes them very crisp (background day/night cycle included)<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added ui shortening / hiding / expanding button<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added scene switching which also accordingly changes the positions of the UI<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- fixed some bugs<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added cookie API to make my life a whole lot easier<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added score and item saving and loading<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- adding a ?cmd=XY or ?command=XY after the URL can now execute a command on page load<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- items, structures and statuses are now being displayed in their respective scenes<div style='width:0.3vw;height:0.2vw;'></div><div style='width:0.3vw;height:0.2vw;'></div>- added black border around the UI elements<br><br>";




function submit(command) {
	if(!document.body.innerHTML.includes("You died") && document.getElementById("inputelem").value != "" && command === undefined){
		if(dbg){sendmsg("submitting", "orange");}
		if(command === undefined || command === null){
			var inputval = document.getElementById("inputelem").value; // get input value from <input> tag
		}
		//sendmsg("&nbsp;&nbsp;&nbsp;You entered: " + inputval);
		document.getElementById("inputelem").value=""; // clear the text in the <input> tag
		document.getElementById("last_entered").innerHTML=inputval.toLowerCase().replace(/[^-_a-zäöüß0-9 ]/g, "");
		compareival(inputval); // compare the entered value with the available commands
	}
	else if(command != undefined || command != null){
		if(dbg){sendmsg("submitting", "orange");}
		var inputval = command;
		document.getElementById("inputelem").value="";
		document.getElementById("last_entered").innerHTML=inputval.toLowerCase().replace(/[^-_a-zäöüß0-9 ]/g, "");
		compareival(inputval);
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

function cnt(string1, string2) {//CONTAINS          ...      the acronym stands for contains             ...           not        ... for         ... you know    ...
	detectIE();
	if(!isie){
		if(string2.includes(string1)){
			return true;
		}
		else {
			return false;
		}
	}
	else {
		if(string2.indexOf(string1)){
			return true;
		}
		else {
			return false;
		}
	}
}

const isMobileDevice = window.navigator.userAgent.toLowerCase().includes("mobi");
if(isMobileDevice){alert("Mobile devices are currently not supported! You can still play the game but it is very uncomfortable (scaling issues).");}

function getitem(elemid, title, src, append){
	if(dbg){sendmsg("giving item: id: " + elemid + " - title: " + title + " - src: " + src + " - append: " + append, "orange");}
	
	var newelem = document.createElement('span');
	newelem.innerHTML='<abbr id="abbr" style="cursor:help;" title="' + title + '"><img id="' + elemid + '" src="' + src + '" style="z-index:10;width:3vw;height:3vw;"></img></abbr>';
	document.getElementById("" + append).appendChild(newelem);
	scenechange(1);
}

function removeitem(id) {
	if(dbg){sendmsg("removing item: " + id, "orange");}
	document.getElementById(id).innerHTML="";
	document.getElementById(id).outerHTML="";
	scenechange(1);
}

var browser;
function getuserdata() {
	ua = window.navigator.userAgent;
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
		else if(!ua.includes("Chrome/") || ua.includes("Safari/")){
			browser = "sfr";
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
	if(dbg){sendmsg("u_agent    : " + ua, "orange");sendmsg("browser    : " + browser, "orange");}
}

function sendmsg(msgcontent, color){
	if(color === undefined){
		color = "black";
	}
	var msgelem = document.createElement("div");
	msgelem.id="jsout";
	if(msgcontent === undefined){msgcontent = " ";}
	msgelem.innerHTML="<div class='outmsg' style='color:" + color + ";'>&gt;&nbsp;" + msgcontent + "</div><br>";
	if(document.getElementById("out") != null){document.getElementById("out").appendChild(msgelem);}
	document.getElementById("outputelem").scrollTop = document.getElementById("outputelem").scrollHeight - document.getElementById("outputelem").getBoundingClientRect().height;
}

function playerdied(deathcause) {
	if(death_enabled){
		document.title="[B] Text Island (Dead)";
		sendmsg("<span id='status_dead' style='color:red;'>You died of " + deathcause + " at " + timerval + "! Click 'Retry' or press 'Enter' to try again!</span>");
		document.getElementById("retryelem").innerHTML="<br><a onclick='window.location.reload();' title='Click to retry'><img style='cursor:pointer;width:4vw;height:4vw;' src='https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/retry_arrow_160x160.png' id='retrybtn'></img></a>";
		//document.getElementById("uicontainer").style="height:73vh;";
		document.getElementById("effectselem").innerHTML="";document.getElementById("effectselem").outerHTML="";
		document.getElementById("itemelem").innerHTML="";document.getElementById("itemelem").outerHTML="";
		document.getElementById("structureelem").innerHTML="";document.getElementById("structureelem").outerHTML="";
		document.getElementById("inputcontainer").innerHTML="";document.getElementById("inputcontainer").outerHTML="";
	}
	else if(deathcause == "suicide" && !death_enabled){
		document.title="[B] Text Island (Dead)";
		//document.getElementById("uicontainer").style="height:73vh;";
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
	sendmsg("<span style='color:red;font-size:1.5em;'>An Error seems to have occurred :(<br>Error cause: " + cause + "</span>");
	if(!document.body.innerHTML.includes(cause)){
		alert("An Error seems to have occurred :(\nError cause: " + cause);
	}
}

var currentscore;
function incscore(increment) { //item: 100, discovered thing: 150, structure: 200
	var beforescore = document.getElementById("current_score").innerHTML;
	currentscore = parseInt(beforescore) + parseInt(increment);
	document.getElementById("current_score").innerHTML=parseInt(currentscore);
}

setTimeout(function (){
	
	if(test_item_container){sendmsg("testing item container", "orange");setInterval(function () {getitem("item_flint_stone_elem", "ITEM CONTAINER TEST", "placeholder.png", "appenditem");}, 100);}
	
	document.addEventListener("keydown", function (e) {if(e.keyCode != 17 && e.keyCode != 18){document.getElementById("inputelem").focus();}});

	//document.addEventListener("DOMContentLoaded", function (){ //master initialization
		if(document.getElementById("checkload") != null && document.getElementById("checkload") != undefined){
			document.getElementById("checkload").innerHTML="";
			document.getElementById("checkload").outerHTML="";
		}
		setInterval(dncycletimer, daynightcycle_delay);
		currentscore = 0;
		startupdater();
		sendmsg("You start out stranded on a small island.<br>&gt;&nbsp;All you've got on you is an army knife.<br>&gt;&nbsp;Also you are starving. Find something to eat to survive!<br><br>");
		setTimeout(function () {
			console.log("initialized " + modulecount + "/" + max_modules + " modules");
		}, module_load_time);
		setTimeout(function () {
			if(unlock_all_timed){sendmsg("All positive timed events will now be unlocked through the script settings...");}
			if(devmenu){document.getElementById("devmenu").style="display:block;";}
		}, 100);
		checkforsave();
		checkqstr();
	//});
}, 300);

function startupdater() {
    setTimeout(function () {
		document.getElementById("current_score").innerHTML=currentscore;
		document.getElementById("module_counter").innerHTML=modulecount;
		document.getElementById("max_modules").innerHTML=max_modules;
		document.getElementById("moduletitle").title=modules_displayname;
		saveinit();
		setTimeout(function () {
			document.getElementById("current_score").innerHTML=currentscore;
			document.getElementById("module_counter").innerHTML=modulecount;
			document.getElementById("max_modules").innerHTML=max_modules;
			document.getElementById("moduletitle").title=modules_displayname;
			saveinit();
			if(!document.body.innerHTML.includes("You start out stranded")){
				window.location.reload();
			}
		}, module_load_time);
    }, module_load_time);
}

function dncycle(nbr) {
	var path = "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/daynightcycle%20-%20320x160/time_" + nbr + "_320x160.png";
	if(document.getElementById("sceneselector").value == "dncycle"){
		document.body.background=path;
		document.body.style="background-size: " + window.innerWidth + "px " + window.innerHeight + "px;";
	}
	document.getElementById("TAG_cycle").dataset.nbr=nbr;
}

function togglechangelog() {
	var cl = document.getElementById("changelogelem")
	if(cl.dataset.opened == parseInt(1)){
		cl.innerHTML="";
		cl.dataset.opened="0";
		cl.style="padding:0px;z-index:1200;";
		document.getElementById("changelogarrow").src="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/arrow_left_160x160.png";
	}
	else {
		cl.innerHTML="<span style='font-size:1vw;'><b>Changelog:</b></span><span style='font-size:0.75vw;'><br><br>" + changelogcontent + "</span><br><br>";
		cl.style="background-color:white;box-shadow:5px 5px 10px grey;border-radius:15px;padding:1vw;overflow:auto;height:50vh;width:22vw;z-index:1200;";
		document.getElementById("changelogarrow").src="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/arrow_right_160x160.png";
		cl.scrollTop = cl.scrollHeight - cl.getBoundingClientRect().height;
		cl.dataset.opened="1";
	}
}

function game_ending(ending) {
	if(ending === undefined){
		credits();
	}
}

function credits(){
	sendmsg("<span style='font-size:1vw;'><b>Credits:</b></span><br><br>"
	+ "&nbsp;&nbsp;&nbsp;Programming:&nbsp;&nbsp;<a href='https://www.github.com/Sv443' target='blank_' style='text-decoration:none;color:blue;'>Sv443 / Sven Fehler</a><br>"
	+ "&nbsp;&nbsp;&nbsp;Art Design:&nbsp;&nbsp;&nbsp;<a href='https://www.github.com/Sv443' target='blank_' style='text-decoration:none;color:blue;'>Sv443 / Sven Fehler</a><br>"
	+ "&nbsp;&nbsp;&nbsp;Testing:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LordHamdi<br>"
	+ "&nbsp;&nbsp;&nbsp;Audio:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://www.freesound.org' target='blank_' style='text-decoration:none;color:blue;'>Freesound</a> and <a href='https://www.audiomicro.com' target='blank_' style='text-decoration:none;color:blue;'>AudioMicro</a><br>"
	+ "<br><br>&gt;&nbsp;<span style='font-size:1vw;'><b>Special Thanks to:</b></span><br><br>"
	+ "&nbsp;&nbsp;&nbsp;<a href='https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer/20618517#20618517' target='blank_' style='text-decoration:none;color:blue;'>This</a> StackOverflow answer for inspiration for the timer code<br>"
	+ "&nbsp;&nbsp;&nbsp;<a href='https://stackoverflow.com/questions/14068103/disable-antialising-when-scaling-images/14068216#14068216' target='blank_' style='text-decoration:none;color:blue;'>This</a> StackOverflow answer for the solution to the blurred (anti-aliased) images"
	+ "<br><br>&nbsp;&nbsp;&nbsp;<b title='Thank you :)'><i>You</i></b>&nbsp;&nbsp;for playing this game :)");
}

function collapseui(){
	var ce = document.getElementById("collapseelem");
	var ue = document.getElementById("uicontainer");
	var oe = document.getElementById("outputelem");
	var tc = document.getElementById("timercontainer");
	
	var cs = ce.dataset.state;
	
	if(cs == "normal"){
		cs = "small";
		ce.src="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/uisize_small.png";
		oe.style="height:30vh;font-size:0.75vw;";
		tc.style="font-size:0.75vw;";
		oe.scrollTop = oe.scrollHeight - oe.getBoundingClientRect().height;
	}
	else if(cs == "small"){
		cs = "hidden";
		ce.src="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/uisize_hidden.png";
		ue.style="position:fixed;top:120vh;";
		tc.style="position:fixed;top:120vh;font-size:0.9vw;";
		oe.style="height:60vh;";
	}
	else if(cs == "hidden"){
		cs = "normal";
		ce.src="https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/uisize_normal.png";
		if(document.getElementById("sceneselector").value == "dncycle"){ue.style="position:absolute;bottom:1vh;left:27vw;";} else if(document.getElementById("sceneselector").value == "inventory" || document.getElementById("sceneselector").value == "status"){ue.style="position:absolute;bottom:1vh;left:1vh;";} else if(document.getElementById("sceneselector").value == "camp"){donothing();} else {ue.style="position:static;top:0px;left:0px;";}
		tc.style="position:static;top:0px;";
		if(document.getElementById("sceneselector").value != "inventory" && document.getElementById("sceneselector").value != "status" && document.getElementById("sceneselector").value != "camp"){oe.style="height:60vh;font-size:0.9vw;";} else if(document.getElementById("sceneselector").value != "inventory" && document.getElementById("sceneselector").value != "status" && document.getElementById("sceneselector").value != "camp"){donothing();} else {oe.style="height:30vh;font-size:0.75vw;";}
		oe.scrollTop = oe.scrollHeight - oe.getBoundingClientRect().height;
	}
	ce.dataset.state = cs;
}

function checkqstr() {
	var qstr = window.location.search;
	qstr = qstr.substring(1).replace(/%20/g, " ");;
	if(dbg){sendmsg("QueryString: " + qstr, "orange");}
	var qstra = qstr.split("&");
	for(var i = 0; i < qstra.length; i++) {
		if(qstra[i].includes("cmd=") || qstra[i].includes("command=")){
			qstra2 = qstra[i].split("=");
			submit("" + qstra2[1]);
		}
	}
}

function donothing(){return;}