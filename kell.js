/*jshint esversion:6*/
let clockContainer;
let changeColorButton;
let dayContainer;

window.onload = function (){
  init();
  changeColorButton = document.querySelector('#change-color');
};

function init (){
  startClock();
  initLocalClocks();
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

function must() {
  document.body.style.backgroundImage = "url('Must.png')";
  document.body.style.backgroundColor = "black"
  document.getElementById("dayContainer").style.color = "white";
  document.getElementById("dayContainer").style.backgroundColor = "black";
  document.getElementById("clockContainer").style.color = "white";
  document.getElementById("clockContainer").style.backgroundColor = "black";
}

function valge() {
  document.body.style.backgroundImage = "url('Valge.png')";
  document.body.style.backgroundColor = "white";
  document.getElementById("dayContainer").style.color = "black";
  document.getElementById("dayContainer").style.backgroundColor = "white";
  document.getElementById("clockContainer").style.color = "black";
  document.getElementById("clockContainer").style.backgroundColor = "white";
}

function changeToAnalog(){
  document.getElementById("clockContainer").style.display = 'none';
  document.getElementById("analoog").style.display = 'initial';
}

function changeToDigital(){
  document.getElementById("analoog").style.display = 'none';
  document.getElementById("clockContainer").style.display = 'initial';
}

//SIIT HAKKAB ANALOOG!!!

function initLocalClocks() {
  // Get the local time using JS
  const date = new Date();
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();

  // Create an object with each hand and it's angle in degrees
  var hands = [
    {
      hand: 'hours',
      angle: (hours * 30) + (minutes / 2)
    },
    {
      hand: 'minutes',
      angle: (minutes * 6)
    },
    {
      hand: 'seconds',
      angle: (seconds * 6)
    }
  ];
  // Loop through each of these hands to set their angle
  for (var j = 0; j < hands.length; j++) {
    var elements = document.querySelectorAll('.' + hands[j].hand);
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
        elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
        // If this is a minute hand, note the seconds position (to calculate minute position later)
        if (hands[j].hand === 'minutes') {
          elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
        }
    }
  }
}

/*
 * Set a timeout for the first minute hand movement (less than 1 minute), then rotate it every minute after that
 */
function setUpMinuteHands() {
  // Find out how far into the minute we are
  var containers = document.querySelectorAll('.minutes-container');
  var secondAngle = containers[0].getAttribute("data-second-angle");
  if (secondAngle > 0) {
    // Set a timeout until the end of the current minute, to move the hand
    var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
    setTimeout(function() {
      moveMinuteHands(containers);
    }, delay);
  }
}

/*
 * Do the first minute's rotation
 */
function moveMinuteHands(containers) {
  for (var i = 0; i < containers.length; i++) {
    containers[i].style.webkitTransform = 'rotateZ(6deg)';
    containers[i].style.transform = 'rotateZ(6deg)';
  }
  // Then continue with a 60 second interval
  setInterval(function() {
    for (var i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 12;
      } else {
        containers[i].angle += 6;
      }
      containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
      containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
    }
  }, 60000);
}

/*
 * Move the second containers
 */
function moveSecondHands() {
  var containers = document.querySelectorAll('.seconds-container');
  setInterval(function() {
    for (var i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 6;
      } else {
        containers[i].angle += 6;
      }
      containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
      containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
    }
  }, 1000);
}
