// =========== VOICE SYSTEM ===========
const synth = window.speechSynthesis;
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-GB";
  utter.pitch = 1.1;
  utter.rate = 1;
  utter.volume = 1;
  synth.speak(utter);
}

// =========== REST TIMER ===========
let timer;
let secondsLeft = 0;
const timerDisplay = document.getElementById("timerDisplay");
const timerContainer = document.getElementById("timerContainer");

function startRestTimer(duration) {
  clearInterval(timer);
  secondsLeft = duration;
  timerContainer.classList.remove("hidden");
  speak(`Rest for ${duration} seconds, Gabe.`);
  updateTimerDisplay();
  timer = setInterval(() => {
    secondsLeft--;
    updateTimerDisplay();
    if (secondsLeft <= 0) {
      clearInterval(timer);
      speak("Rest time over, let's go!");
      timerContainer.classList.add("hidden");
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerDisplay.textContent = `00:${secondsLeft.toString().padStart(2, "0")}`;
}

document.getElementById("stopTimer").onclick = () => {
  clearInterval(timer);
  timerContainer.classList.add("hidden");
};

// =========== HYDRATION TRACKER ===========
let waterCups = 0;
const waterBar = document.getElementById("waterBar");
const waterText = document.getElementById("waterText");

function updateHydration() {
  waterText.textContent = `${waterCups} / 8 cups`;
  waterBar.style.width = `${(waterCups / 8) * 100}%`;
  if (waterCups >= 8) speak("Hydration goal achieved! Excellent work, Gabe!");
}

document.getElementById("addWater").onclick = () => {
  if (waterCups < 8) {
    waterCups++;
    updateHydration();
    speak(`Good job, Gabe. ${8 - waterCups} cups to go.`);
  } else {
    speak("You're fully hydrated, champ!");
  }
};

// =========== MAIN BUTTONS ===========
document.getElementById("startWorkout").onclick = () => {
  speak("Let's go, Gabe! Starting your workout. Focus and give your best.");
  startRestTimer(45); // example rest timer
};

document.getElementById("logMeal").onclick = () => {
  speak("Meal logged successfully. Keep your nutrition balanced!");
};

document.getElementById("trackHydration").onclick = () => {
  speak("Stay hydrated, Gabe! Keep drinking water throughout your day.");
};

document.getElementById("showProgress").onclick = () => {
  speak("Opening progress dashboard soon. You're making amazing progress!");
};

// =========== HIDDEN DEVELOPER MODE ===========
let tapCount = 0;
document.getElementById("appTitle").addEventListener("click", () => {
  tapCount++;
  setTimeout(() => (tapCount = 0), 1000);
  if (tapCount === 3) {
    const code = prompt("Enter developer code:");
    if (code === "capstone2025") {
      alert("Developer Mode Unlocked! Future settings coming soon.");
      speak("Developer mode activated.");
    }
  }
});
