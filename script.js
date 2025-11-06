/* ==========================================================
   GABE FITNESS APP – v2
   Dark by default, hybrid training, adaptive coach
   ========================================================== */

// ---------- Versioned Reset (fresh data for v2) ----------
(function ensureV2FreshStart() {
  try {
    if (localStorage.getItem("gf_version") !== "v2") {
      const theme = localStorage.getItem("gf_theme") || "dark";
      localStorage.clear();
      localStorage.setItem("gf_version", "v2");
      localStorage.setItem("gf_theme", theme);
    }
  } catch (e) {
    // ignore
  }
})();

// ---------- Theme (dark by default + toggle) ----------
(function initTheme() {
  const saved = localStorage.getItem("gf_theme") || "dark";
  const body = document.body;
  body.classList.remove("light", "dark");
  body.classList.add(saved);
  const btn = document.getElementById("themeToggle");
  if (btn) btn.textContent = saved === "dark" ? "🌙" : "☀️";
})();

document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "themeToggle") {
    const body = document.body;
    const next = body.classList.contains("dark") ? "light" : "dark";
    body.classList.remove("light", "dark");
    body.classList.add(next);
    localStorage.setItem("gf_theme", next);
    e.target.textContent = next === "dark" ? "🌙" : "☀️";
  }
});

// ---------- Global Dates & Phase ----------
const startDate = new Date("2025-11-03"); // Monday Week 1 (adjust if you want)
const today = new Date();
const msPerWeek = 7 * 24 * 60 * 60 * 1000;
let weekNum = Math.floor((today - startDate) / msPerWeek) + 1;
if (weekNum < 1) weekNum = 1;
if (weekNum > 12) weekNum = 12;

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
  "“Be strong and courageous; YHWH is with you.” – Joshua 1:9",
];

// ---------- Weekday mapping ----------
const weekdayPlans = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
};

// ---------- Hybrid Workout Library ----------
const workouts = {
  foundation: {
    // WEEKS 1–4 – Learn form, build base, moderate intensity

    // Mon – Full-Body Strength (Technique + Base)
    monday: {
      warmup: [
        "Treadmill Walk – Full Body – Light pace, upright posture – 5 min",
        "Dynamic Mobility – Hips / Shoulders – Controlled leg swings & arm circles – 5 min",
      ],
      main: [
        "Goblet Squat (DB) – Legs / Glutes – Chest up, sit between heels – 3×12 reps",
        "Dumbbell Bench Press – Chest / Triceps – Elbows at 45°, slow lower – 3×12 reps",
        "Cable Row – Back / Biceps – Pull to lower ribs, squeeze shoulder blades – 3×12 reps",
        "Dumbbell Romanian Deadlift – Hamstrings / Glutes – Hinge at hips, flat back – 3×12 reps",
        "Plank Hold – Core – Straight line shoulders-to-ankles – 3×30 sec",
      ],
      cooldown: [
        "Walking Cool-Down – Cardio – Very easy pace – 3 min",
        "Lower-Body Stretch – Legs / Hips – Hold each 20–30 sec – 5 min",
      ],
    },

    // Tue – Cardio + Core & Mobility
    tuesday: {
      warmup: ["Elliptical – Cardio – Easy effort, focus on breathing – 6 min"],
      main: [
        "Treadmill Intervals – Cardio – 1 min brisk walk / 1 min light jog × 10 rounds",
        "Stationary Bike – Cardio – Comfortable steady pace – 10 min",
        "Dead Bug – Core – Keep low back pressed to bench/mat – 3×12 each side",
        "Side Plank – Core / Obliques – Hips high, body in line – 3×20 sec each side",
      ],
      cooldown: [
        "Full-Body Stretch – Mobility – Focus on hips, hamstrings, chest – 8 min",
      ],
    },

    // Wed – Lower Body Focus
    wednesday: {
      warmup: [
        "Bike – Cardio – Easy spinning – 5 min",
        "Hip Mobility – Hips / Glutes – Lunges with reach, hip circles – 5 min",
      ],
      main: [
        "Back Squat (DB at shoulders) – Legs / Glutes – Knees tracking over toes – 3×12 reps",
        "Reverse Lunge – Legs / Glutes – Step back, tall torso – 3×10 each leg",
        "Leg Press (or extra Goblet Squat heavier) – Legs – Controlled tempo – 3×12 reps",
        "Glute Bridge (weighted if able) – Glutes / Hamstrings – Squeeze at top – 3×15 reps",
        "Standing Calf Raise – Calves – Full stretch and squeeze – 3×15 reps",
        "Hanging Knee Raise (or lying leg raise) – Core – No swinging – 3×12 reps",
      ],
      cooldown: [
        "Treadmill Walk – Recovery – Easy pace – 5 min",
        "Lower-Body Stretch – Hips / Hamstrings / Quads – 8 min",
      ],
    },

    // Thu – Full-Body Conditioning Circuit
    thursday: {
      warmup: ["Elliptical – Cardio – Gradually increase to moderate – 6 min"],
      main: [
        "Circuit × 3 rounds (60 sec rest after each round) – Full Body – Move smooth, focus on breathing – ~25–30 min total",
        " • DB Squat to Press – Legs / Shoulders – Drive from legs, finish overhead – 12 reps",
        " • Cable Row – Back / Biceps – Squeeze at end range – 12 reps",
        " • Step-Up (bench) – Legs / Glutes – Drive through heel – 10 each leg",
        " • Push-Up (bench if needed) – Chest / Triceps – Body straight – 10–12 reps",
        " • Mountain Climbers – Core / Cardio – Steady pace – 30 sec",
      ],
      cooldown: [
        "Gentle Bike or Walk – Cardio – Bring heart rate down – 5 min",
        "Stretch – Chest / Back / Hips – 8 min",
      ],
    },

    // Fri – Upper Body Focus + Core
    friday: {
      warmup: [
        "Arm & Shoulder Mobility – Shoulders – Arm circles, band pull-aparts – 5 min",
        "Row Machine or Cable Row (light) – Back – Easy warm-up pulling – 5 min",
      ],
      main: [
        "Incline DB Bench Press – Upper Chest / Shoulders – Control down, strong press – 3×12 reps",
        "One-Arm DB Row – Back / Biceps – Flat back, pull to hip – 3×12 each arm",
        "Cable Chest Fly – Chest – Slight elbow bend, squeeze in front – 3×15 reps",
        "Cable Lat Pulldown (or similar) – Back – Pull to chest – 3×12 reps",
        "DB Biceps Curl – Biceps – Elbows at sides – 3×12 reps",
        "Cable Triceps Pressdown – Triceps – Lock elbows at sides – 3×12 reps",
        "Plank with Shoulder Tap – Core / Shoulders – Minimize hip sway – 3×20 taps",
      ],
      cooldown: [
        "Upper-Body Stretch – Chest / Lats / Shoulders – 8 min",
        "Light Breathing Drill – Recovery – Deep inhale / slow exhale – 3 min",
      ],
    },
  },

  // BUILD PHASE (Weeks 5–8)
  build: {
    // Mon – Full-Body Strength (Heavier)
    monday: {
      warmup: [
        "Treadmill Walk/Jog – Full Body – Gradually build to light jog – 8 min",
      ],
      main: [
        "Goblet Squat (heavier) – Legs / Glutes – Strong drive up – 4×10 reps",
        "Flat DB Bench Press – Chest / Triceps – Add weight if form solid – 4×10 reps",
        "Bent-Over DB Row – Back / Biceps – Neutral spine – 4×10 reps",
        "Romanian Deadlift – Hamstrings / Glutes – Slow 3-sec lower – 3×10 reps",
        "Plank Hold – Core – Stable breathing – 3×40 sec",
      ],
      cooldown: [
        "Walk Cool-Down – Cardio – Easy pace – 5 min",
        "Hip & Hamstring Stretch – Flexibility – 8 min",
      ],
    },

    // Tue – Cardio + Core (More structured intervals)
    tuesday: {
      warmup: ["Elliptical – Cardio – Easy to moderate – 6 min"],
      main: [
        "Run/Walk Intervals – Cardio – 75 sec run / 45 sec walk × 10 rounds",
        "Stationary Bike – Cardio – Steady moderate zone – 15 min",
        "Cable Woodchop – Core / Obliques – Rotate from torso – 3×12 each side",
        "Reverse Crunch – Core – Slow, controlled – 3×15 reps",
      ],
      cooldown: ["Mobility Flow – Hips / Ankles / Spine – 8 min"],
    },

    // Wed – Lower Body Strength Focus
    wednesday: {
      warmup: [
        "Bike – Cardio – Easy spinning – 5 min",
        "Dynamic Leg Swings / Lunges – Legs / Hips – 5 min",
      ],
      main: [
        "DB Front Squat – Legs / Core – Elbows high, stable torso – 4×8–10 reps",
        "Walking Lunge (with DBs if ready) – Legs / Glutes – 3×10 each leg",
        "Single-Leg Romanian Deadlift – Balance / Hamstrings – 3×10 each leg",
        "Glute Bridge March – Glutes / Core – Alternate legs, hips high – 3×12 each leg",
        "Seated or Standing Calf Raise – Calves – 3×15 reps",
        "Hanging Knee Raise / Leg Raise – Core – 3×12–15 reps",
      ],
      cooldown: [
        "Treadmill Walk – Recovery – 5 min",
        "Quad / Hamstring / Glute Stretch – 8 min",
      ],
    },

    // Thu – Full-Body Conditioning
    thursday: {
      warmup: ["Elliptical – Cardio – Gradual build to moderate – 6 min"],
      main: [
        "Circuit × 4 rounds (45–60 sec rest between rounds) – Full Body – ~30 min",
        " • DB Squat to Press – Legs / Shoulders – 10 reps",
        " • Push-Up – Chest / Triceps – 10–12 reps",
        " • DB Row – Back / Biceps – 12 each arm",
        " • Reverse Lunge – Legs / Glutes – 10 each leg",
        " • Mountain Climbers – Core / Cardio – 30–40 sec",
      ],
      cooldown: ["Bike or Walk – Easy – 5 min", "Full-Body Stretch – 8 min"],
    },

    // Fri – Upper Body Focus + Rotational Core
    friday: {
      warmup: [
        "Band or Cable Warm-Up – Shoulders / Back – Light rows & external rotations – 5 min",
        "Row Machine or Cable Row – Back – 5 min easy",
      ],
      main: [
        "Incline DB Bench Press – Upper Chest / Shoulders – 4×8–10 reps",
        "One-Arm DB Row – Back / Biceps – 4×8–10 each arm",
        "Seated Shoulder Press (DB) – Shoulders / Triceps – 3×10 reps",
        "Cable Chest Fly – Chest – 3×12–15 reps",
        "DB Hammer Curl – Biceps / Forearms – 3×10–12 reps",
        "Overhead DB Triceps Extension – Triceps – 3×10–12 reps",
        "Russian Twist (light DB) – Core / Obliques – 3×16–20 twists",
      ],
      cooldown: ["Upper-Body Stretch – Chest / Shoulders / Lats – 8–10 min"],
    },
  },

  // DEFINITION PHASE (Weeks 9–12)
  definition: {
    // Mon – Full-Body Strength + Higher Rep Tone
    monday: {
      warmup: ["Treadmill Walk/Jog – Full Body – Build to light jog – 8 min"],
      main: [
        "Goblet Squat – Legs / Glutes – Controlled, full depth – 3×15 reps",
        "DB Bench Press – Chest / Triceps – Slightly faster up, slow down – 3×12–15 reps",
        "DB Row – Back / Biceps – Strong squeeze at top – 3×12–15 reps",
        "Romanian Deadlift – Hamstrings / Glutes – 3×12 reps",
        "Plank with Reach – Core / Shoulders – Reach alternating arms – 3×30 sec",
      ],
      cooldown: [
        "Walk – Easy – 5 min",
        "Stretch – Hips / Hamstrings / Chest – 8–10 min",
      ],
    },

    // Tue – HIIT + Core
    tuesday: {
      warmup: ["Elliptical – Cardio – Easy to moderate – 6 min"],
      main: [
        "Treadmill HIIT – Cardio – 30 sec fast / 60 sec walk × 12 rounds",
        "Stationary Bike – Cardio – Moderate steady pace – 10 min",
        "Cable Woodchop – Core / Obliques – 3×15 each side",
        "Plank Variations (front / side) – Core – 3×30–40 sec each",
      ],
      cooldown: [
        "Slow Walk – Recovery – 5 min",
        "Mobility Flow – Spine / Hips – 8 min",
      ],
    },

    // Wed – Lower Body + Athletic Elements
    wednesday: {
      warmup: [
        "Bike – Cardio – Easy spin – 5 min",
        "Dynamic Leg Warm-Up – Legs / Hips – Walking lunges, high knees – 5 min",
      ],
      main: [
        "DB Front Squat – Legs / Core – 4×10 reps",
        "Reverse Lunge (with DBs) – Legs / Glutes – 3×10 each leg",
        "Kettlebell or DB Swing – Glutes / Hamstrings – Hinge, don’t squat – 3×20 reps",
        "Step-Up with Knee Drive – Legs / Balance / Core – 3×10 each leg",
        "Calf Raise – Calves – 3×15–20 reps",
        "Hanging Leg Raise or Reverse Crunch – Core – 3×15 reps",
      ],
      cooldown: ["Walk – Easy – 5 min", "Lower-Body Stretch – 10 min"],
    },

    // Thu – Full-Body Conditioning Circuit
    thursday: {
      warmup: ["Elliptical – Cardio – Moderate – 6–8 min"],
      main: [
        "AMRAP 20–25 min (as many quality rounds as possible): – Full Body – Move with control, minimal rest",
        " • DB Squat to Press – Legs / Shoulders – 10 reps",
        " • Push-Up – Chest / Triceps – 10–12 reps",
        " • DB Row – Back / Biceps – 12 each arm",
        " • Walking Lunge – Legs / Glutes – 10 each leg",
        " • Mountain Climbers or High Knees – Cardio / Core – 30–40 sec",
      ],
      cooldown: ["Bike – Very easy – 5 min", "Stretch – Full Body – 10 min"],
    },

    // Fri – Upper Body Tone + Core Finisher
    friday: {
      warmup: [
        "Band/Cable Warm-Up – Shoulders / Back – Light rows, pull-aparts – 5 min",
        "Row Machine or Cable Row – Back – 5 min easy",
      ],
      main: [
        "Incline DB Bench – Upper Chest / Shoulders – 3×12–15 reps",
        "One-Arm DB Row – Back / Biceps – 3×12–15 each arm",
        "Lateral Raise – Shoulders – Soft elbow bend – 3×15 reps",
        "Cable Chest Fly – Chest – 3×15 reps",
        "DB Curl + Press – Biceps / Shoulders – 3×10–12 reps",
        "Cable Triceps Pressdown – Triceps – 3×12–15 reps",
        "Core Tri-Set × 3 rounds – Core – Minimal rest between moves",
        " • Russian Twist – Core / Obliques – 20 twists",
        " • Plank – Core – 40 sec",
        " • Dead Bug – Core / Stability – 12 each side",
      ],
      cooldown: [
        "Upper-Body Stretch – 10 min",
        "Deep Breathing – Recovery – 3 min",
      ],
    },
  },
};

// ---------- Overlay Handling & Rendering ----------
function startWorkout() {
  toggleTimer(true);
  toggleSpotify(); // show music if hidden
  openWorkout();
}

function openWorkout() {
  const overlay = document.getElementById("workout-overlay");
  const dayEl = document.getElementById("workout-day");
  const dateEl = document.getElementById("workout-date");
  const phaseEl = document.getElementById("workout-phase");
  const list = document.getElementById("workout-list");

  overlay.classList.remove("hidden");

  // Track that workout was opened
  recordWorkoutOpened();

  const dayNum = today.getDay();
  const dayName = weekdayPlans[dayNum] || "Rest";
  const formatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  dayEl.textContent = dayName.toUpperCase();
  phaseEl.textContent = `${getPhase()} • Week ${weekNum} of 12`;
  dateEl.textContent = formatted;

  const phaseKey =
    weekNum <= 4 ? "foundation" : weekNum <= 8 ? "build" : "definition";
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

  const quoteBox = document.getElementById("quote-box");
  if (quoteBox) {
    quoteBox.textContent = getCoachMessageForToday();
    quoteBox.classList.remove("hidden");
  }

  updateWorkoutProgress();
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
    const name = (parts[0] || "").trim();
    const group = (parts[1] || "").trim();
    const desc = (parts[2] || "").trim();
    const reps = (parts[3] || "").trim();

    const div = document.createElement("div");
    div.className = "exercise";

    const nameEl = document.createElement("p");
    nameEl.textContent = `• ${name}${group ? ` (${group})` : ""}`;
    nameEl.style.fontWeight = "600";
    nameEl.style.marginBottom = "0.25rem";

    div.appendChild(nameEl);

    if (desc) {
      const descEl = document.createElement("p");
      descEl.textContent = desc;
      descEl.style.fontSize = "0.9rem";
      descEl.style.color = "#cfd6e6";
      div.appendChild(descEl);
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
  const bar = document.getElementById("workout-progress-bar");
  if (!exercises.length || !bar) return;
  const percent = Math.round((done / exercises.length) * 100);
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
    if (btn) btn.textContent = "▶️ Start";
  } else {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    timerInterval = setInterval(() => {
      totalSeconds++;
      const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
      const s = String(totalSeconds % 60).padStart(2, "0");
      timerDisplay.textContent = `${m}:${s}`;
    }, 1000);
    if (btn) btn.textContent = "⏹ Stop";
  }
}

// ---------- SPOTIFY ----------
function toggleSpotify() {
  const player = document.getElementById("spotify-player");
  if (player) player.classList.toggle("hidden");
}

function openSpotify() {
  window.open(
    "https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh",
    "_blank"
  );
}

// ---------- HYDRATION ----------
let cups = 0;
let streak = 0;
let bestStreak = 0;
const hydrationDisplay = document.getElementById("hydration");
const progressBar = document.getElementById("progress-bar");

function getGradientColor(percent) {
  const red = percent < 50 ? 255 : Math.round(255 - (percent - 50) * 5.1);
  const green = percent < 50 ? Math.round(percent * 5.1) : 255;
  return `rgb(${red},${green},0)`;
}

function updateHydrationDisplay() {
  if (!hydrationDisplay || !progressBar) return;
  hydrationDisplay.innerText = `${cups} / 8 cups`;
  const percent = (cups / 8) * 100;
  progressBar.style.width = `${percent}%`;
  progressBar.style.backgroundColor = getGradientColor(percent);
}

function updateStreakDisplay() {
  const s = document.getElementById("streak");
  const b = document.getElementById("best-streak");
  if (s) s.innerText = `🔥 Current Streak: ${streak} days`;
  if (b) b.innerText = `🏅 Best Streak: ${bestStreak} days`;
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
    bestStreak = Math.max(saved ? saved.bestStreak || 0 : 0, streak);
    cups = 0;
  }

  updateHydrationDisplay();
  updateStreakDisplay();

  localStorage.setItem(
    "hydrationData",
    JSON.stringify({ date: t, cups, streak, bestStreak })
  );
}

function addCup() {
  if (cups < 8) {
    cups++;
    updateHydrationDisplay();
    const t = new Date().toDateString();
    localStorage.setItem(
      "hydrationData",
      JSON.stringify({ date: t, cups, streak, bestStreak })
    );
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
  alert(
    `📊 Daily Summary\n\n💧 Cups: ${data.cups || 0}/8\n🍽 Meals: ${
      meals.length
    }\n🔥 Streak: ${data.streak || 0} days`
  );
}

function scrollToHydration() {
  const cards = document.querySelectorAll(".card");
  if (cards.length > 1) {
    cards[1].scrollIntoView({ behavior: "smooth" }); // second card = hydration
  }
}

// ---------- CELEBRATIONS (Confetti + Chime) ----------
function celebrateHydration() {
  playChime();
  runConfetti();
  showTemporaryMessage("🎉 Hydration goal reached!");
}

function celebrateWorkout() {
  playChime();
  runConfetti();
  const msg = document.getElementById("congrats-msg");
  const quoteBox = document.getElementById("quote-box");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const mins = Math.floor(totalSeconds / 60);

  if (msg) {
    msg.textContent = "🎉 Workout Completed!";
    msg.classList.add("show");
    setTimeout(() => msg.classList.remove("show"), 3000);
  }

  if (quoteBox) {
    quoteBox.textContent = `⏱ Workout complete in ${mins} minutes.\n${randomQuote}`;
    quoteBox.classList.remove("hidden");
  }

  localStorage.setItem("lastWorkout", new Date().toDateString());
  recordWorkoutCompletion();
}

function playChime() {
  const audio = new Audio(
    "https://cdn.pixabay.com/download/audio/2023/02/28/audio_46d3b4a19f.mp3?filename=success-1-6297.mp3"
  );
  audio.play().catch(() => {});
}

function runConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const confetti = [];
  const colors = ["#eaa92e", "#22266a", "#f5f6f7"];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  for (let i = 0; i < 130; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 0.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
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
  if (!msg) return;
  msg.textContent = text;
  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 3000);
}

// ==============================================
// ADAPTIVE COACH – simple AI-style logic
// ==============================================
function getCoachStats() {
  const hydration = JSON.parse(localStorage.getItem("hydrationData") || "null");
  const stats = JSON.parse(localStorage.getItem("gf_stats") || "null");

  return {
    hydrationToday: hydration ? hydration.cups || 0 : 0,
    streak: hydration ? hydration.streak || 0 : 0,
    completedWorkouts: stats ? stats.completedWorkouts || 0 : 0,
    totalWorkoutsOpened: stats ? stats.totalWorkoutsOpened || 0 : 0,
    lastWorkoutDate: stats ? stats.lastWorkoutDate || null : null,
  };
}

function recordWorkoutOpened() {
  const stats = JSON.parse(localStorage.getItem("gf_stats") || "{}");
  stats.totalWorkoutsOpened = (stats.totalWorkoutsOpened || 0) + 1;
  localStorage.setItem("gf_stats", JSON.stringify(stats));
}

function recordWorkoutCompletion() {
  const stats = JSON.parse(localStorage.getItem("gf_stats") || "{}");
  stats.completedWorkouts = (stats.completedWorkouts || 0) + 1;
  stats.lastWorkoutDate = new Date().toDateString();
  localStorage.setItem("gf_stats", JSON.stringify(stats));
}

function getCoachLevel() {
  const s = getCoachStats();

  const completionRate = s.totalWorkoutsOpened
    ? s.completedWorkouts / s.totalWorkoutsOpened
    : 0;

  if (completionRate < 0.4 || s.hydrationToday < 4) {
    return "rebuilding";
  } else if (completionRate < 0.75 || s.streak < 3) {
    return "balanced";
  } else {
    return "pushing";
  }
}

function getCoachMessageForToday() {
  const level = getCoachLevel();
  const s = getCoachStats();

  if (level === "rebuilding") {
    return "Coach: Hoy vamos suave pero constantes. Termina el entrenamiento con buena técnica y apunta a beber al menos 6–8 vasos de agua. 💧💪";
  }

  if (level === "balanced") {
    return `Coach: Vas bien. Streak de ${s.streak} días, ahora concéntrate en terminar todas las series de hoy con buena forma. Si te ves fuerte, sube un poco el peso. 🔥`;
  }

  return `Coach: Estás en modo avance. Con una racha de ${s.streak} días, hoy puedes empujar el ritmo o el peso un poquito más, pero sin sacrificar la técnica. 🏆`;
}

function getCoachNextWeekAdvice() {
  const level = getCoachLevel();
  const s = getCoachStats();

  const completionRate = s.totalWorkoutsOpened
    ? s.completedWorkouts / s.totalWorkoutsOpened
    : 0;

  const currentWeek = weekNum;
  const isDeloadWeek = currentWeek % 4 === 0; // 4, 8, 12...

  if (level === "rebuilding") {
    return "Next week focus: Aim for 3 finished workouts and at least 6 cups of water per day. Keep the same weights and just build consistency. 🧱";
  }

  if (level === "balanced") {
    if (isDeloadWeek) {
      return "Next week focus: Deload. Keep the same weights but drop 1 set on the hardest exercises and prioritize good sleep and stretching. 😌";
    }
    return "Next week focus: Try to finish 4+ workouts and, if all sets feel solid, increase weight slightly (about 2–5 lbs) on 1–2 key lifts. 📈";
  }

  if (isDeloadWeek) {
    return "Next week focus: You’ve been pushing hard. Take a deload week—reduce volume by about 25% but keep intensity and technique sharp. This keeps you strong long-term. 🧠💪";
  }

  return "Next week focus: You’re ready to push. Keep hydration high, maintain your streak, and either add a bit of weight or shorten rest by 10–15 seconds on your main lifts. 🔥";
}

function showCoach() {
  const card = document.getElementById("coach-card");
  if (!card) return;

  const stats = getCoachStats();
  const level = getCoachLevel();

  let levelLabel;
  if (level === "rebuilding") {
    levelLabel = "Rebuilding (getting back on track)";
  } else if (level === "balanced") {
    levelLabel = "Balanced (steady progress)";
  } else {
    levelLabel = "Pushing (high consistency)";
  }

  const completionRate = stats.totalWorkoutsOpened
    ? Math.round((stats.completedWorkouts / stats.totalWorkoutsOpened) * 100)
    : 0;

  const weekEl = document.getElementById("coach-week");
  if (weekEl) {
    weekEl.textContent = `Week: ${weekNum} of 12 • ${getPhase()}`;
  }

  const levelEl = document.getElementById("coach-level");
  if (levelEl) {
    levelEl.textContent = `Current mode: ${levelLabel}`;
  }

  const completionEl = document.getElementById("coach-completion");
  if (completionEl) {
    completionEl.textContent = `Workout completion: ${completionRate}% (${
      stats.completedWorkouts
    }/${stats.totalWorkoutsOpened || 0} opened)`;
  }

  const hydrationEl = document.getElementById("coach-hydration");
  if (hydrationEl) {
    hydrationEl.textContent = `Hydration today: ${stats.hydrationToday}/8 cups • Streak: ${stats.streak} days`;
  }

  const messageEl = document.getElementById("coach-message");
  if (messageEl) {
    messageEl.textContent = getCoachMessageForToday();
  }

  const nextEl = document.getElementById("coach-next");
  if (nextEl) {
    nextEl.textContent = getCoachNextWeekAdvice();
  }

  const bar = document.getElementById("coach-progress-bar");
  if (bar) {
    bar.style.width = `${completionRate}%`;
  }

  card.classList.remove("hidden");
  card.scrollIntoView({ behavior: "smooth" });
}

// ---------- INIT ----------
window.onload = () => {
  loadHydration();
  updateWorkoutProgress();
  console.log("✅ Gabe Fitness v2 loaded (dark default, hybrid + coach)");
};
