"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";

const DIR = "/teams-sketchbook/";
const N = 18;
const SPAN = 0.449;
const BETA = 0.6;
const TILT_X = 4.5;
const TILT_Y = 7;

const PAGES = [
  { file: "poster-team.png", title: "Poster Team" },
  { file: "drafting-team.png", title: "Drafting Team" },
  { file: "documentation-team.png", title: "Documentation Team" },
  { file: "management-team.png", title: "Management Team" },
  { file: "scheduling-team.png", title: "Scheduling Team" },
  { file: "social-media-team.png", title: "Social Media Team" },
  { file: "webdev-team.png", title: "Web Development Team" },
] as const;

const M = PAGES.length;

function pageSrc(i: number) {
  return DIR + PAGES[((i % M) + M) % M].file;
}

type Turn = { dir: "next" | "prev"; from: number; to: number; t: number };

type Drag = {
  dir: "next" | "prev";
  x0: number;
  w: number;
  moved: number;
  vel: number;
  tPrev: number;
};

function CurlLeaf({
  dir,
  from,
  to,
  t,
}: {
  dir: "next" | "prev";
  from: number;
  to: number;
  t: number;
}) {
  const th = Math.PI * t;
  const beta = BETA * Math.sin(Math.PI * t);
  const D = 180 / Math.PI;
  const tt = th + beta;
  const td = (2 * beta) / N;
  const shade = Math.sin(Math.PI * t);

  const strips = Array.from({ length: N }, (_, i) => {
    const gut = "calc(var(--bw) * 0.5)";
    const sw = `calc(var(--bw) * ${SPAN} / ${N})`;
    const A = `calc(-1 * (${gut} + ${i} * ${sw}))`;
    const B = `calc(${i + 1} * ${sw} - ${gut})`;
    const l1 = Math.abs(Math.cos(tt - i * td));
    const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
    return {
      i,
      frontPx: dir === "next" ? A : B,
      backPx: dir === "next" ? B : A,
      lit: l1,
      a1: (1 - l1) * 0.62,
      a2: (1 - l2) * 0.62,
      isEdge: i === N - 1,
    };
  });

  let tree: ReactNode = null;
  for (let i = N - 1; i >= 0; i--) {
    const s = strips[i];
    tree = (
      <div
        key={s.i}
        className={`strip${s.isEdge ? " edge" : ""}`}
        style={
          {
            "--i": s.i,
            "--lit": s.lit.toFixed(3),
            "--a1": s.a1.toFixed(3),
            "--a2": s.a2.toFixed(3),
          } as CSSProperties
        }
      >
        <div
          className="face front"
          style={{
            backgroundImage: `url(${pageSrc(from)})`,
            backgroundPositionX: s.frontPx,
          }}
        >
          <div className="sh" />
          <div className="gl" />
        </div>
        <div
          className="face back"
          style={{
            backgroundImage: `url(${pageSrc(to)})`,
            backgroundPositionX: s.backPx,
          }}
        >
          <div className="sh" />
          <div className="gl" />
        </div>
        {tree}
      </div>
    );
  }

  return (
    <div
      className={`curl ${dir}`}
      style={
        {
          "--n": N,
          "--span": SPAN,
          "--tt": `${(tt * D).toFixed(2)}deg`,
          "--td": `${(td * D).toFixed(3)}deg`,
          "--shade": shade.toFixed(3),
        } as CSSProperties
      }
    >
      {tree}
    </div>
  );
}

export default function TeamsSketchbook() {
  const [idx, setIdx] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [turning, setTurning] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const sb3dRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const turnRef = useRef<Turn | null>(null);
  const idxRef = useRef(0);
  const springRef = useRef<{
    v: number;
    target: number;
    k: number;
    c: number;
    done: (() => void) | null;
  } | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const viewRef = useRef({
    rx: 0,
    ry: 0,
    z: 0.8,
    trx: 0,
    try_: 0,
    tz: 0.8,
  });
  const viewActiveRef = useRef(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    turnRef.current = turn;
    if (turn) {
      sb3dRef.current?.style.setProperty(
        "--shade",
        Math.sin(Math.PI * turn.t).toFixed(3)
      );
    } else {
      sb3dRef.current?.style.setProperty("--shade", "0");
    }
  }, [turn]);

  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  const layout = useCallback(() => {
    const book = bookRef.current;
    const sb3d = sb3dRef.current;
    if (!book || !sb3d) return;
    sb3d.style.setProperty("--bw", `${book.clientWidth}px`);
  }, []);

  const applyView = useCallback(() => {
    const sb3d = sb3dRef.current;
    if (!sb3d) return;
    const v = viewRef.current;
    sb3d.style.setProperty("--rx", `${v.rx.toFixed(2)}deg`);
    sb3d.style.setProperty("--ry", `${v.ry.toFixed(2)}deg`);
    sb3d.style.setProperty("--zoom", v.z.toFixed(3));
  }, []);

  const viewSpring = useCallback(() => {
    const view = viewRef.current;
    const e = 0.14;
    let moved = false;
    for (const [k, t] of [
      ["rx", "trx"],
      ["ry", "try_"],
      ["z", "tz"],
    ] as const) {
      const d = view[t] - view[k];
      if (Math.abs(d) > 0.0006) {
        view[k] += d * e;
        moved = true;
      } else {
        view[k] = view[t];
      }
    }
    if (moved) applyView();
    viewActiveRef.current = moved;
    return moved;
  }, [applyView]);

  const kick = useCallback(() => {
    const tick = (now: number) => {
      rafRef.current = null;
      const dt = Math.min(0.032, (now - lastRef.current) / 1000 || 0.016);
      lastRef.current = now;
      const spring = springRef.current;
      const current = turnRef.current;
      if (spring && current) {
        const x = current.t - spring.target;
        spring.v += (-spring.k * x - spring.c * spring.v) * dt;
        current.t += spring.v * dt;
        current.t = Math.max(0, Math.min(1, current.t));
        if (
          Math.abs(current.t - spring.target) < 0.005 &&
          Math.abs(spring.v) < 0.05
        ) {
          current.t = spring.target;
          springRef.current = null;
          setTurn({ ...current });
          const done = spring.done;
          if (done) done();
        } else {
          setTurn({ ...current });
        }
      }
      viewSpring();
      if (
        (springRef.current || viewActiveRef.current) &&
        rafRef.current === null
      ) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    if (rafRef.current === null) {
      lastRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [viewSpring]);

  const setView = useCallback(
    (rx: number, ry: number, z: number) => {
      const view = viewRef.current;
      view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
      view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
      view.tz = Math.max(0.6, Math.min(1.4, z));
      viewActiveRef.current = true;
      kick();
    },
    [kick]
  );

  const paintIdle = useCallback((nextIdx: number) => {
    setIdx(nextIdx);
    setTurn(null);
    setTurning(false);
    sb3dRef.current?.style.setProperty("--shade", "0");
  }, []);

  const startTurn = useCallback((dir: "next" | "prev", t = 0) => {
    springRef.current = null;
    const from = turnRef.current ? turnRef.current.to : idxRef.current;
    if (turnRef.current) {
      idxRef.current = turnRef.current.to;
      setIdx(turnRef.current.to);
    }
    setTurning(true);
    const next: Turn = {
      dir,
      from,
      to: dir === "next" ? (from + 1) % M : (from - 1 + M) % M,
      t,
    };
    turnRef.current = next;
    setTurn(next);
  }, []);

  const commit = useCallback(() => {
    const current = turnRef.current;
    if (!current) return;
    if (reduced) {
      paintIdle(current.to);
      return;
    }
    springRef.current = {
      v: 0,
      target: 1,
      k: 170,
      c: 26,
      done: () => {
        const t = turnRef.current;
        if (!t) return;
        paintIdle(t.to);
      },
    };
    kick();
  }, [kick, paintIdle, reduced]);

  const cancel = useCallback(() => {
    if (!turnRef.current) return;
    springRef.current = {
      v: 0,
      target: 0,
      k: 150,
      c: 24,
      done: () => {
        turnRef.current = null;
        setTurn(null);
        setTurning(false);
        sb3dRef.current?.style.setProperty("--shade", "0");
      },
    };
    kick();
  }, [kick]);

  const step = useCallback(
    (dir: "next" | "prev") => {
      if (turnRef.current) {
        if (turnRef.current.t < 0.25) return;
        paintIdle(turnRef.current.to);
      }
      startTurn(dir, 0);
      commit();
    },
    [commit, paintIdle, startTurn]
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const onBook = (e.target as HTMLElement).closest(".sb-zone");
    stageRef.current?.setPointerCapture(e.pointerId);
    if (!onBook || !bookRef.current) return;
    const r = bookRef.current.getBoundingClientRect();
    const dir: "next" | "prev" =
      (e.clientX - r.left) / r.width > 0.5 ? "next" : "prev";
    startTurn(dir, 0);
    dragRef.current = {
      dir,
      x0: e.clientX,
      w: r.width,
      moved: 0,
      vel: 0,
      tPrev: performance.now(),
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.x0;
    drag.moved = Math.max(drag.moved, Math.abs(dx));
    const raw = (drag.dir === "next" ? -dx : dx) / (drag.w * 0.62);
    const t = Math.max(0, Math.min(1, raw));
    const now = performance.now();
    const current = turnRef.current;
    drag.vel =
      (t - (current ? current.t : 0)) /
      Math.max(0.001, (now - drag.tPrev) / 1000);
    drag.tPrev = now;
    if (current) {
      current.t = t;
      setTurn({ ...current });
    }
  };

  const endDrag = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || !turnRef.current) return;
    if (drag.moved < 6) {
      commit();
      return;
    }
    const go = turnRef.current.t > 0.42 || drag.vel > 1.1;
    if (go) commit();
    else cancel();
  };

  useEffect(() => {
    layout();
    applyView();
    const onResize = () => layout();
    const onGlobalPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || dragRef.current || !bookRef.current)
        return;
      const r = bookRef.current.getBoundingClientRect();
      if (!r.width) return;
      const nx = Math.max(
        -1,
        Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.62))
      );
      const ny = Math.max(
        -1,
        Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9))
      );
      setView(-ny * TILT_X, nx * TILT_Y, viewRef.current.tz);
    };
    const onGlobalPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setView(0, 0, viewRef.current.tz);
    };
    const onBlur = () => setView(0, 0, viewRef.current.tz);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      e.preventDefault();
      step(e.key === "ArrowRight" ? "next" : "prev");
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onGlobalPointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", onGlobalPointerOut);
    window.addEventListener("blur", onBlur);
    window.addEventListener("keydown", onKeyDown);

    PAGES.forEach((p) => {
      const im = new Image();
      im.src = DIR + p.file;
    });

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onGlobalPointerMove);
      window.removeEventListener("pointerout", onGlobalPointerOut);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [applyView, layout, setView, step]);

  const leftIdx = turn ? (turn.dir === "next" ? turn.from : turn.to) : idx;
  const rightIdx = turn ? (turn.dir === "next" ? turn.to : turn.from) : idx;

  return (
    <div className={`sb-root${turning ? " turning" : ""}`} data-ready="1">
      <div className="wash" aria-hidden />
      <header className="teams-header">
        <motion.h2
          className="teams-title"
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Our Teams
        </motion.h2>
        <motion.div
          className="title-accent"
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </header>
      <main
        className="page home sketchbook-only"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="hero">
          <div className="sb-wrap">
            <div
              className="sb-stage"
              ref={stageRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onDragStart={(e) => e.preventDefault()}
              onDoubleClick={() =>
                setView(viewRef.current.trx, viewRef.current.try_, 0.8)
              }
            >
              <div className="sb-3d" ref={sb3dRef}>
                <div className="sb-tilt">
                  <div className="sb-cast ambient" aria-hidden />
                  <div className="sb-cast contact" aria-hidden />
                  <div className="sb-cast hair" aria-hidden />
                  <div className="sb-book" ref={bookRef}>
                    {!turn ? (
                      <div className="sb-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pageSrc(idx)}
                          alt={PAGES[idx].title}
                          draggable={false}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="sb-half left">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="sb-half-img left"
                            src={pageSrc(leftIdx)}
                            alt=""
                            draggable={false}
                          />
                          <div className="gutter-shade left" />
                        </div>
                        <div className="sb-half right">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="sb-half-img right"
                            src={pageSrc(rightIdx)}
                            alt=""
                            draggable={false}
                          />
                          <div className="gutter-shade right" />
                        </div>
                        <CurlLeaf
                          dir={turn.dir}
                          from={turn.from}
                          to={turn.to}
                          t={turn.t}
                        />
                      </>
                    )}
                    <button
                      type="button"
                      className="sb-zone sb-prev"
                      aria-label="previous page"
                    />
                    <button
                      type="button"
                      className="sb-zone sb-next"
                      aria-label="next page"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
