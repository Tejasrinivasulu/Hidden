"use client";
/* ═══════════════════════════════════════════════════════════════════════
   TeamsSketchbook — React component
   Ported 1:1 from ThreeUI meng-to-sketchbook.html canonical source.
   All animation state lives in refs (zero React re-renders during 60fps).
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useRef, useCallback } from "react";

const DIR = "/teams-sketchbook/";
const PAGES = [
  {
    file: "poster-team.jpg",
    title: "Design & Posters",
    place: "Creative Identity",
    plate: "PLATE 01",
    category: "VISUAL & CAMPAIGNS",
    tagline: "Make them stop. Make them look.",
    description: "Every event has a story. We give that story a visual identity — turning concepts into posters, announcements, campaigns, and visuals that speak before a single word is read.",
    actionLabel: "✦ Creating",
    skills: ["Posters", "Campaigns", "Social Creatives", "Visual Identity"],
  },
  {
    file: "drafting-team.jpg",
    title: "Drafting",
    place: "Editorial",
    plate: "PLATE 02",
    category: "VOICE & COMMUNICATIONS",
    tagline: "Ideas are everywhere. Words give them direction.",
    description: "From the first announcement to the final caption, the Drafting Team gives ISTE its voice — turning rough thoughts into messages people understand, remember, and actually want to read.",
    actionLabel: "✦ We Write",
    skills: ["Announcements", "Captions", "Invitations", "Campaign Copy", "Scripts"],
  },
  {
    file: "documentation-team.jpg",
    title: "Documentation",
    place: "Archival",
    plate: "PLATE 03",
    category: "RECORDS & ARCHIVES",
    tagline: "Because great moments deserve a record.",
    description: "An event ends. The lights go off. Everyone goes home. We make sure the story doesn't end there — capturing, organizing, and preserving the work, events, and milestones that shape ISTE.",
    actionLabel: "✦ Capturing",
    skills: ["Reports", "Records", "Archives", "Event Stories", "Highlights"],
  },
  {
    file: "social-media-team.jpg",
    title: "Media & Content",
    place: "Production",
    plate: "PLATE 04",
    category: "MEDIA & PR",
    tagline: "Don't just tell the story. Show it.",
    description: "A room full of people. A speaker on stage. A team celebrating after an event. We turn moments like these into content that keeps the energy alive long after the event is over.",
    actionLabel: "✦ We Create",
    skills: ["Photography", "Reels", "Videos", "Highlights", "Social Content"],
  },
  {
    file: "webdev-team.jpg",
    title: "Web Development",
    place: "Engineering",
    plate: "PLATE 05",
    category: "INTERACTIVE & TECH",
    tagline: "Where ideas become interactive.",
    description: "A thought becomes a design. A design becomes a website. And suddenly, the idea is alive. The Web Development Team builds responsive interfaces and digital experiences people want to explore.",
    actionLabel: "✦ Building",
    skills: ["Websites", "Interfaces", "Interactions", "Digital Experiences"],
  },
  {
    file: "management-team.jpg",
    title: "Core Team",
    place: "Leadership",
    plate: "PLATE 06",
    category: "STRATEGY & EXECUTION",
    tagline: "Ideas need people who make them happen.",
    description: "Behind every event is a hundred little decisions. The Core Team connects the dots — people, teams, ideas, timelines, and execution — turning plans on paper into experiences people remember.",
    actionLabel: "✦ Making It Happen",
    skills: ["Planning", "Coordination", "Leadership", "Execution", "Collaboration"],
  },
];
const M = PAGES.length;

export default function TeamsSketchbook() {
  const rootRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  // ─── boot the vanilla engine inside useEffect ─────────────────────
  const boot = useCallback((root: HTMLDivElement) => {
    const N = 18;           // strips
    const SPAN = 0.449;
    const BETA = 0.60;

    let idx = 0;
    type Turn = { dir: string; from: number; to: number; t: number } | null;
    let turn: Turn = null;
    let strips: HTMLDivElement[] = [];

    const stage = root.querySelector<HTMLDivElement>("#sbStage")!;
    const sb3d  = root.querySelector<HTMLDivElement>("#sb3d")!;
    const book  = root.querySelector<HTMLDivElement>("#sbBook")!;
    const capBox= root.querySelector<HTMLDivElement>("#sbCaptions")!;
    const hint  = root.querySelector<HTMLParagraphElement>("#sbHint")!;
    const REDUCED = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function getPageSrc(i: number) {
      return DIR + PAGES[i].file;
    }

    function journalOverlayEl(i: number) {
      const d = el("div", "sb-journal-overlay") as HTMLDivElement;
      const t = PAGES[i];
      d.innerHTML = `
        <div class="jo-page">
          <div class="jo-content">
            <div class="jo-header">
              <span class="jo-plate-stamp">${t.plate}</span>
              <span class="jo-dept-mark">§ ${t.category}</span>
            </div>
            <div class="jo-rule"></div>
            <h3 class="jo-title">${t.title}</h3>
            <p class="jo-tagline"><em>"${t.tagline}"</em></p>
            <div class="jo-entry">
              <span class="jo-entry-label">✦ Story &amp; Purpose</span>
              <p class="jo-entry-text">${t.description}</p>
            </div>
            <div class="jo-entry">
              <span class="jo-entry-label">${t.actionLabel}</span>
              <ul class="jo-ledger">
                ${t.skills.map(s => `<li class="jo-ledger-item"><span class="jo-bullet">·</span> ${s}</li>`).join("")}
              </ul>
            </div>
          </div>
          <div class="jo-footer">
            <span class="jo-stamp-text">ISTE · MBU · Student Chapter</span>
          </div>
        </div>
      `;
      return d;
    }

    function el(t: string, c?: string) {
      const e = document.createElement(t);
      if (c) e.className = c;
      return e;
    }
    function imgEl(i: number, side: string) {
      const im = new Image();
      im.className = "sb-half-img " + side;
      im.draggable = false;
      im.alt = "";
      im.src = getPageSrc(i);
      return im;
    }
    function halfEl(pos: string, i: number) {
      const d = el("div", "sb-half " + pos);
      d.appendChild(imgEl(i, pos));
      d.appendChild(el("div", "gutter-shade " + pos));
      return d;
    }

    function buildCurl(dir: string, from: number, to: number) {
      strips = [];
      const c = el("div", "curl " + dir) as HTMLDivElement;
      c.style.setProperty("--n", String(N));
      c.style.setProperty("--span", String(SPAN));
      let host: HTMLElement = c;
      for (let i = 0; i < N; i++) {
        const s = el("div", "strip") as HTMLDivElement;
        s.style.setProperty("--i", String(i));
        const gut = "calc(var(--bw) * 0.5)";
        const sw = "calc(var(--bw) * " + SPAN + " / " + N + ")";
        const A = "calc(-1 * (" + gut + " + " + i + " * " + sw + "))";
        const B = "calc(" + (i + 1) + " * " + sw + " - " + gut + ")";
        const f = el("div", "face front"), b = el("div", "face back");
        const dress = (e: HTMLElement, url: string, px: string) => {
          e.style.backgroundImage = "url(" + url + ")";
          e.style.backgroundPositionX = px;
        };
        dress(f, getPageSrc(from), dir === "next" ? A : B);
        dress(b, getPageSrc(to), dir === "next" ? B : A);
        f.appendChild(el("div", "sh")); f.appendChild(el("div", "gl"));
        b.appendChild(el("div", "sh")); b.appendChild(el("div", "gl"));
        s.appendChild(f); s.appendChild(b);
        if (i === N - 1) s.classList.add("edge");
        host.appendChild(s); host = s;
        strips.push(s as HTMLDivElement);
      }
      return c;
    }

    function applyTurn(t: number) {
      const th = Math.PI * t;
      const beta = BETA * Math.sin(Math.PI * t);
      const D = 180 / Math.PI;
      const tt = th + beta, td = 2 * beta / N;
      sb3d.style.setProperty("--tt", (tt * D).toFixed(2) + "deg");
      sb3d.style.setProperty("--td", (td * D).toFixed(3) + "deg");
      sb3d.style.setProperty("--shade", Math.sin(Math.PI * t).toFixed(3));
      fadeCaption(t);
      for (let i = 0; i < strips.length; i++) {
        const l1 = Math.abs(Math.cos(tt - i * td));
        const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
        const st = strips[i].style;
        st.setProperty("--lit", l1.toFixed(3));
        st.setProperty("--a1", ((1 - l1) * .62).toFixed(3));
        st.setProperty("--a2", ((1 - l2) * .62).toFixed(3));
      }
    }

    function paint() {
      book.textContent = "";
      if (!turn) {
        const f = el("div", "sb-full");
        const im = new Image();
        im.src = getPageSrc(idx);
        im.alt = PAGES[idx].title;
        im.draggable = false;
        f.appendChild(im);
        book.appendChild(f);
        book.appendChild(journalOverlayEl(idx));
        sb3d.style.setProperty("--shade", "0");
      } else {
        const next = turn.dir === "next";
        book.appendChild(halfEl("left", next ? turn.from : turn.to));
        book.appendChild(halfEl("right", next ? turn.to : turn.from));
        book.appendChild(buildCurl(turn.dir, turn.from, turn.to));
        applyTurn(turn.t);
      }
      const a = el("button", "sb-zone sb-prev"), b = el("button", "sb-zone sb-next");
      a.setAttribute("aria-label", "previous page");
      b.setAttribute("aria-label", "next page");
      book.appendChild(a); book.appendChild(b);
      layout();
      caption();
      marks();
      syncZoomLayer();
      placeLoupe();
    }

    let capOut: HTMLElement | null = null, capIn: HTMLElement | null = null;
    function caption() {
      capBox.textContent = "";
      capOut = capIn = null;
      if (turn) {
        capOut = el("p", "sb-caption live") as HTMLElement;
        capOut.textContent = PAGES[turn.from].title;
        capBox.appendChild(capOut);
        capIn = el("p", "sb-caption live") as HTMLElement;
        capIn.textContent = PAGES[turn.to].title;
        capBox.appendChild(capIn);
        fadeCaption(turn.t);
      } else {
        const p = el("p", "sb-caption");
        p.textContent = PAGES[idx].title;
        capBox.appendChild(p);
      }
    }
    function fadeCaption(t: number) {
      if (!capOut || !capIn) return;
      const out = 1 - Math.max(0, Math.min(1, (t - 0.10) / 0.28));
      const inn = Math.max(0, Math.min(1, (t - 0.56) / 0.30));
      capOut.style.opacity = out.toFixed(3);
      capIn.style.opacity = inn.toFixed(3);
    }
    function layout() {
      sb3d.style.setProperty("--bw", book.clientWidth + "px");
    }

    // ─── spring loop ────────────────────────────────────────────────
    type Spring = {
      kind: string; v?: number; target: number; done?: (() => void) | null;
      k?: number; c?: number; from?: number; dur?: number; e?: number;
    } | null;
    let spring: Spring = null;

    function animateTo(target: number, onDone?: () => void, stiff?: number, damp?: number) {
      spring = { kind: "spring", v: 0, target, done: onDone, k: stiff || 150, c: damp || 22 };
      kick();
    }

    let raf: number | null = null, last = 0;
    function tick(now: number) {
      raf = null;
      const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
      last = now;
      if (spring && turn) {
        const s = spring;
        if (s.kind === "tween") {
          s.e = (s.e || 0) + dt;
          const k = Math.min(1, s.e / (s.dur || 1));
          turn.t = (s.from || 0) + (s.target - (s.from || 0)) * k;
          applyTurn(turn.t);
          if (k >= 1) {
            spring = null;
            if (s.done) s.done();
          }
        } else {
          const x = turn.t - s.target;
          s.v = (s.v || 0) + (-(s.k || 150) * x - (s.c || 22) * (s.v || 0)) * dt;
          turn.t += (s.v || 0) * dt;
          turn.t = Math.max(0, Math.min(1, turn.t));
          if (Math.abs(turn.t - s.target) < 0.005 && Math.abs(s.v || 0) < 0.05) {
            turn.t = s.target;
            spring = null;
            applyTurn(turn.t);
            if (s.done) s.done();
          } else {
            applyTurn(turn.t);
          }
        }
      }
      viewSpring();
      const lmoved = loupeEase();
      if ((spring || viewActive || lmoved) && raf === null) raf = requestAnimationFrame(tick);
    }
    function kick() { if (raf === null) { last = performance.now(); raf = requestAnimationFrame(tick); } }

    // ─── tilt + zoom ────────────────────────────────────────────────
    const TILT_X = 4.5, TILT_Y = 7;
    const ZOOM_MIN = 0.6, ZOOM_MAX = 1.4;
    const view = { rx: 0, ry: 0, z: 0.8, trx: 0, try_: 0, tz: 0.8 };
    let viewActive = false;
    let lastZ = 0.8;

    function applyView() {
      sb3d.style.setProperty("--rx", view.rx.toFixed(2) + "deg");
      sb3d.style.setProperty("--ry", view.ry.toFixed(2) + "deg");
      sb3d.style.setProperty("--zoom", view.z.toFixed(3));
      if (view.z !== lastZ) { lastZ = view.z; placeLoupe(); }
    }
    function viewSpring() {
      const e = 0.14;
      let moved = false;
      for (const [k, t] of [["rx", "trx"], ["ry", "try_"], ["z", "tz"]] as const) {
        const d = (view as Record<string, number>)[t] - (view as Record<string, number>)[k];
        if (Math.abs(d) > 0.0006) { (view as Record<string, number>)[k] += d * e; moved = true; }
        else (view as Record<string, number>)[k] = (view as Record<string, number>)[t];
      }
      if (moved) applyView();
      viewActive = moved;
      return moved;
    }
    function setView(rx: number, ry: number, z: number) {
      view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
      view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
      view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
      viewActive = true; kick();
      syncZoom();
    }
    function tiltTo(cx: number, cy: number) {
      if (drag) return;
      const r = book.getBoundingClientRect();
      if (!r.width) return;
      const nx = Math.max(-1, Math.min(1, (cx - (r.left + r.width / 2)) / (r.width * 0.62)));
      const ny = Math.max(-1, Math.min(1, (cy - (r.top + r.height / 2)) / (r.height * 0.9)));
      setView(-ny * TILT_X, nx * TILT_Y, view.tz);
    }

    // ─── pointer work ───────────────────────────────────────────────
    type Drag = { dir: string; x0: number; w: number; moved: number; vel: number; tPrev: number } | null;
    let drag: Drag = null;
    function bookRect() { return book.getBoundingClientRect(); }
    function hideHint() { hint.classList.add("gone"); }

    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0) return;
      e.preventDefault();
      const onBook = (e.target as HTMLElement).closest(".sb-zone");
      stage.setPointerCapture(e.pointerId);
      hideHint();
      if (!onBook) return;
      const r = bookRect();
      const dir = (e.clientX - r.left) / r.width > 0.5 ? "next" : "prev";
      startTurn(dir, 0);
      drag = { dir, x0: e.clientX, w: r.width, moved: 0, vel: 0, tPrev: performance.now() };
    }
    function onPointerMove(e: PointerEvent) {
      if (!drag) return;
      const dx = e.clientX - drag.x0;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      const raw = (drag.dir === "next" ? -dx : dx) / (drag.w * 0.62);
      const t = Math.max(0, Math.min(1, raw));
      const now = performance.now();
      drag.vel = (t - (turn ? turn.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
      drag.tPrev = now;
      if (turn) { turn.t = t; applyTurn(t); }
    }
    function endDrag() {
      if (!drag) return;
      const d = drag; drag = null;
      if (!turn) return;
      if (d.moved < 6) { commit(); return; }
      const go = turn.t > 0.42 || d.vel > 1.1;
      if (go) commit(); else cancel();
    }

    // ─── turn control ───────────────────────────────────────────────
    function startTurn(dir: string, t: number) {
      spring = null;
      if (turn) { idx = turn.to; turn = null; }
      root.classList.add("turning");
      shoveLoupe(dir);
      const from = idx;
      turn = { dir, from, to: dir === "next" ? (from + 1) % M : (from - 1 + M) % M, t: t || 0 };
      paint();
    }
    function commit() {
      if (!turn) return;
      if (REDUCED) { idx = turn.to; turn = null; root.classList.remove("turning"); paint(); return; }
      animateTo(1, () => { idx = turn!.to; turn = null; root.classList.remove("turning"); paint(); }, 170, 26);
      kick();
    }
    function cancel() {
      if (!turn) return;
      animateTo(0, () => { turn = null; root.classList.remove("turning"); paint(); }, 150, 24);
      kick();
    }
    function step(dir: string) {
      if (turn) {
        if (turn.t < 0.25) return;
        idx = turn.to;
        turn = null;
        root.classList.remove("turning");
        paint();
      }
      startTurn(dir, 0); commit();
    }

    // ─── loupe ──────────────────────────────────────────────────────
    const loupeEl = root.querySelector<HTMLDivElement>("#loupe")!;
    const zRead  = root.querySelector<HTMLSpanElement>("#zRead")!;
    const loupeBtn = root.querySelector<HTMLButtonElement>("#loupeBtn")!;
    const zInBtn  = root.querySelector<HTMLButtonElement>("#zIn")!;
    const zOutBtn = root.querySelector<HTMLButtonElement>("#zOut")!;
    const zoomWrap = root.querySelector<HTMLDivElement>("#zoomWrap")!;
    const zoomInner = root.querySelector<HTMLDivElement>("#zoomInner")!;
    const MAG = 2.3;
    let loupeOn = true, lx: number | null = null, ly: number | null = null;
    type LGrab = { cx: number; cy: number; lx0: number; ly0: number } | null;
    let lgrab: LGrab = null;
    type LTarget = { x: number; y: number } | null;
    let lTarget: LTarget = null;

    function loupeSize() { return Math.round(Math.max(165, Math.min(262, book.clientWidth * 0.235))); }
    function bookBox() { return { x: 0, y: 0, w: book.clientWidth, h: book.clientHeight }; }

    function restLoupe() {
      const b = bookBox();
      lx = b.x + b.w * 0.88; ly = b.y + b.h * 0.855;
      placeLoupe();
    }

    function syncZoomLayer() {
      if (!loupeOn || turn) return;
      zoomInner.textContent = "";
      for (const c of Array.from(book.children)) {
        if ((c as HTMLElement).classList.contains("sb-zone")) continue;
        zoomInner.appendChild(c.cloneNode(true));
      }
    }

    function placeLoupe() {
      if (lx === null || ly === null) return;
      const B = bookBox(), bw = B.w, bh = B.h;
      if (!bw) return;
      const R = loupeSize() / 2, bez = R * 2 * 0.058;
      loupeEl.style.setProperty("--lr", R * 2 + "px");
      loupeEl.style.transform = "translate3d(" + (lx - R).toFixed(1) + "px," + (ly - R).toFixed(1) + "px,0)";
      if (loupeOn) loupeEl.classList.add("on");

      const z = view.z, cx = bw / 2, cy = bh / 2;
      const x0 = cx + (bw * .051 - cx) * z, x1 = cx + (bw * .949 - cx) * z;
      const y0 = cy + (bh * .218 - cy) * z, y1 = cy + (bh * .782 - cy) * z;
      const nx = Math.max(x0, Math.min(lx, x1));
      const ny = Math.max(y0, Math.min(ly, y1));
      const inside = (lx > x0 && lx < x1 && ly > y0 && ly < y1)
        ? Math.min(lx - x0, x1 - lx, ly - y0, y1 - ly)
        : -Math.hypot(lx - nx, ly - ny);
      const k = Math.max(0, Math.min(1, (inside + R * 0.30) / (R * 0.55)));

      zoomWrap.style.opacity = (loupeOn ? k : 0).toFixed(3);
      if (k <= 0.002) return;
      const r = (R - bez).toFixed(1);
      const mask = "radial-gradient(circle " + r + "px at " + lx.toFixed(1) + "px " + ly.toFixed(1) + "px,"
        + "#000 calc(100% - 1px),transparent 100%)";
      zoomWrap.style.webkitMaskImage = mask;
      zoomWrap.style.maskImage = mask;
      const px = cx + (lx - cx) / z, py = cy + (ly - cy) / z, s = MAG * z;
      zoomInner.style.transform = "translate(" + (lx - px * s).toFixed(1) + "px," + (ly - py * s).toFixed(1) + "px) "
        + "scale(" + s.toFixed(4) + ")";
    }

    function shoveLoupe(dir: string) {
      if (!loupeOn || lx === null || ly === null || lgrab) return;
      const b = bookBox();
      const nx2 = (b.w / 2 + (lx - b.x - b.w / 2) / view.z) / b.w;
      const ny2 = (b.h / 2 + (ly - b.y - b.h / 2) / view.z) / b.h;
      if (nx2 < 0.02 || nx2 > 0.98 || ny2 < 0.17 || ny2 > 0.83) return;
      lTarget = { x: b.x + b.w * (dir === "next" ? 0.12 : 0.88), y: b.y + b.h * 0.855 };
      kick();
    }

    function loupeEase(): boolean {
      if (!lTarget) return false;
      if (lgrab) { lTarget = null; return false; }
      if (lx === null || ly === null) return false;
      const dx = lTarget.x - lx, dy = lTarget.y - ly;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        lx = lTarget.x; ly = lTarget.y; lTarget = null; placeLoupe(); return false;
      }
      lx += dx * 0.17; ly += dy * 0.17; placeLoupe();
      return true;
    }

    function onLoupeDown(e: PointerEvent) {
      if (!loupeOn || e.button !== 0) return;
      e.preventDefault(); e.stopPropagation();
      lTarget = null;
      lgrab = { cx: e.clientX, cy: e.clientY, lx0: lx!, ly0: ly! };
      loupeEl.classList.add("held");
      loupeEl.setPointerCapture(e.pointerId);
      hideHint();
    }
    function onLoupeMove(e: PointerEvent) {
      if (!lgrab) return;
      const b = bookBox(), R = loupeSize() / 2;
      lx = Math.max(b.x - R * 0.7, Math.min(b.x + b.w + R * 0.7, lgrab.lx0 + (e.clientX - lgrab.cx)));
      ly = Math.max(b.y - R * 0.7, Math.min(b.y + b.h + R * 1.0, lgrab.ly0 + (e.clientY - lgrab.cy)));
      placeLoupe();
    }
    function dropLoupe() { lgrab = null; loupeEl.classList.remove("held"); }

    function syncZoom() {
      zRead.textContent = Math.round(view.tz * 100) + "%";
      zOutBtn.disabled = view.tz <= ZOOM_MIN + 0.001;
      zInBtn.disabled = view.tz >= ZOOM_MAX - 0.001;
    }

    function marks() {}

    // ─── event wiring ───────────────────────────────────────────────
    const onResize = () => { layout(); lx = null; restLoupe(); };
    const onGlobalPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tiltTo(e.clientX, e.clientY);
    };
    const onGlobalPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setView(0, 0, view.tz);
    };
    const onBlur = () => setView(0, 0, view.tz);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault(); hideHint();
      step(e.key === "ArrowRight" ? "next" : "prev");
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("dragstart", (e: Event) => e.preventDefault());
    stage.addEventListener("dblclick", () => setView(view.trx, view.try_, 0.8));

    loupeEl.addEventListener("pointerdown", onLoupeDown);
    loupeEl.addEventListener("pointermove", onLoupeMove);
    loupeEl.addEventListener("pointerup", dropLoupe);
    loupeEl.addEventListener("pointercancel", dropLoupe);

    loupeBtn.onclick = () => {
      loupeOn = !loupeOn;
      loupeBtn.setAttribute("aria-pressed", String(loupeOn));
      loupeEl.classList.toggle("on", loupeOn);
      if (loupeOn && lx === null) restLoupe();
    };

    root.querySelector("#sbLeft")!.addEventListener("click", () => step("prev"));
    root.querySelector("#sbRight")!.addEventListener("click", () => step("next"));

    zInBtn.onclick = () => { setView(view.trx, view.try_, view.tz * 1.16); hideHint(); };
    zOutBtn.onclick = () => { setView(view.trx, view.try_, view.tz / 1.16); hideHint(); };



    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onGlobalPointerMove, { passive: true });
    window.addEventListener("pointerout", onGlobalPointerOut as EventListener);
    window.addEventListener("blur", onBlur);
    window.addEventListener("keydown", onKeyDown);

    // ─── boot ───────────────────────────────────────────────────────
    (async function run() {
      paint(); applyView();
      await Promise.all(PAGES.map(p => new Promise<void>(r => {
        const im = new Image();
        im.src = DIR + p.file;
        im.onload = () => r();
        im.onerror = () => r();
      })));

      if (document.fonts?.ready) await document.fonts.ready.catch(() => {});
      paint();
      syncZoom(); restLoupe();
      root.dataset.ready = "1";
    })();

    // ─── cleanup ────────────────────────────────────────────────────
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onGlobalPointerMove);
      window.removeEventListener("pointerout", onGlobalPointerOut as EventListener);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current || initRef.current) return;
    initRef.current = true;
    const cleanup = boot(rootRef.current);
    return cleanup;
  }, [boot]);

  return (
    <div className="sb-root" ref={rootRef}>
      <div className="wash" aria-hidden="true" />
      <main className="page home" style={{ position: "relative", zIndex: 1 }}>

        <header className="teams-header">
          <p className="hero-kicker">Indian Society for Technical Education · Student Chapter</p>
          <h2 className="teams-title">ISTE Teams</h2>
          <div className="title-accent" aria-hidden="true" />
        </header>

        <div className="hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="botany l" src="/teams-sketchbook/botany-left.png" alt="" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="botany r" src="/teams-sketchbook/botany-right.png" alt="" aria-hidden="true" />

          <div className="sb-wrap" id="sbWrap">
            <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
              <filter id="sb-mblur-1"><feGaussianBlur stdDeviation="5 0" /></filter>
              <filter id="sb-mblur-2"><feGaussianBlur stdDeviation="14 0" /></filter>
            </svg>
            <div className="sb-stage" id="sbStage">
              <button className="sb-arrow left" id="sbLeft" aria-label="previous page">
                <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
                  <polyline points="11,3 3,22 11,41" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="sb-3d" id="sb3d">
                <div className="sb-tilt" id="sbTilt">
                  <div className="sb-cast ambient" aria-hidden="true" />
                  <div className="sb-cast contact" aria-hidden="true" />
                  <div className="sb-cast hair" aria-hidden="true" />
                  <div className="sb-book" id="sbBook" />
                </div>
                <div className="zoomwrap" id="zoomWrap" aria-hidden="true">
                  <div className="zoominner" id="zoomInner" />
                </div>
                <div className="loupe" id="loupe">
                  <span className="grip" />
                  <span className="ring">
                    <span className="lens" id="loupeLens">
                      <span className="mag" id="loupeMag" />
                    </span>
                  </span>
                </div>
              </div>
              <button className="sb-arrow right" id="sbRight" aria-label="next page">
                <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
                  <polyline points="3,3 11,22 3,41" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="sb-captions" id="sbCaptions" />
            <div className="sb-tools" role="group" aria-label="view controls">
              <button className="tool" id="zOut" aria-label="zoom out">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="8.6" cy="8.6" r="5.6" /><path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8" />
                </svg>
              </button>
              <span className="zoom-read" id="zRead">80%</span>
              <button className="tool" id="zIn" aria-label="zoom in">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="8.6" cy="8.6" r="5.6" /><path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8M8.6 6.2v4.8" />
                </svg>
              </button>
              <span className="tool-sep" aria-hidden="true" />
              <button className="tool" id="loupeBtn" aria-label="magnifier" aria-pressed="true">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="8.8" cy="8.8" r="5.8" /><path d="M13 13l4.4 4.4" />
                  <path d="M6.4 7.2a3.2 3.2 0 0 1 2.4-1.4" opacity=".55" />
                </svg>
              </button>
            </div>
            <p className="sb-hint" id="sbHint">Drag the page to turn · Drag the glass across it</p>
          </div>
        </div>

        <p className="foot">ISTE · Student Chapter · Teams</p>
      </main>
    </div>
  );
}
