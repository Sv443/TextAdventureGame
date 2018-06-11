/*

code tested with Mozilla Firefox, Google Chrome, Opera, Edge (IE 12+) and Tor
code incompatible with Internet Explorer 1-11

*/




// Settings
var dbg = false; //debug to the html output default false
var module_load_time = 500; //time for the modules to load. increase if they don't load correctly
var key_send = 13; //key to send action default 13 (enter)
var key_repeat = 38; //key to paste the last action to the <input> default 38 (arrow_up)
var curversion = "0.0.2";
var time_starving = 7; //in min default 7
var time_died_of_hunger = 10; //in min default 10
var time_raining = 12; //in min default 12
//var reg_1 = ['inputval1', 'action1', 'content1', 'inputval2', 'action2', 'content2'];

// Script




//load all modules
var modulecount = 0;
var max_modules = 4;
module_tag_save = document.createElement('script');module_tag_save.src="TAG_save.js";module_tag_save.id="script_tag_save";document.getElementById("script_tag_master").appendChild(module_tag_save);
module_tag_listeners = document.createElement('script');module_tag_listeners.src="TAG_listeners.js";module_tag_listeners.id="script_tag_listeners";document.getElementById("script_tag_master").appendChild(module_tag_listeners);
module_tag_timer = document.createElement('script');module_tag_timer.src="TAG_timer.js";module_tag_timer.id="script_tag_timer";document.getElementById("script_tag_master").appendChild(module_tag_timer);
module_tag_parser = document.createElement('script');module_tag_parser.src="TAG_parser.js";module_tag_parser.id="script_tag_parser";document.getElementById("script_tag_master").appendChild(module_tag_parser);

function submit() {
	if(!document.body.innerHTML.includes("You died") && document.getElementById("inputelem").value != ""){
		if(dbg){sendmsg("submitting");}
		var inputval = document.getElementById("inputelem").value; // get input value from <input> tag
		//sendmsg("&nbsp;&nbsp;&nbsp;You entered: " + inputval);
		document.getElementById("inputelem").value=""; // clear the text in the <input> tag
		document.getElementById("last_entered").innerHTML=inputval;
		compareival(inputval); // compare the entered value with the available commands
	}
	else if(document.body.innerHTML.includes("You died")) {
		window.location.reload();
	}
}

function repeat() {
	var latestval = document.getElementById("last_entered").innerHTML;
	if(latestval != ""){document.getElementById("inputelem").value=latestval;}
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
		sendmsg("<span style='color:red;font-size:25px;'>Please use Firefox or Chrome since Internet Explorer is not supported yet!</span>");
		document.getElementById("inputcontainer").innerHTML="";
		document.getElementById("effectselem").innerHTML="";document.getElementById("effectselem").outerHTML="";
		document.getElementById("itemelem").innerHTML="";document.getElementById("itemelem").outerHTML="";
		document.getElementById("timercontainer").innerHTML="";document.getElementById("timercontainer").outerHTML="";
	}
	if(dbg){sendmsg("u_agent    : " + ua);sendmsg("browser    : " + browser);}
}

function sendmsg(msgcontent){
	var newelem = document.createElement("div");
	newelem.id="jsout";
	newelem.innerHTML="<div class='outmsg'>&gt;&nbsp;" + msgcontent + "</div><br>";
	document.getElementById("out").appendChild(newelem);
	document.getElementById("outputelem").scrollTop = document.getElementById("outputelem").scrollHeight - document.getElementById("outputelem").getBoundingClientRect().height;
}

function playerdied(deathcause) {
	sendmsg("<span id='status_dead' style='color:red;'>You died of " + deathcause + " at " + timerval + "! Click 'Retry' or press 'Enter' to try again!</span>");
	document.getElementById("inputcontainer").innerHTML="<button id='retryelem' style='font-family:Consolas;' onclick='window.location.reload();'>&gt; Retry &lt;</button>";
	document.getElementById("effectselem").innerHTML="";document.getElementById("effectselem").outerHTML="";
	document.getElementById("itemelem").innerHTML="";document.getElementById("itemelem").outerHTML="";
}

document.addEventListener("DOMContentLoaded", function (){ startupdater();setTimeout(function () {console.log("initialized " + modulecount + "/" + max_modules + " modules");}, module_load_time); });

function startupdater() {
    setTimeout(function () {
		document.getElementById("module_counter").innerHTML=modulecount;
    }, module_load_time);
}