// Text Island localization module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license


var queryString = window.location.search.substring(1);
var URLhost = window.location.host;var URLpath = window.location.pathname;var curURL = URLhost + "" + URLpath;

function langchange() {
	var ls = document.getElementById("langselector");
	sendmsg("Changing Language to: " + ls.value);
	sendmsg("the language change feature is currently in work!", "red");
}

/*
function chen() { //change to english
	console.log("changed to EN");
	document.title = "";
	
	document.getElementById("lang0").innerHTML="";
	
	window.history.pushState(null, null, '?lang=de');
}

function chde() { //change to german
	console.log("changed to DE");
	document.title = "";
	
	document.getElementById("lang0").innerHTML="";
	
	window.history.pushState(null, null, '?lang=de');
}


var browserlang = navigator.language;

console.log("browser-language: ", browserlang);

//change website lang to browsers lang if theres no querystring

if(queryString == "" || queryString === null || queryString === undefined) {
	if(browserlang == "de" || browserlang == "de-DE") {
		window.location.replace(httpt + URLhost + "?lang=de");
	}
	else if(browserlang == "en" || browserlang == "en-US" || browserlang == "en-UK") {
		window.location.replace(httpt + URLhost + "?lang=de");
	} else {
		window.location.replace(httpt + URLhost + "?lang=de");
	}
}

//change lang according to qstring

if(queryString.includes("lang=de")) { //change to german
	chde();
}

if(queryString.includes("lang=en") || !queryString.includes("lang=de")) { //change to english
	chen();
}
*/

console.log("initialized TAG_lang.js");
modulecount += 1;
modules_displayname += ", TAG_lang";