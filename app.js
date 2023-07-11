// Load previous count and completed round from browser memory
const previousCount = localStorage.getItem("count");
const previousCompletedRound = localStorage.getItem("completedRound");
let count = previousCount ? parseInt(previousCount) : 0;
let completedRound = previousCount ? parseInt(previousCompletedRound) : 0;

// setting elements
const counterContainer = document.querySelector("#counter-container");
const counterDisplay = document.querySelector("#counter-display");
const completedRoundText = document.querySelector("#completed-round");

//   Update the counter display
function updateCounter() {
  counterDisplay.textContent = count;
}

// Update the completed round display
function updateCompletedRound() {
  completedRoundText.textContent = completedRound;
}

// Increament Functionality
function incrementCounter() {
  count++;
  updateCounter();

  //   Auto Scroll
  counterContainer.scrollIntoView();

  // Chant voice
  const voice = new Audio("assets/sounds/chant.mp3");
  voice.playbackRate = 1.4;
  voice.play();

  // Completed Round Notification and Update after 108 count
  if (count === 108) {
    completedRound++;
    count = 0;
    updateCompletedRound();
    updateCounter();

    // Notification Sound
    const notification = new Audio("assets/sounds/notification.mp3");
    notification.play();
  }

  // Save count and Completed round to the browser memory
  localStorage.setItem("count", count);
  localStorage.setItem("completedRound", completedRound);
}

// Keyboard and touch functionallity
// Handle keyup event to count up
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    incrementCounter();
  }
});
// Handle touch event to count up
counterContainer.addEventListener("click", incrementCounter);

// Initialize the counter and completed round display
updateCounter();
updateCompletedRound();
