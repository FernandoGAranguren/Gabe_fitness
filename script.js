/* ==========================================================
   GABE FITNESS v3.2 — FULL HYBRID PLAN + COACH
   ========================================================== */

// ----- Theme -----
(function initTheme() {
  const saved = localStorage.getItem("gf_theme") || "dark";
  document.body.classList.add(saved);
  const btn = document.getElementById("themeToggle");
  if (btn) btn.textContent = saved === "dark" ? "🌙" : "☀️";
})();
document.addEventListener("click", (e) => {
  if (e.target.id === "themeToggle") {
    const next = document.body.classList.contains("dark") ? "light" : "dark";
    document.body.classList.remove("dark", "light");
    document.body.classList.add(next);
    localStorage.setItem("gf_theme", next);
    e.target.textContent = next === "dark" ? "🌙" : "☀️";
  }
});

// ----- Dates -----
const startDate = new Date("2025-11-03");
const today = new Date();
const weekNum = Math.floor((today - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;
function getPhase() {
  return weekNum <= 4 ? "Foundation" : weekNum <= 8 ? "Build" : "Definition";
}

// ----- Quotes -----
const quotes = [
  "“YHWH es mi fortaleza y mi escudo.” — Salmo 28:7",
  "“Todo lo puedo en Cristo que me fortalece.” — Filipenses 4:13",
  "“Sé fuerte y valiente; YHWH está contigo.” — Josué 1:9",
];

// ----- Plan -----
const workouts = {
  foundation: {
    monday: {
      warmup: ["Treadmill 5min – Light pace", "Mobility 5min – Hips/Shoulders"],
      main: [
        "Goblet Squat – Legs – 3×12 reps – add 10–20 lb",
        "DB Bench Press – Chest – 3×12 reps – add 5–10 lb",
        "Cable Row – Back – 3×12 reps – steady form",
        "RDL – Hamstrings – 3×12 reps – add 10 lb",
        "Plank – Core – 3×30 s",
      ],
      cooldown: ["Walk 5min", "Stretch 5min"],
    },
    tuesday: {
      warmup: ["Elliptical 6min – steady"],
      main: [
        "Intervals – 20min alternating jog/walk",
        "Bike – 10min moderate",
        "Dead Bug – 3×12",
        "Side Plank – 3×20 s each",
      ],
      cooldown: ["Stretch – 8min"],
    },
    wednesday: {
      warmup: ["Bike 5min", "Hip Mobility 5min"],
      main: [
        "DB Back Squat – Legs – 3×12 – +10 lb",
        "Reverse Lunge – 3×10 each – +5 lb",
        "Glute Bridge – 3×15",
        "Calf Raise – 3×15",
      ],
      cooldown: ["Walk 5min", "Stretch 8min"],
    },
    thursday: {
      warmup: ["Elliptical 6min"],
      main: [
        "Circuit ×3 rounds – 25min total",
        "DB Squat-Press – 12 reps – +5 lb",
        "Cable Row – 12 reps",
        "Step-Up – 10 each",
        "Push-Up – 12 reps",
        "Mountain Climbers – 30 s",
      ],
      cooldown: ["Bike 5min", "Stretch 8min"],
    },
    friday: {
      warmup: ["Shoulder Mobility 5min", "Light Row 5min"],
      main: [
        "Incline DB Press – 3×12 – +5 lb",
        "One-Arm Row – 3×12 each – +5 lb",
        "Lat Pulldown – 3×12",
        "Biceps Curl – 3×12",
        "Triceps Pressdown – 3×12",
        "Plank + Tap – 3×20 taps",
      ],
      cooldown: ["Stretch 8min", "Breathing 3min"],
    },
  },
};

// ----- Workout overlay -----
function startWorkout() {
  openWorkout();
}
function openWorkout() {
  const overlay = document.getElementById("workout-overlay");
  const list = document.getElementById("workout-list");
  overlay.classList.remove("hidden");
  overlay.style.display = "flex";
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const todayName = dayNames[today.getDay()];
  const plan = workouts.foundation[todayName];
  list.innerHTML = "";
  if (!plan) {
    list.innerHTML = "<p>Rest day 🙏</p>";
    return;
  }
  appendGroup("🔥 Warm-Up", plan.warmup, list);
  appendGroup("💪 Main Workout", plan.main, list);
  appendGroup("🧘 Cool-Down", plan.cooldown, list);
  document.getElementById("quote-box").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote-box").classList.remove("hidden");
}
function appendGroup(title, arr, container) {
  const sec = document.createElement("div");
  const h = document.createElement("h4");
  h.textContent = title;
  sec.appendChild(h);
  arr.forEach((txt) => {
    const div = document.createElement("div");
    div.className = "exercise";
    div.textContent = "• " + txt;
    div.addEventListener("click", () => toggleExercise(div));
    sec.appendChild(div);
  });
  container.appendChild(sec);
}
function toggleExercise(el) {
  el.classList.toggle("completed");
  const done = document.querySelectorAll(".exercise.completed").length;
  const total = document.querySelectorAll(".exercise").length;
  document.getElementById("workout-progress-bar").style.width = `${
    (done / total) * 100
  }%`;
  if (done === total) celebrateWorkout();
}
function closeWorkout() {
  document.getElementById("workout-overlay").classList.add("hidden");
}

// ----- Hydration -----
let hydration = JSON.parse(localStorage.getItem("hydrationData") || "{}");
function addCup() {
  const key = new Date().toDateString();
  if (hydration.date !== key) {
    hydration = {
      date: key,
      cups: 0,
      streak: hydration.streak || 0,
      best: hydration.best || 0,
    };
  }
  hydration.cups++;
  if (hydration.cups > 8) hydration.cups = 8;
  if (hydration.cups === 8) playChime();
  updateHydration();
  localStorage.setItem("hydrationData", JSON.stringify(hydration));
}
function updateHydration() {
  document.getElementById("hydration").textContent = `${
    hydration.cups || 0
  } / 8 cups`;
  document.getElementById("progress-bar").style.width = `${
    (hydration.cups / 8) * 100
  }%`;
  document.getElementById("streak").textContent = `🔥 Current Streak: ${
    hydration.streak || 0
  } days`;
  document.getElementById("best-streak").textContent = `🏅 Best Streak: ${
    hydration.best || 0
  } days`;
}
(function dailyReset() {
  const key = new Date().toDateString();
  if (hydration.date !== key) {
    if (hydration.cups >= 8) hydration.streak = (hydration.streak || 0) + 1;
    else hydration.streak = 0;
    hydration.best = Math.max(hydration.best || 0, hydration.streak);
    hydration = {
      date: key,
      cups: 0,
      streak: hydration.streak,
      best: hydration.best,
    };
    localStorage.setItem("hydrationData", JSON.stringify(hydration));
  }
  updateHydration();
})();

// ----- Timer -----
let tInt,
  sec = 0,
  run = false;
function toggleTimer() {
  const btn = document.getElementById("timerBtn"),
    t = document.getElementById("timer");
  if (!run) {
    run = true;
    btn.textContent = "⏸ Pause";
    tInt = setInterval(() => {
      sec++;
      t.textContent = `${String(Math.floor(sec / 60)).padStart(
        2,
        "0"
      )}:${String(sec % 60).padStart(2, "0")}`;
    }, 1000);
  } else {
    run = false;
    btn.textContent = "▶️ Start";
    clearInterval(tInt);
  }
}

// ----- Spotify -----
function toggleSpotify() {
  document.getElementById("spotify-player").classList.toggle("hidden");
}
function openSpotify() {
  window.open(
    "https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh",
    "_blank"
  );
}
function playChime() {
  new Audio(
    "https://assets.mixkit.co/sfx/download/mixkit-completion-bell-591.wav"
  ).play();
}

// ----- Celebrate -----
function celebrateWorkout() {
  playChime();
  const msg = document.getElementById("congrats-msg");
  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 3000);
}

// ----- Coach -----
function getStats() {
  return JSON.parse(localStorage.getItem("stats") || "{}");
}
function showCoach() {
  const card = document.getElementById("coach-card");
  card.classList.remove("hidden");
  const s = getStats();
  const hyd = hydration.cups || 0;
  const completion = s.completed || 0,
    total = s.opened || 0;
  const pct = total ? Math.round((completion / total) * 100) : 0;
  document.getElementById(
    "coach-week"
  ).textContent = `📅 Week ${weekNum} • ${getPhase()}`;
  document.getElementById("coach-level").textContent = `Mode: ${
    pct > 75 ? "Pushing" : pct > 40 ? "Balanced" : "Rebuilding"
  }`;
  document.getElementById(
    "coach-completion"
  ).textContent = `Completion: ${pct}%`;
  document.getElementById(
    "coach-hydration"
  ).textContent = `Hydration: ${hyd}/8 cups`;
  document.getElementById("coach-message").textContent =
    hyd < 4 ? "Drink more water 💧" : "Great hydration today!";
  document.getElementById("coach-next").textContent =
    "Next: focus on 5 consistent days + 2–5 lb increase in main lifts.";
  document.getElementById("coach-progress-bar").style.width = `${pct}%`;
  card.scrollIntoView({ behavior: "smooth" });
}
