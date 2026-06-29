"use client";
import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS as C, TIME_PER_Q } from "../../lib/game";
import { joinRoom } from "../../lib/realtime";
import { RingsMark, Seam, PrimaryButton, pageBg, display, sans, spring, ease } from "../ui";

function uid() {
  return "p-" + Math.random().toString(36).slice(2, 9);
}

export default function PlayPage() {
  return (
    <Suspense fallback={<div style={pageBg} />}>
      <PlayInner />
    </Suspense>
  );
}

function PlayInner() {
  const params = useSearchParams();
  const roomFromUrl = params.get("room") || "";

  const [room, setRoom] = useState(roomFromUrl);
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [me] = useState(() => ({ id: uid() }));
  const [state, setState] = useState(null); // latest host snapshot
  const [myChoice, setMyChoice] = useState(null);
  const [answeredQ, setAnsweredQ] = useState(-1);
  const channelRef = useRef(null);
  const qStartRef = useRef(0);

  // connect once joined
  useEffect(() => {
    if (!joined || !room) return;
    const ch = joinRoom(room);
    channelRef.current = ch;
    ch.on("broadcast", { event: "state", payload: {} }, ({ payload }) => {
      setState((prev) => {
        // new question -> reset local answer state
        if (
          payload.phase === "question" &&
          (!prev || prev.qIndex !== payload.qIndex || prev.phase !== "question")
        ) {
          setMyChoice(null);
          qStartRef.current = Date.now();
        }
        return payload;
      });
    });
    ch.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        ch.send({ type: "broadcast", event: "join", payload: { id: me.id, name } });
        ch.send({ type: "broadcast", event: "hello", payload: { id: me.id } });
      }
    });
    return () => ch.unsubscribe();
  }, [joined, room, me.id, name]);

  const submitAnswer = useCallback(
    (choice) => {
      if (!state || state.phase !== "question") return;
      if (answeredQ === state.qIndex) return;
      const ms = Date.now() - qStartRef.current;
      setMyChoice(choice);
      setAnsweredQ(state.qIndex);
      channelRef.current?.send({
        type: "broadcast",
        event: "answer",
        payload: { id: me.id, qIndex: state.qIndex, choice, ms },
      });
    },
    [state, answeredQ, me.id]
  );

  // ── Join screen ──
  if (!joined) {
    const valid = name.trim().length >= 2 && room.trim().length >= 3;
    return (
      <div style={pageBg}>
        <Phone>
          <div style={{ textAlign: "center" }}>
            <RingsMark size={36} animated />
            <p style={{ fontFamily: sans, fontSize: 12, letterSpacing: 4, color: C.slate, textTransform: "uppercase", marginTop: 16 }}>Live at the Games</p>
            <h1 style={{ fontFamily: display, fontSize: 52, fontWeight: 600, color: C.white, marginTop: 8, lineHeight: 0.95 }}>
              Play the<br /><span style={{ color: C.gold, fontStyle: "italic" }}>Games</span>
            </h1>
          </div>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, marginTop: 36 }}>
            {!roomFromUrl && (
              <input
                value={room}
                onChange={(e) => setRoom(e.target.value.toUpperCase())}
                placeholder="Room code (e.g. OLY-4821)"
                style={inputStyle}
              />
            )}
            {roomFromUrl && (
              <p style={{ fontFamily: sans, fontSize: 13, color: C.slate, textAlign: "center" }}>
                Joining room <span style={{ color: C.gold }}>{room}</span>
              </p>
            )}
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 16))}
              onKeyDown={(e) => e.key === "Enter" && valid && setJoined(true)}
              placeholder="Enter your display name"
              style={inputStyle}
            />
            <PrimaryButton disabled={!valid} onClick={() => setJoined(true)}>
              Play as guest
            </PrimaryButton>
            <span style={{ fontFamily: sans, fontSize: 11.5, color: C.slate, textAlign: "center" }}>
              Guest mode · nothing to sign up for
            </span>
          </div>
        </Phone>
      </div>
    );
  }

  const phase = state?.phase || "lobby";
  const q = state?.question;
  const myRank = state?.leaderboard?.findIndex((p) => p.id === me.id);
  const myEntry = state?.leaderboard?.find((p) => p.id === me.id);

  return (
    <div style={pageBg}>
      <Phone>
        <AnimatePresence mode="wait">
          {phase === "lobby" && (
            <Centered key="wait">
              <RingsMark size={30} />
              <h2 style={{ fontFamily: display, fontSize: 34, color: C.white, fontWeight: 600, marginTop: 18 }}>You&apos;re in, {name}</h2>
              <Seam delay={0.2} />
              <p style={{ fontFamily: sans, fontSize: 15, color: C.mist, marginTop: 18 }}>Look up at the big screen.</p>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.slate, marginTop: 6 }}>The host will start the games shortly.</p>
              <PulsingDots />
            </Centered>
          )}

          {phase === "countdown" && (
            <Centered key="count">
              <h2 style={{ fontFamily: display, fontSize: 40, fontStyle: "italic", color: C.gold, fontWeight: 600 }}>Get ready…</h2>
              <p style={{ fontFamily: sans, fontSize: 14, color: C.slate, marginTop: 10 }}>Eyes on the screen</p>
            </Centered>
          )}

          {phase === "question" && q && (
            <motion.div key={`q-${state.qIndex}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease }} style={fillCol}>
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between", fontFamily: sans }}>
                <span style={{ fontSize: 11, letterSpacing: 2, color: C.slate, textTransform: "uppercase" }}>{q.format}</span>
                <span style={{ fontSize: 11, color: C.slate }}>{state.qIndex + 1} / {state.total}</span>
              </div>
              <h2 style={{ fontFamily: display, fontSize: 26, lineHeight: 1.15, fontWeight: 600, color: C.white, marginTop: 16, textAlign: "center" }}>{q.prompt}</h2>
              <div style={{ width: "100%", display: "grid", gridTemplateColumns: q.options.length === 2 ? "1fr 1fr" : "1fr", gap: 12, marginTop: 24 }}>
                {q.options.map((opt, i) => {
                  const picked = myChoice === i;
                  const locked = myChoice !== null;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => submitAnswer(i)}
                      whileTap={locked ? {} : { scale: 0.97 }}
                      animate={{ borderColor: picked ? C.gold : C.navySoft, background: picked ? "rgba(200,162,75,0.14)" : "rgba(255,255,255,0.03)", opacity: locked && !picked ? 0.45 : 1 }}
                      style={{ fontFamily: sans, fontSize: 17, fontWeight: 500, color: C.white, textAlign: q.options.length === 2 ? "center" : "left", padding: "18px 20px", borderRadius: 16, border: `1px solid ${C.navySoft}`, cursor: locked ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: q.options.length === 2 ? "center" : "space-between" }}
                    >
                      <span>{opt}</span>
                      {q.options.length !== 2 && <span style={{ color: C.slate, fontSize: 13 }}>{String.fromCharCode(65 + i)}</span>}
                    </motion.button>
                  );
                })}
              </div>
              {myChoice !== null && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: sans, fontSize: 14, color: C.gold, marginTop: 20, textAlign: "center" }}>
                  Locked in. Watch the screen.
                </motion.p>
              )}
            </motion.div>
          )}

          {phase === "reveal" && q && (
            <Centered key={`r-${state.qIndex}`}>
              {myChoice === q.answer ? (
                <>
                  <Badge ok />
                  <h2 style={{ fontFamily: display, fontSize: 34, fontStyle: "italic", color: C.gold, fontWeight: 600, marginTop: 14 }}>Correct</h2>
                </>
              ) : (
                <>
                  <Badge />
                  <h2 style={{ fontFamily: display, fontSize: 34, color: C.white, fontWeight: 600, marginTop: 14 }}>{myChoice === null ? "Too slow" : "Not quite"}</h2>
                </>
              )}
              <p style={{ fontFamily: sans, fontSize: 14, color: C.mist, marginTop: 8 }}>
                Answer: <span style={{ color: C.gold }}>{q.options[q.answer]}</span>
              </p>
              {myEntry && (
                <p style={{ fontFamily: display, fontStyle: "italic", fontSize: 26, color: C.white, marginTop: 16 }}>{myEntry.score.toLocaleString()} pts</p>
              )}
            </Centered>
          )}

          {phase === "leaderboard" && (
            <Centered key={`lb-${state.qIndex}`}>
              <p style={{ fontFamily: sans, fontSize: 12, letterSpacing: 3, color: C.slate, textTransform: "uppercase" }}>Standings</p>
              {myRank >= 0 && (
                <>
                  <h2 style={{ fontFamily: display, fontSize: 64, fontStyle: "italic", fontWeight: 600, color: C.gold, marginTop: 6 }}>#{myRank + 1}</h2>
                  <p style={{ fontFamily: sans, fontSize: 15, color: C.mist }}>of {state.leaderboard.length} players</p>
                  {myEntry && <p style={{ fontFamily: display, fontSize: 24, color: C.white, marginTop: 10 }}>{myEntry.score.toLocaleString()} pts</p>}
                </>
              )}
              <p style={{ fontFamily: sans, fontSize: 13, color: C.slate, marginTop: 20 }}>Full board is on the big screen.</p>
            </Centered>
          )}

          {phase === "podium" && (
            <Centered key="podium">
              <RingsMark size={28} animated />
              <h2 style={{ fontFamily: display, fontSize: 36, fontWeight: 600, color: C.white, marginTop: 14 }}>That&apos;s a wrap</h2>
              {myRank >= 0 && (
                <p style={{ fontFamily: sans, fontSize: 15, color: C.mist, marginTop: 8 }}>
                  You finished <span style={{ color: C.gold, fontWeight: 700 }}>#{myRank + 1}</span>
                  {myEntry ? ` · ${myEntry.score.toLocaleString()} pts` : ""}
                </p>
              )}
              <Seam delay={0.3} />
              <p style={{ fontFamily: display, fontStyle: "italic", fontSize: 20, color: C.white, marginTop: 22, textAlign: "center", lineHeight: 1.4 }}>
                Thanks for playing<br /><span style={{ color: C.gold }}>Play the Games.</span>
              </p>
            </Centered>
          )}
        </AnimatePresence>
      </Phone>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "18px 20px",
  borderRadius: 16,
  border: `1px solid ${C.navySoft}`,
  background: "rgba(255,255,255,0.04)",
  color: C.white,
  fontFamily: sans,
  fontSize: 17,
  outline: "none",
  textAlign: "center",
};

const fillCol = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: 30,
};

function Phone({ children }) {
  return (
    <div style={{ width: "100%", maxWidth: 430, minHeight: "100vh", padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );
}

function Centered({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%" }}>
      {children}
    </motion.div>
  );
}

function Badge({ ok }) {
  return (
    <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring} style={{ width: 76, height: 76, borderRadius: 999, background: ok ? "rgba(0,159,61,0.15)" : "rgba(200,16,46,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${ok ? "#009F3D" : C.red}` }}>
      <span style={{ fontSize: 36 }}>{ok ? "✓" : "✕"}</span>
    </motion.div>
  );
}

function PulsingDots() {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
      {[0, 1, 2].map((i) => (
        <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} style={{ width: 8, height: 8, borderRadius: 999, background: C.gold }} />
      ))}
    </div>
  );
}
