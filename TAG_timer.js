// TextAdventureGame timer and timed events module
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
			case "raining":
				if(!document.body.innerHTML.includes("id='status_dead'")){
					sendmsg("It starts to rain. You better build a shelter or you'll freeze to death!");
					effect_rain = document.createElement('span');effect_rain.innerHTML='<abbr id="effectabbr" style="cursor:help;" title="Raining - Build a shelter or you' + "'" + 'll freeze to death!"><img id="effect_rain" src="https://raw.githubusercontent.com/Sv443/code/master/resources/images/rain_16x16.png" width="32px" height="32px"></img></abbr>';document.getElementById("appendeffect").appendChild(effect_rain);
				}
				break;
		}
	}
}

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

			if(minutes == time_starving && seconds == 00){timedevent("starving");}
			if(minutes == time_died_of_hunger && seconds == 00){timedevent("died_of_hunger");}
			if(minutes == time_raining && seconds == 00){timedevent("raining");}
		}
    }, 1000);
}

console.log("initialized TAG_timer.js");
modulecount += 1;