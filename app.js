// Load previous count and completed round from browser memory
const previousCount = localStorage.getItem("count");
const previousCompletedRound = localStorage.getItem("completedRound");
let count = previousCount ? parseInt(previousCount) : 0;
let completedRound = previousCount ? parseInt(previousCompletedRound) : 0;

// setting elements variable
const counterContainer = document.querySelector("#counter-container");
const counterDisplay = document.querySelector("#counter-display");
const completedRoundText = document.querySelector("#completed-round");
const resetCountBtn = document.querySelector("#reset-count");
const resetRoundBtn = document.querySelector("#reset-round");
const resetAllBtn = document.querySelector("#reset-all");

//   Update the counter display
function updateCounter() {
  counterDisplay.textContent = count;
}

// Update the completed round display
function updateCompletedRound() {
  completedRoundText.textContent = completedRound;
}

// Voice selection functionality
const voices = [
  { name: "Srila Provapad", src: "assets/sounds/provupad.mp3" },
  { name: "Girl", src: "assets/sounds/girl.wav" },
];

const voiceSelect = document.querySelector("#voice");

voices.forEach(function (voice) {
  const option = document.createElement("option");
  option.value = voice.src;
  option.textContent = voice.name;
  voiceSelect.appendChild(option);
});

// Speed selection functionality
const speeds = [
  { label: "1.00", value: 1 },
  { label: "1.25", value: 1.25 },
  { label: "1.40", value: 1.4 },
  { label: "1.50", value: 1.5 },
  { label: "1.70", value: 1.7 },
];

const speedSelect = document.querySelector("#speed");
let playbackRate = speeds[2].value;

speeds.forEach(function (speed) {
  const option = document.createElement("option");
  option.value = speed.value;
  option.textContent = speed.label;
  speedSelect.appendChild(option);
});

speedSelect.value = playbackRate;

speedSelect.addEventListener("change", function () {
  playbackRate = parseFloat(speedSelect.value);
});

// Notification selection functionality
const notifications = [
  { label: "On", value: true },
  { label: "Off", value: false },
];

const notificationForm = document.querySelector("#notification");
let notificationsEnabled = true;

notifications.forEach(function (notification, index) {
  const input = document.createElement("input");
  input.type = "radio";
  input.name = "notification";
  input.id = notification.label.toLowerCase();
  input.value = notification.value;
  input.checked = index === 0;
  input.addEventListener("change", function () {
    notificationsEnabled = this.checked && this.value === "true";
  });

  const label = document.createElement("label");
  label.htmlFor = input.id;
  label.textContent = notification.label;

  notificationForm.appendChild(input);
  notificationForm.appendChild(label);
});

function playVoice() {
  const voice = new Audio(voiceSelect.value);
  voice.playbackRate = playbackRate;
  voice.play();
}

function playNotification() {
  if (notificationsEnabled) {
    const notificationSound = new Audio("assets/sounds/notification.mp3");
    notificationSound.play();
  }
}

// Increament Functionality
function incrementCounter() {
  count++;
  updateCounter();

  //   Auto Scroll
  counterContainer.scrollIntoView();

  // Chant voice
  playVoice();

  // Completed Round Notification and Update after 108 count
  if (count === 108) {
    completedRound++;
    count = 0;
    updateCompletedRound();
    updateCounter();

    // Notification Sound
    playNotification();
  }

  // Save count and Completed round to the browser memory
  localStorage.setItem("count", count);
  localStorage.setItem("completedRound", completedRound);
}

// Keyboard and click to increment count functionallity
// Handle keyup event to count up
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    incrementCounter();
  }
});
// Handle click event to count up
counterContainer.addEventListener("click", incrementCounter);

// Handle button click event to reset count
// Reset Count
function resetCount() {
  count = 0;
  localStorage.setItem("count", count);
  updateCounter();
}
resetCountBtn.addEventListener("click", resetCount);

// Reset Round
function resetRound() {
  completedRound = 0;
  localStorage.setItem("completedRound", completedRound);
  updateCompletedRound();
}
resetRoundBtn.addEventListener("click", resetRound);

// Reset All
resetAllBtn.addEventListener("click", function () {
  resetCount();
  resetRound();
});

// Initialize the counter and completed round display
updateCounter();
updateCompletedRound();
