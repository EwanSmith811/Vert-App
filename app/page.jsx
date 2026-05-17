"use client";
import { useState, useEffect, useCallback } from "react";
import { INITIAL_PHASES, WEEKLY_STRUCTURE } from "../lib/programData";

const STORAGE_KEY = "vert_program_v1";
const PROGRESS_KEY = "vert_progress_v1";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function loadFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

export default function VertApp() {
  const [phases, setPhases] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activePhase, setActivePhase] = useState(0);
  const [activeSession, setActiveSession] = useState("lowerA");
  const [view, setView] = useState("program");
  const [editingEx, setEditingEx] = useState(null);
  const [expandedEx, setExpandedEx] = useState(null);
  const [logTarget, setLogTarget] = useState(null);
  const [logForm, setLogForm] = useState({ week: "", weight: "", reps: "", notes: "" });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setPhases(loadFromStorage(STORAGE_KEY, INITIAL_PHASES));
    setProgress(loadFromStorage(PROGRESS_KEY, {}));
  }, []);

  const savePhases = useCallback((updated) => {
    setPhases(updated);
    saveToStorage(STORAGE_KEY, updated);
  }, []);

  const saveProgress = useCallback((updated) => {
    setProgress(updated);
    saveToStorage(PROGRESS_KEY, updated);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const updateExercise = (phaseIdx, session, exIdx, field, value) => {
    const updated = phases.map((p, pi) => {
      if (pi !== phaseIdx) return p;
      const exercises = p[session].exercises.map((e, ei) =>
        ei === exIdx ? { ...e, [field]: value } : e
      );
      return { ...p, [session]: { ...p[session], exercises } };
    });
    savePhases(updated);
  };

  const addExercise = (phaseIdx, session) => {
    const newEx = { id: generateId(), name: "New Exercise", sets: "3", reps: "8", load: "BW", notes: "" };
    const updated = phases.map((p, pi) => {
      if (pi !== phaseIdx) return p;
      return { ...p, [session]: { ...p[session], exercises: [...p[session].exercises, newEx] } };
    });
    savePhases(updated);
    showToast("Exercise added");
  };

  const removeExercise = (phaseIdx, session, exIdx) => {
    const updated = phases.map((p, pi) => {
      if (pi !== phaseIdx) return p;
      const exercises = p[session].exercises.filter((_, ei) => ei !== exIdx);
      return { ...p, [session]: { ...p[session], exercises } };
    });
    savePhases(updated);
    if (editingEx === exIdx) setEditingEx(null);
    showToast("Exercise removed");
  };

  const moveExercise = (phaseIdx, session, exIdx, dir) => {
    const updated = phases.map((p, pi) => {
      if (pi !== phaseIdx) return p;
      const exs = [...p[session].exercises];
      const to = exIdx + dir;
      if (to < 0 || to >= exs.length) return p;
      [exs[exIdx], exs[to]] = [exs[to], exs[exIdx]];
      return { ...p, [session]: { ...p[session], exercises: exs } };
    });
    savePhases(updated);
  };

  const logEntry = () => {
    if (!logTarget || !logForm.week) return;
    const key = `${logTarget.phaseIdx}-${logTarget.session}-${logTarget.exId}`;
    const entry = { ...logForm, date: new Date().toISOString().slice(0, 10), id: generateId() };
    const existing = progress[key] || [];
    const updated = { ...progress, [key]: [...existing, entry] };
    saveProgress(updated);
    setLogTarget(null);
    setLogForm({ week: "", weight: "", reps: "", notes: "" });
    showToast("Progress logged");
  };

  const getProgressForEx = (phaseIdx, session, exId) => {
    const key = `${phaseIdx}-${session}-${exId}`;
    return progress?.[key] || [];
  };

  const resetProgram = () => {
    if (!confirm("Reset all edits to the original program? Progress logs are kept.")) return;
    savePhases(INITIAL_PHASES);
    showToast("Program reset");
  };

  if (!phases || !progress) {
    return (
      <div style={{ minHeight: "100dvh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#444", fontFamily: "monospace", letterSpacing: "0.15em" }}>LOADING...</div>
      </div>
    );
  }

  const phase = phases[activePhase];
  const session = phase[activeSession];
  const phaseColor = phase.color;

  const allProgressEntries = Object.entries(progress).flatMap(([key, entries]) => {
    const [pi, sess, exId] = key.split("-");
    const ph = phases[parseInt(pi)];
    if (!ph) return [];
    const exList = ph[sess]?.exercises || [];
    const ex = exList.find((e) => e.id === exId);
    return entries.map((e) => ({
      ...e,
      phaseName: ph.name,
      session: sess === "lowerA" ? "Lower A" : "Lower B",
      exName: ex?.name || exId,
      phaseColor: ph.color,
    }));
  }).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="app-shell" style={{ minHeight: "100dvh", background: "#0a0a0a", color: "#e8e0d5", fontFamily: "'DM Mono', 'Courier New', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #0a0a0a; color: #e8e0d5; }
        body { overscroll-behavior: none; }
        input, textarea { background: #111; border: 1px solid #2a2a2a; color: #e8e0d5; font-family: 'DM Mono', monospace; font-size: 12px; padding: 6px 10px; outline: none; width: 100%; border-radius: 2px; }
        input:focus, textarea:focus { border-color: var(--phase-color, #c8a97e); }
        textarea { resize: vertical; min-height: 60px; }
        button { cursor: pointer; font-family: 'DM Mono', monospace; }
        img { max-width: 100%; display: block; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #222; }
        .top-nav { border-bottom: 1px solid #111; padding: 0 20px; display: flex; align-items: center; gap: 0; position: sticky; top: 0; background: #0a0a0a; z-index: 50; min-height: 45px; }
        .brand-mark { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 0.1em; color: #e8e0d5; padding: 12px 0; margin-right: 24px; flex-shrink: 0; }
        .nav-strip { display: flex; align-items: center; gap: 0; }
        .nav-spacer { flex: 1; }
        .nav-btn { background: transparent; border: none; color: #444; font-size: 11px; letter-spacing: 0.15em; padding: 8px 16px; text-transform: uppercase; transition: color 0.2s; border-bottom: 2px solid transparent; }
        .nav-btn:hover { color: #888; }
        .nav-btn.active { color: #e8e0d5; border-bottom-color: #e8e0d5; }
        .program-layout { display: flex; min-height: calc(100dvh - 45px); align-items: stretch; }
        .phase-sidebar { width: 220px; border-right: 1px solid #111; flex-shrink: 0; display: flex; flex-direction: column; }
        .sidebar-schedule { margin-top: auto; border-top: 1px solid #111; padding: 12px 14px; }
        .main-pane { flex: 1; overflow-y: auto; min-width: 0; width: 100%; }
        .main-content { width: min(1180px, 100%); margin: 0 auto; }
        .progress-view { width: min(1180px, 100%); margin: 0 auto; }
        .session-tabs { display: flex; margin-top: 4px; }
        .exercise-grid { display: grid; grid-template-columns: 22px 1fr 56px 70px 90px 100px; gap: 8px; align-items: center; padding: 11px 0; }
        .exercise-grid > * { min-width: 0; }
        .progress-entry { display: grid; grid-template-columns: 90px 80px 80px 1fr 1fr 1fr; gap: 12px; padding: 10px 14px; background: #0d0d0d; border-left: 2px solid var(--progress-color, #1e1e1e); align-items: center; font-size: 11px; }
        .progress-group { margin-bottom: 20px; background: #0d0d0d; padding: 14px 16px; border-left: 1px solid #1e1e1e; }
        .phase-btn { background: transparent; border: 1px solid #1e1e1e; color: #555; padding: 10px 14px; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; transition: all 0.2s; display: block; width: 100%; text-align: left; border-left: none; border-right: none; border-top: none; }
        .phase-btn:hover { color: #999; background: #0f0f0f; }
        .phase-btn.active { color: var(--pc); border-bottom-color: var(--pc); background: #0d0d0d; }
        .sess-tab { background: transparent; border: none; border-bottom: 2px solid transparent; color: #444; padding: 10px 20px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; transition: all 0.2s; }
        .sess-tab:hover { color: #888; }
        .sess-tab.active { color: var(--phase-color); border-bottom-color: var(--phase-color); }
        .icon-btn { background: transparent; border: 1px solid #1e1e1e; color: #444; padding: 4px 8px; font-size: 10px; transition: all 0.2s; border-radius: 2px; }
        .icon-btn:hover { border-color: #444; color: #aaa; }
        .icon-btn.danger:hover { border-color: #c0392b; color: #c0392b; }
        .ex-row { border-bottom: 1px solid #111; transition: background 0.15s; }
        .ex-row:hover { background: #0d0d0d; }
        .primary-btn { background: var(--phase-color); color: #0a0a0a; border: none; padding: 8px 16px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; border-radius: 2px; transition: opacity 0.2s; }
        .primary-btn:hover { opacity: 0.85; }
        .ghost-btn { background: transparent; border: 1px solid #2a2a2a; color: #666; padding: 7px 14px; font-size: 11px; letter-spacing: 0.08em; border-radius: 2px; transition: all 0.2s; }
        .ghost-btn:hover { border-color: #555; color: #aaa; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
        .modal { background: #0f0f0f; border: 1px solid #1e1e1e; padding: 24px; width: 100%; max-width: 480px; border-radius: 4px; }
        .toast { position: fixed; bottom: 24px; right: 24px; background: #1a1a1a; border: 1px solid #2a2a2a; color: #aaa; padding: 10px 16px; font-size: 11px; letter-spacing: 0.08em; border-radius: 2px; z-index: 200; animation: fadein 0.2s; }
        @keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .day-chip { padding: 8px 10px; border: 1px solid #1a1a1a; border-radius: 2px; text-align: center; }
        .progress-badge { display: inline-block; background: #151515; border: 1px solid #222; border-radius: 2px; padding: 1px 6px; font-size: 9px; color: #555; letter-spacing: 0.08em; }
        @media (max-width: 900px) {
          .top-nav { flex-wrap: wrap; padding: 10px 12px 8px; gap: 8px 0; }
          .brand-mark { margin-right: 12px; padding: 0; font-size: 16px; }
          .nav-strip { width: 100%; order: 3; overflow-x: auto; -webkit-overflow-scrolling: touch; border-top: 1px solid #111; padding-top: 6px; }
          .nav-spacer { display: none; }
          .top-nav .ghost-btn { margin-left: auto; }
          .program-layout { flex-direction: column; min-height: calc(100dvh - 61px); }
          .phase-sidebar { width: 100%; border-right: none; border-bottom: 1px solid #111; flex-direction: row; overflow-x: auto; -webkit-overflow-scrolling: touch; align-items: stretch; }
          .phase-sidebar > div:first-child { padding-top: 12px; }
          .phase-sidebar .phase-btn { min-width: 170px; width: auto; flex-shrink: 0; border-right: 1px solid #111; border-left: none; border-bottom: none; display: inline-flex; flex-direction: column; }
          .sidebar-schedule { display: none; }
          .main-pane { max-width: none; }
          .main-content, .progress-view { width: 100%; margin: 0; }
        }
        @media (max-width: 720px) {
          .top-nav { padding: 10px 10px 8px; }
          .nav-btn { padding: 8px 12px; }
          .main-pane { width: 100%; }
          .main-pane > div:first-child { padding: 16px 14px 0 !important; }
          .main-pane > div:nth-child(2) { padding: 12px 14px 8px !important; }
          .main-pane > div:nth-child(3) { padding: 0 14px !important; }
          .main-pane > div:nth-child(4) { padding: 8px 14px 28px !important; }
          .session-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 2px; }
          .sess-tab { white-space: nowrap; padding-left: 14px; padding-right: 14px; }
          .exercise-grid { display: flex !important; flex-wrap: wrap; gap: 8px 10px; padding: 10px 0; }
          .exercise-grid > :nth-child(1) { width: 24px; flex: 0 0 24px; }
          .exercise-grid > :nth-child(2) { flex: 1 1 calc(100% - 24px); min-width: 0; }
          .exercise-grid > :nth-child(3),
          .exercise-grid > :nth-child(4),
          .exercise-grid > :nth-child(5) { flex: 1 1 calc(33.33% - 8px); min-width: 72px; }
          .exercise-grid > :nth-child(6) { flex: 1 1 100%; justify-content: flex-end; }
          .exercise-grid span, .exercise-grid div { font-size: 11px; }
          .exercise-grid input { padding: 7px 8px; }
          .progress-entry { display: flex !important; flex-wrap: wrap; gap: 6px 12px; align-items: flex-start; }
          .progress-group { padding: 12px 14px; }
          .modal { width: 100%; max-width: none; }
          .toast { left: 12px; right: 12px; bottom: 12px; }
        }
        @media (max-width: 560px) {
          .brand-mark { font-size: 15px; }
          .nav-btn { font-size: 10px; padding: 8px 10px; }
          .top-nav .ghost-btn { font-size: 9px; padding: 7px 10px; }
          .phase-btn { min-width: 150px; }
          .main-pane > div:first-child { padding-top: 14px !important; }
          .main-pane > div:nth-child(3) { padding-top: 6px !important; }
          .main-pane > div:nth-child(4) { padding-bottom: 24px !important; }
          .exercise-grid > :nth-child(3),
          .exercise-grid > :nth-child(4),
          .exercise-grid > :nth-child(5) { flex-basis: calc(50% - 5px); }
          .modal { padding: 18px; }
        }
      `}</style>

      <div style={{ "--phase-color": phaseColor }}>

        {/* Top Nav */}
        <div className="top-nav">
          <div className="brand-mark">
            VERT
          </div>
          <div className="nav-strip">
            {["program", "progress"].map((v) => (
              <button key={v} className={`nav-btn ${view === v ? "active" : ""}`} onClick={() => setView(v)}>
                {v}
              </button>
            ))}
          </div>
          <div className="nav-spacer" />
          <button className="ghost-btn" onClick={resetProgram} style={{ fontSize: 10 }}>Reset Program</button>
        </div>

        {view === "program" && (
          <div className="program-layout">

            {/* Sidebar */}
            <div className="phase-sidebar">
              <div style={{ padding: "16px 14px 8px", fontSize: 9, letterSpacing: "0.2em", color: "#2a2a2a" }}>PHASES</div>
              {phases.map((p, i) => (
                <button
                  key={p.id}
                  className={`phase-btn ${activePhase === i ? "active" : ""}`}
                  style={{ "--pc": p.color }}
                  onClick={() => { setActivePhase(i); setEditingEx(null); setExpandedEx(null); }}
                >
                  <div style={{ fontSize: 12, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em", marginBottom: 1 }}>
                    {i + 1}. {p.name}
                  </div>
                  <div style={{ fontSize: 9, opacity: 0.6 }}>WK {p.weeks}</div>
                </button>
              ))}

              <div className="sidebar-schedule">
                <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "#2a2a2a", marginBottom: 8 }}>SCHEDULE</div>
                {WEEKLY_STRUCTURE.map((d) => (
                  <div key={d.day} style={{ display: "flex", gap: 8, marginBottom: 5, alignItems: "center" }}>
                    <span style={{ fontSize: 9, color: "#333", minWidth: 28, letterSpacing: "0.1em" }}>{d.day}</span>
                    <span style={{
                      fontSize: 9,
                      color: d.type === "lower" ? "#c8a97e" : d.type === "recovery" ? "#4a9eff" : d.type === "rest" ? "#2a2a2a" : "#555",
                    }}>
                      {d.session}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main */}
            <div className="main-pane">
              <div className="main-content">

              {/* Phase header */}
              <div style={{ padding: "20px 24px 0", borderBottom: "1px solid #111" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: phaseColor, boxShadow: `0 0 8px ${phaseColor}` }} />
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.1em", color: phaseColor }}>
                    PHASE {activePhase + 1}: {phase.name}
                  </div>
                  <span style={{ fontSize: 9, padding: "2px 7px", background: `${phaseColor}18`, border: `1px solid ${phaseColor}40`, color: phaseColor, letterSpacing: "0.1em", borderRadius: 2 }}>
                    WK {phase.weeks}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "#777", fontStyle: "italic", marginBottom: 8 }}>{phase.tagline}</div>
                <div style={{ fontSize: 11, color: "#555", lineHeight: 1.7, maxWidth: 600, paddingBottom: 16 }}>{phase.description}</div>

                {/* Session tabs */}
                <div className="session-tabs">
                  {["lowerA", "lowerB"].map((s) => (
                    <button key={s} className={`sess-tab ${activeSession === s ? "active" : ""}`}
                      onClick={() => { setActiveSession(s); setEditingEx(null); setExpandedEx(null); }}>
                      {s === "lowerA" ? "Lower A — Wed" : "Lower B — Sat"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session focus */}
              <div style={{ padding: "12px 24px 8px", borderBottom: "1px solid #0d0d0d" }}>
                <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.06em" }}>
                  <span style={{ color: "#333" }}>FOCUS: </span>{session.focus}
                </div>
              </div>

              {/* Exercise list */}
              <div style={{ padding: "0 24px" }}>
                {session.exercises.map((ex, ei) => {
                  const logs = getProgressForEx(activePhase, activeSession, ex.id);
                  const isEditing = editingEx === ei;
                  const isExpanded = expandedEx === ei;

                  return (
                    <div key={ex.id} className="ex-row">
                      {/* Main row */}
                      <div className="exercise-grid">
                        <span style={{ fontSize: 9, color: "#2a2a2a", textAlign: "right" }}>{String(ei + 1).padStart(2, "0")}</span>

                        {isEditing ? (
                          <input value={ex.name} onChange={(e) => updateExercise(activePhase, activeSession, ei, "name", e.target.value)} autoFocus />
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 12.5, color: "#ccc" }}>{ex.name}</span>
                            {logs.length > 0 && (
                              <span className="progress-badge">{logs.length} log{logs.length > 1 ? "s" : ""}</span>
                            )}
                          </div>
                        )}

                        {isEditing ? (
                          <input value={ex.sets} onChange={(e) => updateExercise(activePhase, activeSession, ei, "sets", e.target.value)} placeholder="Sets" />
                        ) : (
                          <span style={{ fontSize: 12, color: "#777" }}>{ex.sets}</span>
                        )}

                        {isEditing ? (
                          <input value={ex.reps} onChange={(e) => updateExercise(activePhase, activeSession, ei, "reps", e.target.value)} placeholder="Reps" />
                        ) : (
                          <span style={{ fontSize: 12, color: "#777" }}>{ex.reps}</span>
                        )}

                        {isEditing ? (
                          <input value={ex.load} onChange={(e) => updateExercise(activePhase, activeSession, ei, "load", e.target.value)} placeholder="Load" />
                        ) : (
                          <span style={{ fontSize: 11, color: "#555" }}>{ex.load}</span>
                        )}

                        {/* Actions */}
                        <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                          <button className="icon-btn" onClick={() => { setEditingEx(isEditing ? null : ei); setExpandedEx(null); }} title={isEditing ? "Done" : "Edit"}>
                            {isEditing ? "✓" : "✎"}
                          </button>
                          <button className="icon-btn" onClick={() => { setExpandedEx(isExpanded ? null : ei); setEditingEx(null); }} title="Notes / Log">
                            {isExpanded ? "▲" : "▼"}
                          </button>
                          <button className="icon-btn" onClick={() => moveExercise(activePhase, activeSession, ei, -1)} title="Move up">↑</button>
                          <button className="icon-btn danger" onClick={() => removeExercise(activePhase, activeSession, ei)} title="Remove">✕</button>
                        </div>
                      </div>

                      {/* Expanded panel */}
                      {isExpanded && (
                        <div style={{ paddingBottom: 16, paddingLeft: 30 }}>
                          {isEditing ? (
                            <textarea
                              value={ex.notes}
                              onChange={(e) => updateExercise(activePhase, activeSession, ei, "notes", e.target.value)}
                              placeholder="Coaching notes..."
                            />
                          ) : (
                            ex.notes && (
                              <div style={{ fontSize: 11.5, color: "#666", lineHeight: 1.65, marginBottom: 12, borderLeft: `2px solid ${phaseColor}`, paddingLeft: 12, fontStyle: "italic" }}>
                                {ex.notes}
                              </div>
                            )
                          )}

                          {/* Progress logs for this exercise */}
                          {logs.length > 0 && (
                            <div style={{ marginBottom: 10 }}>
                              <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "#333", marginBottom: 6 }}>PROGRESS LOG</div>
                              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                {logs.slice(-5).reverse().map((l) => (
                                  <div key={l.id} style={{ fontSize: 11, color: "#666", display: "flex", gap: 12 }}>
                                    <span style={{ color: "#444" }}>{l.date}</span>
                                    <span>Wk {l.week}</span>
                                    {l.weight && <span>{l.weight}</span>}
                                    {l.reps && <span>{l.reps} reps</span>}
                                    {l.notes && <span style={{ color: "#444" }}>{l.notes}</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <button
                            className="ghost-btn"
                            style={{ fontSize: 10, marginTop: 4 }}
                            onClick={() => {
                              setLogTarget({ phaseIdx: activePhase, session: activeSession, exId: ex.id, exName: ex.name });
                              setLogForm({ week: "", weight: "", reps: "", notes: "" });
                            }}
                          >
                            + Log Session
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Add exercise */}
                <div style={{ padding: "14px 0" }}>
                  <button
                    className="ghost-btn"
                    style={{ fontSize: 10, borderStyle: "dashed" }}
                    onClick={() => addExercise(activePhase, activeSession)}
                  >
                    + Add Exercise
                  </button>
                </div>
              </div>

              {/* Science note */}
              <div style={{ margin: "8px 24px 32px", background: "#0d0d0d", borderLeft: `2px solid ${phaseColor}`, padding: "14px 16px" }}>
                <div style={{ fontSize: 9, letterSpacing: "0.15em", color: phaseColor, marginBottom: 5 }}>SCIENCE NOTE</div>
                <div style={{ fontSize: 11, color: "#666", lineHeight: 1.7, fontStyle: "italic" }}>{phase.scienceNote}</div>
              </div>
              </div>
            </div>
          </div>
        )}

        {view === "progress" && (
          <div className="progress-view" style={{ padding: "24px 24px" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.1em", marginBottom: 4 }}>PROGRESS LOG</div>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 24 }}>All logged sessions across the program.</div>

            {allProgressEntries.length === 0 ? (
              <div style={{ color: "#333", fontSize: 12, padding: "40px 0", textAlign: "center", letterSpacing: "0.1em" }}>
                NO LOGS YET — EXPAND AN EXERCISE TO LOG A SESSION
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {allProgressEntries.map((e) => (
                    <div key={e.id} className="progress-entry" style={{ "--progress-color": e.phaseColor }}>
                    <span style={{ color: "#444" }}>{e.date}</span>
                    <span style={{ fontSize: 9, color: e.phaseColor, letterSpacing: "0.08em" }}>{e.phaseName}</span>
                    <span style={{ fontSize: 9, color: "#444", letterSpacing: "0.06em" }}>{e.session}</span>
                    <span style={{ color: "#aaa" }}>{e.exName}</span>
                    <span style={{ color: "#666" }}>
                      {e.weight && `${e.weight} `}{e.reps && `× ${e.reps}`}{e.week && ` — Wk ${e.week}`}
                    </span>
                    <span style={{ color: "#444", fontStyle: "italic" }}>{e.notes}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Per-exercise progress charts (simple text-based) */}
            {allProgressEntries.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#333", marginBottom: 16 }}>BY EXERCISE</div>
                {Object.entries(
                  allProgressEntries.reduce((acc, e) => {
                    if (!acc[e.exName]) acc[e.exName] = [];
                    acc[e.exName].push(e);
                    return acc;
                  }, {})
                ).map(([name, entries]) => (
                  <div key={name} className="progress-group">
                    <div style={{ fontSize: 12, color: "#ccc", marginBottom: 8 }}>{name}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {entries.map((e) => (
                        <div key={e.id} style={{ display: "flex", gap: 16, fontSize: 11, color: "#555" }}>
                          <span>{e.date}</span>
                          <span style={{ color: "#777" }}>{e.weight && `${e.weight} `}{e.reps && `× ${e.reps}`}</span>
                          {e.notes && <span style={{ fontStyle: "italic" }}>{e.notes}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Log Modal */}
      {logTarget && (
        <div className="modal-overlay" onClick={() => setLogTarget(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ "--phase-color": phaseColor }}>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#444", marginBottom: 4 }}>LOG SESSION</div>
            <div style={{ fontSize: 14, color: "#ccc", marginBottom: 20 }}>{logTarget.exName}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.12em", marginBottom: 4 }}>WEEK *</div>
                <input
                  type="number"
                  placeholder="1–12"
                  min="1"
                  max="12"
                  value={logForm.week}
                  onChange={(e) => setLogForm({ ...logForm, week: e.target.value })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.12em", marginBottom: 4 }}>WEIGHT / LOAD</div>
                  <input placeholder="e.g. 185lbs, BW, 30kg" value={logForm.weight} onChange={(e) => setLogForm({ ...logForm, weight: e.target.value })} />
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.12em", marginBottom: 4 }}>REPS / SETS DONE</div>
                  <input placeholder="e.g. 5x3, 8" value={logForm.reps} onChange={(e) => setLogForm({ ...logForm, reps: e.target.value })} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.12em", marginBottom: 4 }}>NOTES</div>
                <textarea placeholder="How did it feel? PR? Form notes..." value={logForm.notes} onChange={(e) => setLogForm({ ...logForm, notes: e.target.value })} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button className="primary-btn" style={{ "--phase-color": phaseColor }} onClick={logEntry}>Log It</button>
              <button className="ghost-btn" onClick={() => setLogTarget(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
