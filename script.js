
/* ==========================================================
   GABE FITNESS APP – v2 (Dark default, theme toggle, Spanish splash)
   ========================================================== */

// ---------- Versioned Reset (fresh data for v2) ----------
(function ensureV2FreshStart(){
  try {
    if (localStorage.getItem("gf_version") !== "v2") {
      const theme = localStorage.getItem("gf_theme") || "dark";
      localStorage.clear();
      localStorage.setItem("gf_version", "v2");
      localStorage.setItem("gf_theme", theme);
    }
  } catch (e) { /* ignore */ }
})();

// ---------- Theme (dark by default + toggle) ----------
(function initTheme(){
  const saved = localStorage.getItem("gf_theme") || "dark";
  const body = document.body;
  body.classList.remove("light","dark");
  body.classList.add(saved);
  const btn = document.getElementById("themeToggle");
  if (btn) btn.textContent = saved === "dark" ? "🌙" : "☀️";
})();

document.addEventListener("click", function(e){
  if (e.target && e.target.id === "themeToggle") {
    const body = document.body;
    const next = body.classList.contains("dark") ? "light" : "dark";
    body.classList.remove("light","dark");
    body.classList.add(next);
    localStorage.setItem("gf_theme", next);
    e.target.textContent = next === "dark" ? "🌙" : "☀️";
  }
});

// ---------- Global Dates & Phase ----------
const startDate = new Date("2025-11-03"); // Monday Week 1
const today = new Date();
const msPerWeek = 7 * 24 * 60 * 60 * 1000;
const weekNum = Math.floor((today - startDate) / msPerWeek) + 1;

function getPhase() {
  if (weekNum <= 4) return "Foundation Phase";
  if (weekNum <= 8) return "Build Phase";
  return "Definition Phase";
}

// ---------- Faith Quotes (English) ----------
const quotes = [
  "“I can do all things through Christ who strengthens me.” – Philippians 4:13",
  "“YHWH is my strength and my shield.” – Psalm 28:7",
  "“Run with endurance the race set before you.” – Hebrews 12:1",
  "“The joy of YHWH is your strength.” – Nehemiah 8:10",
  "“Be strong and courageous; YHWH is with you.” – Joshua 1:9"
];

// ---------- Weekday mapping ----------
const weekdayPlans = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday" };

// ---------- Workout Library (12 Weeks) ----------
const workouts = {
  foundation: {
    monday: {
      warmup: [
        "Incline Treadmill Walk – Full Body – Posture upright, light pace – 5 min",
        "Mobility Series – Shoulders / Hips – Slow controlled circles – 5 min"
      ],
      main: [
        "Dumbbell Squat – Legs / Glutes – Chest up, drive through heels – 3×15 reps",
        "Dumbbell Chest Press – Chest / Triceps – Lower slowly, elbows 45° – 3×12–15 reps",
        "Cable Row – Back / Biceps – Pull to lower ribs, squeeze shoulder blades – 3×12 reps",
        "Reverse Lunge – Legs / Glutes – Step back, torso upright – 3×12 each leg",
        "Plank Hold – Core – Straight line shoulders-to-ankles – 3×45 sec"
      ],
      cooldown: [
        "Walk Cool-Down – Cardio – Easy breathing – 3 min",
        "Hip & Back Stretch – Flexibility – 30 sec per move × 5"
      ]
    },
    tuesday: {
      warmup: ["Elliptical Ride – Cardio – Easy pace – 6 min"],
      main: [
        "Run/Walk Intervals – Cardio – 1 min run / 1 min walk × 10 rounds",
        "Stationary Bike – Cardio – Moderate pace – 15 min"
      ],
      cooldown: ["Full Body Stretch – Mobility – 7 min"]
    },
    wednesday: {
      warmup: ["Dynamic Mobility – Full Body – Controlled movements – 8 min"],
      main: [
        "Dumbbell Deadlift – Back / Hamstrings – Flat back, hinge hips – 3×12 reps",
        "Cable Chest Fly – Chest – Slight bend arms, control – 3×15 reps",
        "Step-Up DB – Legs / Glutes – Drive through heel – 3×12 per leg",
        "Face Pull – Rear Delts / Traps – Pull to forehead, squeeze – 3×15 reps",
        "Kettlebell Swing – Glutes / Hamstrings – Power from hips – 3×20 reps"
      ],
      cooldown: ["Treadmill Walk – Recovery – 5 min + Stretch – 3 min"]
    },
    thursday: {
      warmup: ["Bike + Joint Mobility – Warm-up – Loosen hips & shoulders – 6 min"],
      main: [
        "Cable Chest Press – Chest / Triceps – Control return – 3×12 reps",
        "Dumbbell Row – Back / Biceps – Neutral spine – 3×12 each arm",
        "Walking Lunge – Legs / Glutes – Long stride, balance up – 3×10 each leg",
        "Mountain Climbers – Core / Cardio – Steady rhythm – 4×30 sec",
        "Cable Curl – Biceps – Elbows fixed at sides – 3×12 reps",
        "Triceps Pressdown – Triceps – Control tempo – 3×12 reps"
      ],
      cooldown: ["Foam Roll + Stretch – Recovery – 8 min"]
    },
    friday: {
      warmup: ["Treadmill Warm-up – Cardio – 5 min"],
      main: [
        "Sprint Intervals – Cardio – 20 s sprint / 40 s walk × 10",
        "Elliptical Ride – Cardio – Moderate pace – 10 min",
        "Core Circuit – Core – Plank 45 s → Crunch 15 → Leg Raises 12 × 3 rounds"
      ],
      cooldown: ["Yoga Flow – Mobility – 8 min"]
    }
  },

  build: {
    monday: {
      warmup: ["Treadmill Jog – Full Body – Light jog – 8 min"],
      main: [
        "Front Squat (DB) – Legs / Core – Elbows up, neutral spine – 4×10 reps",
        "Cable Row – Back / Biceps – Elbows close – 4×10 reps",
        "Incline DB Press – Chest / Shoulders – 30–45° bench – 3×10–12 reps",
        "Face Pull – Rear Delts / Traps – Control movement – 3×15 reps",
        "Plank Hold – Core – Controlled breathing – 3×60 sec"
      ],
      cooldown: ["Stretch – Flexibility – 8 min"]
    },
    tuesday: {
      warmup: ["Elliptical Warm-up – Cardio – 8 min"],
      main: [
        "Fast Run/Walk Intervals – Cardio – 75 s run / 45 s walk × 10",
        "Stationary Bike – Cardio – Endurance pace – 20 min"
      ],
      cooldown: ["Mobility Routine – 5 min"]
    },
    wednesday: {
      warmup: ["Active Mobility – Full Body – 8 min"],
      main: [
        "Dumbbell Deadlift – Back / Hamstrings – Engage core – 4×8–10 reps",
        "Push Press (DB) – Shoulders / Triceps – Use leg drive – 3×10 reps",
        "Bulgarian Split Squat – Legs / Glutes – Front knee aligned – 3×10 each leg",
        "Cable Fly – Chest – Slight bend arms – 3×12 reps",
        "Kettlebell Swing – Glutes / Hamstrings – Explosive hips – 3×20 reps"
      ],
      cooldown: ["Stretch – Flexibility – 8 min"]
    },
    thursday: {
      warmup: ["Bike Warm-up – 5 min + Mobility – 3 min"],
      main: [
        "Circuit × 4 rounds: Cable Press (12) → DB Row (12/side) → Lunge (10/leg) → Bike 45 s → Curl (12) → Triceps Pressdown (12)"
      ],
      cooldown: ["Foam Roll – Recovery – 8 min"]
    },
    friday: {
      warmup: ["Treadmill Warm-up – 5 min"],
      main: [
        "Sprint 30 s / Walk 30 s × 12",
        "Elliptical Ride – Cardio – 8 min",
        "Core Tri-Set – Hanging Knee Raise 12 → Pallof Press 12/side → Plank 60 s × 3"
      ],
      cooldown: ["Yoga Stretch – 10 min"]
    }
  },

  definition: {
    monday: {
      warmup: ["Mobility Drill – Full Body – 8 min"],
      main: [
        "DB Squat – Legs / Glutes – Controlled descent – 3×12 reps",
        "Cable Row – Back / Biceps – Smooth motion – 3×12 reps",
        "DB Press – Chest / Shoulders – Keep shoulders down – 3×12 reps",
        "Face Pull – Shoulders / Upper Back – Control both directions – 3×15 reps",
        "Wood Chop – Core / Obliques – Rotate through torso – 3×20 reps",
        "Plank Hold – Core – Tight abs + neutral spine – 3×45 sec"
      ],
      cooldown: ["Stretch Session – 8 min"]
    },
    tuesday: {
      warmup: ["Treadmill Walk + Mobility – 8 min"],
      main: [
        "Run/Walk Intervals – Cardio – 2 min run / 1 min walk × 10",
        "Bike Ride – Cardio – 10 min steady pace"
      ],
      cooldown: ["Mobility Flow – 8 min"]
    },
    wednesday: {
      warmup: ["Dynamic Mobility – Full Body – 8 min"],
      main: [
        "DB Deadlift – Back / Hamstrings – Controlled lift – 4×8 reps",
        "Push Press (DB) – Shoulders / Arms – Power up fast – 3×10 reps",
        "Step-Up with Knee Lift – Legs / Core – Balance at top – 3×12 each leg",
        "Kettlebell Swing – Glutes / Hamstrings – Drive through hips – 3×20 reps",
        "Jump Lunge – Legs / Cardio – Soft landing – 3×12 each leg"
      ],
      cooldown: ["Stretch – 8 min"]
    },
    thursday: {
      warmup: ["Bike + Mobility – 5 min"],
      main: [
        "AMRAP 20 min: Cable Press 12 → Row 12/side → Lunge 10/leg → Mountain Climbers 40 s → Pressdown 12"
      ],
      cooldown: ["Foam Roll + Stretch – 10 min"]
    },
    friday: {
      warmup: ["Treadmill Walk – 5 min"],
      main: [
        "Sprint 20 s / Walk 40 s × 14",
        "Elliptical Ride – 6 min recovery",
        "Stretch Flow – 10 min"
      ],
      cooldown: ["Deep Breathing + Mindful Rest – 3 min"]
    }
  }
};

// ---------- Overlay Handling & Rendering ----------
function startWorkout() {
  toggleTimer(true);
  toggleSpotify();
  openWorkout();
}

function openWorkout() {
  const overlay = document.getElementById("workout-overlay");
  const dayEl = document.getElementById("workout-day");
  const dateEl = document.getElementById("workout-date");
  const phaseEl = document.getElementById("workout-phase");
  const list = document.getElementById("workout-list");
  overlay.classList.remove("hidden");

  const dayNum = today.getDay();
  const dayName = weekdayPlans[dayNum] || "Rest";
  const formatted = today.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  dayEl.textContent = dayName.toUpperCase();
  phaseEl.textContent = getPhase();
  dateEl.textContent = formatted;

  const phaseKey = weekNum <= 4 ? "foundation" : weekNum <= 8 ? "build" : "definition";
  const dayKey = dayName.toLowerCase();

  list.innerHTML = "";
  const todayPlan = workouts[phaseKey][dayKey];
  if (!todayPlan) {
    list.innerHTML = "<p>Rest day 🙏</p>";
    return;
  }

  appendExerciseGroup("🔥 Warm-Up", todayPlan.warmup, list);
  appendExerciseGroup("💪 Main Workout", todayPlan.main, list);
  appendExerciseGroup("🧘 Cool-Down", todayPlan.cooldown, list);
}

// Render list sections with muscle group + form + reps/time
function appendExerciseGroup(title, arr, container) {
  const section = document.createElement("div");
  const h4 = document.createElement("h4");
  h4.textContent = title;
  h4.style.marginBottom = "0.5rem";
  section.appendChild(h4);

  arr.forEach((ex) => {
    // Format: Name – Group – Description – Reps/Time
    const parts = ex.split(" – ");
    const name = parts[0]?.trim() || "";
    const the_group = parts[1]?.trim() || "";
    const desc = parts[2]?.trim() || "";
    const reps = parts[3]?.trim() || "";

    const div = document.createElement("div");
    div.className = "exercise";

    const nameEl = document.createElement("p");
    nameEl.textContent = `• ${name}${the_group ? ` (${the_group})` : ""}`;
    nameEl.style.fontWeight = "600";
    nameEl.style.marginBottom = "0.25rem";

    if (desc) {
      const descEl = document.createElement("p");
      descEl.textContent = desc;
      descEl.style.fontSize = "0.9rem";
      descEl.style.color = "#cfd6e6";
      div.appendChild(nameEl);
      div.appendChild(descEl);
    } else {
      div.appendChild(nameEl);
    }

    if (reps) {
      const repsEl = document.createElement("p");
      repsEl.textContent = reps;
      repsEl.style.fontSize = "0.9rem";
      repsEl.style.color = "#eaa92e";
      repsEl.style.fontWeight = "bold";
      div.appendChild(repsEl);
    }

    div.addEventListener("click", () => toggleExercise(div));
    section.appendChild(div);
  });

  container.appendChild(section);
}

function toggleExercise(el) {
  el.classList.toggle("completed");
  updateWorkoutProgress();
}

function updateWorkoutProgress() {
  const exercises = document.querySelectorAll(".exercise");
  const done = document.querySelectorAll(".exercise.completed").length;
  const percent = Math.round((done / exercises.length) * 100);
  const bar = document.getElementById("workout-progress-bar");
  bar.style.width = `${percent}%`;
  if (percent === 100) celebrateWorkout();
}

function closeWorkout() {
  document.getElementById("workout-overlay").classList.add("hidden");
}

// ---------- TIMER ----------
let timerInterval = null;
let totalSeconds = 0;

function toggleTimer(forceStart = false) {
  const timerDisplay = document.getElementById("timer");
  const btn = document.getElementById("timerBtn");

  if (timerInterval && !forceStart) {
    clearInterval(timerInterval);
    timerInterval = null;
    btn.textContent = "▶️ Start";
  } else {
    timerInterval = setInterval(() => {
      totalSeconds++;
      const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
      const s = String(totalSeconds % 60).padStart(2, "0");
      timerDisplay.textContent = `${m}:${s}`;
    }, 1000);
    btn.textContent = "⏹ Stop";
  }
}

// ---------- SPOTIFY ----------
function toggleSpotify() {
  document.getElementById("spotify-player").classList.toggle("hidden");
}
function openSpotify() {
  window.open("https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh", "_blank");
}

// ---------- HYDRATION ----------
let cups = 0;
const hydrationDisplay = document.getElementById("hydration");
const progressBar = document.getElementById("progress-bar");
let streak = 0;
let bestStreak = 0;

function getGradientColor(percent) {
  const red = percent < 50 ? 255 : Math.round(255 - (percent - 50) * 5.1);
  const green = percent < 50 ? Math.round(percent * 5.1) : 255;
  return `rgb(${red},${green},0)`;
}
function updateHydrationDisplay() {
  hydrationDisplay.innerText = `${cups} / 8 cups`;
  const percent = (cups / 8) * 100;
  progressBar.style.width = `${percent}%`;
  progressBar.style.backgroundColor = getGradientColor(percent);
}
function updateStreakDisplay() {
  document.getElementById("streak").innerText = `🔥 Current Streak: ${streak} days`;
  document.getElementById("best-streak").innerText = `🏅 Best Streak: ${bestStreak} days`;
}
function loadHydration() {
  const t = new Date().toDateString();
  const saved = JSON.parse(localStorage.getItem("hydrationData") || "null");
  if (saved && saved.date === t) {
    cups = saved.cups || 0;
    streak = saved.streak || 0;
    bestStreak = saved.bestStreak || 0;
  } else {
    if (saved && saved.cups >= 8) {
      streak = (saved.streak || 0) + 1;
    } else {
      streak = 0;
    }
    bestStreak = Math.max(saved ? (saved.bestStreak || 0) : 0, streak);
    cups = 0;
  }
  updateHydrationDisplay();
  localStorage.setItem("hydrationData", JSON.stringify({ date: t, cups, streak, bestStreak }));
  updateStreakDisplay();
}
function addCup() {
  if (cups < 8) {
    cups++;
    updateHydrationDisplay();
    localStorage.setItem("hydrationData", JSON.stringify({
      date: new Date().toDateString(), cups, streak, bestStreak
    }));
    if (cups === 8) celebrateHydration();
  }
}

// ---------- MEALS & DASHBOARD ----------
function logMeal() {
  const meal = prompt("🍎 What did you eat?");
  if (!meal) return;
  const list = JSON.parse(localStorage.getItem("meals") || "[]");
  list.push({ meal, time: new Date().toLocaleTimeString() });
  localStorage.setItem("meals", JSON.stringify(list));
  alert(`✅ Meal logged: ${meal}`);
}
function showDashboard() {
  const meals = JSON.parse(localStorage.getItem("meals") || "[]");
  const data = JSON.parse(localStorage.getItem("hydrationData") || "{}");
  alert(`📊 Daily Summary\n\n💧 Cups: ${data.cups || 0}/8\n🍽 Meals: ${meals.length}\n🔥 Streak: ${data.streak || 0} days`);
}
function scrollToHydration() {
  document.querySelector(".card:nth-of-type(2)").scrollIntoView({ behavior: "smooth" });
}

// ---------- CELEBRATIONS (Confetti + Chime) ----------
function celebrateHydration() {
  playChime();
  runConfetti();
  showTemporaryMessage("🎉 ¡Meta de hidratación alcanzada!");
}
function celebrateWorkout() {
  playChime();
  runConfetti();
  const msg = document.getElementById("congrats-msg");
  const quoteBox = document.getElementById("quote-box");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const mins = Math.floor(totalSeconds / 60);
  msg.classList.add("show");
  quoteBox.textContent = `⏱ Workout complete in ${mins} minutes.\n${randomQuote}`;
  quoteBox.classList.remove("hidden");
  localStorage.setItem("lastWorkout", new Date().toDateString());
  setTimeout(() => msg.classList.remove("show"), 3000);
}
function playChime() {
  const audio = new Audio("https://cdn.pixabay.com/download/audio/2023/02/28/audio_46d3b4a19f.mp3?filename=success-1-6297.mp3");
  audio.play();
}
function runConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  const confetti = [];
  const colors = ["#eaa92e", "#22266a", "#f5f6f7"];

  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resizeCanvas();

  for (let i = 0; i < 130; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 0.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  let animationFrame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
    update();
    animationFrame = requestAnimationFrame(draw);
  }
  function update() {
    confetti.forEach((c) => {
      c.y += c.d * 5;
      if (c.y > canvas.height) c.y = -10;
    });
  }
  window.addEventListener("resize", resizeCanvas);
  draw();
  setTimeout(() => cancelAnimationFrame(animationFrame), 4000);
}
function showTemporaryMessage(text) {
  const msg = document.getElementById("congrats-msg");
  msg.textContent = text;
  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 3000);
}

// ---------- INIT ----------
window.onload = () => {
  loadHydration();
  updateWorkoutProgress();
  console.log("✅ Gabe Fitness v2 loaded (dark default)");
};
