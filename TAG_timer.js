// Text Island timer and timed events module
// (c) Sv443 / Sven Fehler 2018 - licensed under MIT license


function timedevent(t_event){
	if(!document.body.innerHTML.includes("id='status_dead'")){
		switch(t_event){
			case "starving":
				if(!document.body.innerHTML.includes("ate the coconut")){
					sendmsg("You are starving! If you don't eat in three minutes, you'll die!");
				}
				break;
			case "died_of_hunger":
				if(!document.body.innerHTML.includes("ate the coconut")){
					sendmsg("You didn't eat fast enough!");
					playerdied("starvation");
				}
				break;
			case "died_of_freezing":
				if(!document.body.innerHTML.includes("get a basic shelter")){
					sendmsg("You didn't build a shelter and froze to death!");
					playerdied("freezing");
				}
				else {
					removeitem("effect_rain");
				}
				break;
			case "raining":
				if(!document.body.innerHTML.includes("get a basic shelter") && !document.body.innerHTML.includes("discovered a shipwreck")){
					sendmsg("It starts to rain. You better build a shelter or you'll freeze to death at the 20 minute mark!");
					getitem("effect_rain", "Raining - Build a shelter or you'll freeze to death at the 20 minute mark!", "https://raw.githubusercontent.com/Sv443/code/master/resources/images/rain_16x16.png", "appendeffect");
				}
				break;
			case "raining_again":
				if(!document.body.innerHTML.includes("It starts to rain")){
					if(!document.body.innerHTML.includes("get a basic shelter") && !document.body.innerHTML.includes("discovered a shipwreck")){
						sendmsg("It starts to rain again. Make sure you have a shelter or you'll freeze to death at the 40 minute mark!");
						getitem("effect_rain", "Raining - Make sure you have a shelter or you'll freeze to death at the 40 minute mark!", "https://raw.githubusercontent.com/Sv443/code/master/resources/images/rain_16x16.png", "appendeffect");
					}
				}
				break;
			case "found_shipwreck":
				sendmsg("You walked around on the islands beach and discovered a shipwreck that you could maybe explore.");
				incscore(150);
				getitem("structure_shipwreck", "Shipwreck - A nice shelter and opportunity to do some exploration! (Structure Effects: provides shelter against rain and can be explored to find items)", "https://raw.githubusercontent.com/Sv443/TextAdventureGame/master/shipwreck_16x16.png", "appendstructure")
				break;
		}
	}
}

var timer_dur = 1000 / timer_multiplier;
var minutes;var seconds;var savetime;
var timerval = "10:00";
function startTimer(duration, display) { //timer code from https://stackoverflow.com/a/20618517
	if(dbg){sendmsg("starting timer");}
    var timer = duration, minutes, seconds;
    setInterval(function () {
		if(!document.body.innerHTML.includes("You died")){
			minutes = parseInt(timer / 60, 10)
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			display.textContent = minutes + ":" + seconds;

			if (++timer < 0) {
				timer = duration;
			}
		
			timerval = minutes + ":" + seconds;
			savetime = minutes + "-" + seconds;
			
			if(minutes == time_starving && seconds == 00){							timedevent("starving");}
			else if(minutes == time_died_of_hunger && seconds == 00){				timedevent("died_of_hunger");}
			else if(minutes == time_raining && seconds == 00){						timedevent("raining");}
			else if(minutes == time_raining_again && seconds == 00){				timedevent("raining_again");}
			else if(minutes == time_died_of_freezing && seconds == 00){				timedevent("died_of_freezing");}
			else if(minutes == time_died_of_freezing_again && seconds == 00){		timedevent("died_of_freezing");}
			else if(minutes == 999 && seconds == 59){								sendmsg("Good job. You just wasted 16 hours, 38 minutes and 59 seconds of your life.")}
			else if(minutes == time_found_boat && seconds == 00){					timedevent("found_shipwreck");}
			//dncycle(Math.floor(seconds/5));
			
			document.title="[B] Text Island (" + minutes + ":" + seconds + ")";
		}
    }, timer_dur);
}

function dncycletimer() {
	var nbr2 = parseInt(document.getElementById("TAG_cycle").dataset.nbr) + 1;
	if(nbr2 == 0 || nbr2 == 12){dncycle(0)}
	else {
		if(dbg){sendmsg("day/night cycle position: " + nbr2);}
		dncycle(parseInt(nbr2));
		var nbrt2 = nbr2 * 2 + 12;
		if(nbrt2 >= 24){
			nbrt2 = parseInt(nbrt2) - 24;
		}
		var nbrp = "";
		if(nbrt2 < 10){
			nbrp = "0";
		}
		var dbgt = "";
		if(dbg){
			dbgt = "  (" + nbr2 + ")";
		}
		if(nbrt2 == 0){
			var curday = document.getElementById("ingame_day").innerHTML;
			curday = parseInt(curday) + 1;
			document.getElementById("ingame_day").innerHTML=curday;
		}
		document.getElementById("ingame_time").innerHTML=nbrp + nbrt2 + ":00" + dbgt;
	}
}

console.log("initialized TAG_timer.js");
modulecount += 1;