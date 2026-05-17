export const INITIAL_PHASES = [
  {
    id: 1,
    name: "FOUNDATION",
    weeks: "1–3",
    weekRange: [1, 2, 3],
    tagline: "Build the base. Tendons, patterns, neural prep.",
    color: "#c8a97e",
    description:
      "Establish movement quality, connective tissue tolerance, and foundational strength. Low plyometric volume with emphasis on bilateral strength patterns. Based on adaptation-phase periodization principles (Verkhoshansky & Siff) and the 3-week general prep block used in elite jump programs.",
    lowerA: {
      title: "LOWER A — Bilateral Strength",
      focus: "Posterior chain + quad dominance, bilateral",
      exercises: [
        { id: "p1a1", name: "Extensive Pogo Jumps", sets: "3", reps: "20 sec", load: "BW", notes: "Stiff ankles. Bounce like a pogo stick — minimal knee bend. This is tendon prep, not cardio." },
        { id: "p1a2", name: "Depth Drop (Stick Landing)", sets: "3", reps: "5", load: "BW", notes: "12–18\" box. Step off horizontally. Freeze instantly in athletic stance. Do NOT jump after. Pure eccentric absorption." },
        { id: "p1a3", name: "Back Squat", sets: "4", reps: "6–8", load: "70–75% 1RM", notes: "Controlled 3-sec descent. Plyos come first — you're fresh for everything." },
        { id: "p1a4", name: "Romanian Deadlift", sets: "3", reps: "8–10", load: "Moderate", notes: "Full hip hinge, feel the hamstring stretch. Slow eccentric — this is braking system work." },
        { id: "p1a5", name: "Lying Leg Curl (Machine)", sets: "3", reps: "6–8", load: "Moderate-heavy", notes: "4-sec eccentric on every rep. Slow the lowering phase way down." },
        { id: "p1a6", name: "Seated Calf Raise", sets: "3", reps: "12", load: "Heavy", notes: "Full stretch at bottom, slow eccentric. Soleus/Achilles tendon prep." },
      ],
    },
    lowerB: {
      title: "LOWER B — Unilateral + Power Intro",
      focus: "Single-leg strength, hip stability, horizontal power",
      exercises: [
        { id: "p1b1", name: "Broad Jump", sets: "3", reps: "4", load: "BW", notes: "Max distance. Full reset between jumps — this is explosive, not cardio." },
        { id: "p1b2", name: "Single-Leg Bounding", sets: "3", reps: "10 yds", load: "BW", notes: "Violent hip extension. Cover ground. Land and explode off the same leg." },
        { id: "p1b3", name: "Bulgarian Split Squat", sets: "4", reps: "8/side", load: "Moderate", notes: "Knee tracking, upright torso. Unilateral strength is where most athletes have the biggest gap." },
        { id: "p1b4", name: "Slider Leg Curl", sets: "3", reps: "8", load: "BW", notes: "Heels on sliders or towel on smooth floor. Bridge up, slowly slide heels out. 4-sec eccentric." },
        { id: "p1b5", name: "Tibialis Raise", sets: "3", reps: "15", load: "BW", notes: "Crucial for decelerating forces and shin health. Don't skip this." },
      ],
    },
    scienceNote:
      "Session flow every lower day: Warm-up → Plyos/Explosive work → Heavy lifts → Accessories. Never lift heavy first. The Depth Drop is not a Depth Jump: eccentric absorption must be built before reactive expression is trained. Tendons adapt slower than muscle — this 3-week block is non-negotiable.",
  },
  {
    id: 2,
    name: "STRENGTH",
    weeks: "4–7",
    weekRange: [4, 5, 6, 7],
    tagline: "Get strong. Maximal force = jump ceiling.",
    color: "#e07b39",
    description:
      "The core strength block. Intensity climbs week over week toward 80–90% 1RM. Plyometric volume increases progressively. Combined heavy strength + plyometrics outperforms either alone. This is where you build the force production capacity that will be converted to velocity in Phase 3.",
    lowerA: {
      title: "LOWER A — Max Strength",
      focus: "Heavy bilateral loading, strength ceiling",
      exercises: [
        { id: "p2a1", name: "Box Jump (Max Height)", sets: "4", reps: "3", load: "BW", notes: "Explosive first. Focus on max vertical displacement, soft landing. Full reset every rep." },
        { id: "p2a2", name: "Back Squat", sets: "5", reps: "3–5", load: "82–88% 1RM", notes: "Wk 4: 82%, Wk 5: 84%, Wk 6: 87%, Wk 7: 90%. After plyos — CNS is primed." },
        { id: "p2a3", name: "Trap Bar Deadlift", sets: "4", reps: "4–5", load: "80–87% 1RM", notes: "Explosive concentric, controlled eccentric." },
        { id: "p2a4", name: "Pause Squat", sets: "3", reps: "4", load: "65–70% 1RM", notes: "3-sec pause at bottom — eliminates the stretch reflex and builds raw out-of-the-hole power." },
        { id: "p2a5", name: "Lying Leg Curl (Machine)", sets: "3", reps: "5–7", load: "Heavy", notes: "Get slower on the eccentric week over week. By week 7 you want 5+ seconds on the way down." },
        { id: "p2a6", name: "Standing Calf Raise", sets: "4", reps: "12–15", load: "Heavy", notes: "Add weight each week." },
      ],
    },
    lowerB: {
      title: "LOWER B — Complex Training (PAP Pairs)",
      focus: "Post-activation potentiation pairs, 3–4 min rest between stimulus and expression",
      exercises: [
        { id: "p2b1", name: "Repeated Hurdle Jumps", sets: "3", reps: "4", load: "BW", notes: "Low hurdles, minimal ground contact time. Explosive first." },
        { id: "p2b2", name: "Bulgarian Split Squat (Heavy)", sets: "4", reps: "5/side", load: "75–82% 1RM", notes: "PAP stimulus. Rest exactly 3–4 min after this set before the jump." },
        { id: "p2b3", name: "→ Single-Leg Box Jump", sets: "4", reps: "3/side", load: "BW", notes: "3–4 min after split squat. Same leg. The rest window is the mechanism." },
        { id: "p2b4", name: "Hip Thrust (Heavy)", sets: "3", reps: "6–8", load: "Heavy", notes: "Glute power — underrated for vertical. Explosive drive." },
        { id: "p2b5", name: "Lateral Skater Bounds", sets: "3", reps: "4/side", load: "BW", notes: "Lateral power + landing mechanics." },
        { id: "p2b6", name: "Ankle Hops", sets: "3", reps: "15", load: "BW", notes: "Stiff ankle, minimal knee bend, fast ground contact." },
      ],
    },
    scienceNote:
      "Classic Complex Training uses a 3–4 min rest between the heavy lift and the explosive movement. This window lets acute muscular fatigue dissipate while CNS excitability (the potentiation effect) remains elevated — per Seitz & Haff (2016) meta-analysis. Distinct from the French Contrast Method in Phase 3.",
  },
  {
    id: 3,
    name: "POWER & CONTRAST",
    weeks: "8–10",
    weekRange: [8, 9, 10],
    tagline: "French Contrast Method. Push the CNS to its absolute limit.",
    color: "#d63c3c",
    description:
      "This phase introduces the French Contrast Method on Lower A, exploiting Post-Activation Performance Enhancement (PAPE). Four exercises, 20-second intra-set rests, 4-minute circuit rest. Lower B shifts to true Verkhoshansky shock-method depth jumps.",
    lowerA: {
      title: "LOWER A — French Contrast Circuit",
      focus: "PAPE Circuit: Heavy → Unweighted → Weighted → Supramaximal. 20s between exercises, 4 min after circuit.",
      exercises: [
        { id: "p3a1", name: "Heavy Back Squat", sets: "4", reps: "3", load: "85–90% 1RM", notes: "1A: The conditioning stimulus. Rack it, rest exactly 20 seconds. Do not sit down." },
        { id: "p3a2", name: "→ Max Vertical Jump", sets: "4", reps: "4", load: "BW", notes: "1B: Unweighted. Full reset between each jump. Rest 20s after last rep." },
        { id: "p3a3", name: "→ DB Jump Squat", sets: "4", reps: "4", load: "10–15% BW", notes: "1C: Light dumbbells. Explode every rep. Rest 20s." },
        { id: "p3a4", name: "→ Band-Assisted Jump", sets: "4", reps: "4", load: "Supramaximal", notes: "1D: Band anchored above, held in hands. Jump faster than gravity allows. Rest 4 FULL minutes after." },
        { id: "p3a5", name: "Kettlebell Swing", sets: "3", reps: "10", load: "Heavy", notes: "Posterior chain maintenance. Violent hip snap — not a squat." },
        { id: "p3a6", name: "Calf Raise (Explosive)", sets: "3", reps: "10", load: "Moderate", notes: "Explode up on every rep. Tendon elasticity." },
      ],
    },
    lowerB: {
      title: "LOWER B — Reactive & Unilateral Power",
      focus: "True shock-method depth jumps, single-leg complex, sprint acceleration",
      exercises: [
        { id: "p3b1", name: "Depth Jump (Shock Method)", sets: "4", reps: "4", load: "BW", notes: "24–30\" box. Step off, hit ground, INSTANT rebound. Minimize contact time at all costs." },
        { id: "p3b2", name: "Heavy Bulgarian Split Squat", sets: "3", reps: "4/side", load: "80% 1RM", notes: "PAP stimulus for the superset below." },
        { id: "p3b3", name: "→ Single-Leg Bound", sets: "3", reps: "3/side", load: "BW", notes: "Immediately after split squats. Max distance + height. Same leg." },
        { id: "p3b4", name: "Sprint 15yd", sets: "5", reps: "1", load: "BW", notes: "Full recovery 3+ min. Max acceleration." },
        { id: "p3b5", name: "Lateral Skater Bounds", sets: "3", reps: "4/side", load: "BW", notes: "Max lateral power output." },
        { id: "p3b6", name: "Max Vertical Jump Test", sets: "1", reps: "5", load: "BW", notes: "Every session. Log it. Track RSI if possible." },
      ],
    },
    scienceNote:
      "The French Contrast Method (Gilles Cometti) is distinct from Classic Complex Training. The 20-second intra-exercise transition compounds the potentiation effect across all four exercises. Band-assisted jumps train the CNS to cycle motor units at velocities impossible under normal gravity.",
  },
  {
    id: 4,
    name: "PEAK",
    weeks: "11–12",
    weekRange: [11, 12],
    tagline: "Realize your gains. Test and express.",
    color: "#4a9eff",
    description:
      "Volume drops 40%. Intensity stays high. The body supercompensates — your nervous system fully expresses the adaptations built over 10 weeks. Week 12 is your PR week.",
    lowerA: {
      title: "LOWER A — Taper Strength",
      focus: "Maintain, don't accumulate. Stay sharp.",
      exercises: [
        { id: "p4a1", name: "Back Squat", sets: "3", reps: "3", load: "85–90% 1RM", notes: "Maintain the ceiling. Don't try to PR here." },
        { id: "p4a2", name: "Trap Bar DL", sets: "3", reps: "3", load: "80% 1RM", notes: "Powerful and crisp." },
        { id: "p4a3", name: "Jump Squat", sets: "3", reps: "4", load: "30% 1RM", notes: "Max intent. Feel how fast you've become." },
        { id: "p4a4", name: "Depth Jump (Peak)", sets: "3", reps: "4", load: "BW", notes: "30\" box. Perfect form. Max reactive." },
        { id: "p4a5", name: "Calf Raise", sets: "2", reps: "12", load: "Moderate", notes: "Maintenance only." },
        { id: "p4a6", name: "Max Vertical Jump Test", sets: "1", reps: "5", load: "BW", notes: "Document your pre-taper baseline here." },
      ],
    },
    lowerB: {
      title: "LOWER B — Expression Week",
      focus: "Peak athleticism. Test everything.",
      exercises: [
        { id: "p4b1", name: "Max Vertical Jump", sets: "5", reps: "3", load: "BW", notes: "Full warm-up. 5 min between sets. Log every single jump. This is why you trained." },
        { id: "p4b2", name: "Depth Jump (Best of 3)", sets: "3", reps: "3", load: "BW", notes: "30\" box. Best RSI of the program." },
        { id: "p4b3", name: "Sprint 40yd", sets: "4", reps: "1", load: "BW", notes: "Time it. Compare to week 1." },
        { id: "p4b4", name: "Broad Jump", sets: "4", reps: "3", load: "BW", notes: "Max distance. Compare to week 1." },
        { id: "p4b5", name: "Single-Leg Triple Hop", sets: "3", reps: "3/side", load: "BW", notes: "3 consecutive hops for max distance." },
        { id: "p4b6", name: "Active Recovery Finish", sets: "1", reps: "10 min", load: "BW", notes: "Foam roll, walk, celebrate." },
      ],
    },
    scienceNote:
      "Supercompensation: after a period of overreaching, reducing volume while maintaining intensity allows the body to bounce above its previous baseline. CNS recovery is what the taper is really about.",
  },
];

export const WEEKLY_STRUCTURE = [
  { day: "MON", session: "Upper A", type: "upper" },
  { day: "TUE", session: "PT / ABS / Recovery", type: "recovery" },
  { day: "WED", session: "Lower A", type: "lower" },
  { day: "THU", session: "REST", type: "rest" },
  { day: "FRI", session: "Upper B", type: "upper" },
  { day: "SAT", session: "Lower B", type: "lower" },
  { day: "SUN", session: "REST", type: "rest" },
];
