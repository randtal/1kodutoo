/*jshint esversion:6*/
let clockContainer;
let changeColorButton;
let dayContainer;

window.onload = function (){
  init();
  changeColorButton = document.querySelector('#change-color');
  changeColorButton.addEventListener('click', changeBackgroundColor);
};

function init (){

  startClock();
}

function startClock(){
  clockContainer = document.querySelector('#clockContainer');
  updateClock();
  window.setInterval(function(){
    updateClock();
  }, 1000);
}

function updateClock(){
  const date = new Date();
  current_time = date.getDate() + ". "+ getMonth() + " " + checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds());
  clockContainer.innerHTML = current_time;
  dayContainer = document.querySelector('#dayContainer');
  day =  getDay();
  dayContainer.innerHTML = day;
}

function checkTime(date){
	if(date.toString().length == 1){
		date = "0" + date;
	}
	return date;
}

function getDay(){
  switch(new Date().getDay()){
    case 0:
      day = "Pühapäev";
      break;
    case 1:
      day = "Esmaspäev";
      break;
    case 2:
      day = "Teisipäev";
      break;
    case 3:
      day = "Kolmapäev";
      break;
    case 4:
      day = "Neljapäev";
      break;
    case 5:
      day = "Reede";
      break;
    case 6:
      day = "Laupäev";
      break;
    }
    return day;
}

function getMonth(){
  switch(new Date().getMonth()){
    case 0:
      day = "Jaanuar";
      break;
    case 1:
      day = "Veebruar";
      break;
    case 2:
      day = "Märts";
      break;
    case 3:
      day = "Aprill";
      break;
    case 4:
      day = "Mai";
      break;
    case 5:
      day = "Juuni";
      break;
    case 6:
      day = "Juuli";
      break;
    case 7:
      day = "August";
      break;
    case 8:
      day = "September";
      break;
    case 9:
      day = "Oktoober";
      break;
    case 10:
      day = "November";
      break;
    case 11:
      day = "Detsember";
      break;
    }
    return day;
}

function chBackcolor(color) {
   document.body.style.background = color;
}
