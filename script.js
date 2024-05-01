let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${millisecondsFormatted}`;
}

function displayTime() {
  const display = document.querySelector('.display');
  display.textContent = formatTime(elapsedTime);
}

function startStop() {
  if (isRunning) {
    clearInterval(timer);
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      displayTime();
    }, 10);
  }
  isRunning = !isRunning;
}

function pauseResume() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  displayTime();
  document.querySelector('.laps').innerHTML = '';
  laps = [];
}

function lap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    laps.push(lapTime);
    const lapsList = document.querySelector('.laps');
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsList.appendChild(li);
  }
}
