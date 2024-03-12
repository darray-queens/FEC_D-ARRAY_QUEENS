// Assuming startFakeTimer is correctly imported in App.jsx and you have countdown state set up

function startFakeTimer(duration, updateDisplay) {
  let timer = duration, hours, minutes, seconds;
  setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Use the updateDisplay function to update React state
    updateDisplay(hours + " hours " + minutes + " minutes " + seconds + " seconds until SITE WIDE 25% OFF ends");

    if (--timer < 0) {
      timer = duration; // Reset or stop the timer based on your requirement
    }
  }, 1000);
}

export default startFakeTimer;
