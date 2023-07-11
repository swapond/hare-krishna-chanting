// Load previous count and completed mala from browser memory
const previousCount = localStorage.getItem("chantCount");
const previousMala = localStorage.getItem("completedMala");
let count = previousCount ? parseInt(previousCount) : 0;
let malaCount = previousMala ? parseInt(previousMala) : 0;

// Update the counter display
function updateCounter() {
  document.getElementById("counter").textContent = count;
}

// Update the completed mala display
function updateCompletedMala() {
  document.getElementById(
    "completedMala"
  ).textContent = `Completed Mala: ${malaCount}`;
}

// Handle keyup event to count up
document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowUp") {
    const audio = new Audio("chant.mp3");
    audio.playbackRate = 1.4;
    audio.play();

    count++;
    updateCounter();

    // Play sound and reset count after 108 chants
    if (count === 108) {
      new Audio("notification.mp3").play();
      count = 0;
      malaCount++;
      updateCounter();
      updateCompletedMala();
    }

    // Save count and completed mala to browser memory
    localStorage.setItem("chantCount", count);
    localStorage.setItem("completedMala", malaCount);
  }
});

// Handle button click event to reset completed mala
document.getElementById("resetButton").addEventListener("click", function () {
  malaCount = 0;
  count = 0;
  updateCompletedMala();
  updateCounter();
  localStorage.setItem("completedMala", malaCount);
  localStorage.setItem("chantCount", count);
});

document.getElementById("resetBtn").addEventListener("click", function () {
  count = 0;
  updateCounter();
  localStorage.setItem("chantCount", count);
});
// Initialize the counter and completed mala displays
updateCounter();
updateCompletedMala();
