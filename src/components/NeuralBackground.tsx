import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Cycle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  color: string;
  history: Point[];
  maxLength: number;
  isDead: boolean;
  respawnTimer: number;
}

const CELL_SIZE = 40;
const MOUSE_INFLUENCE_RADIUS = 250;
const MAX_LOOKAHEAD = 15;
const RESPAWN_FRAMES = 180;
const SELF_COLLISION_SKIP = 20;

const CYCLE_COLORS = ['#38bdf8', '#fbbf24', '#c084fc', '#4ade80'] as const;

const snap = (val: number) => Math.floor(val / CELL_SIZE) * CELL_SIZE;

function createCycles(width: number, height: number): Cycle[] {
  const seeds: Array<Pick<Cycle, 'x' | 'y' | 'vx' | 'vy'>> = [
    { x: snap(width * 0.2), y: snap(height * 0.2), vx: 1, vy: 0 },
    { x: snap(width * 0.8), y: snap(height * 0.8), vx: -1, vy: 0 },
    { x: snap(width * 0.2), y: snap(height * 0.8), vx: 0, vy: -1 },
    { x: snap(width * 0.8), y: snap(height * 0.2), vx: 0, vy: 1 },
  ];
  return seeds.map((seed, id) => ({
    id,
    ...seed,
    speed: 1,
    color: CYCLE_COLORS[id],
    history: [],
    maxLength: 300,
    isDead: false,
    respawnTimer: 0,
  }));
}

export default function NeuralBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mousePosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  // Mouse tracking: write directly to the DOM (CSS vars + transforms) via rAF.
  // No React state = no re-renders while the cursor moves.
  useEffect(() => {
    let rafId = 0;
    let pendingUpdate = false;

    const applyUpdate = () => {
      pendingUpdate = false;
      const { x, y } = mousePosRef.current;
      const hovering = isHoveringRef.current;

      const spotlight = spotlightRef.current;
      if (spotlight) {
        spotlight.style.opacity = hovering ? '1' : '0';
        const mask = `radial-gradient(400px circle at ${x}px ${y}px, black, transparent)`;
        spotlight.style.setProperty('mask-image', mask);
        spotlight.style.setProperty('-webkit-mask-image', mask);
      }

      const glow = glowRef.current;
      if (glow) {
        glow.style.opacity = hovering ? '0.3' : '0';
        glow.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }
    };

    const scheduleUpdate = () => {
      if (pendingUpdate) return;
      pendingUpdate = true;
      rafId = requestAnimationFrame(applyUpdate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
      if (!isHoveringRef.current) isHoveringRef.current = true;
      scheduleUpdate();
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      scheduleUpdate();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Tron light cycles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId = 0;
    let isRunning = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Drawing coordinates are in CSS pixels, so bounds use innerWidth/innerHeight
    const viewW = () => window.innerWidth;
    const viewH = () => window.innerHeight;

    const cycles = createCycles(viewW(), viewH());

    const updateCycle = (cycle: Cycle, maxX: number, maxY: number, occupiedGrid: Set<string>) => {
      if (cycle.isDead) {
        cycle.respawnTimer--;
        if (cycle.respawnTimer <= 0) {
          cycle.x = snap(Math.random() * (viewW() - CELL_SIZE * 4) + CELL_SIZE * 2);
          cycle.y = snap(Math.random() * (viewH() - CELL_SIZE * 4) + CELL_SIZE * 2);
          const dirs = [
            { vx: cycle.speed, vy: 0 },
            { vx: -cycle.speed, vy: 0 },
            { vx: 0, vy: cycle.speed },
            { vx: 0, vy: -cycle.speed },
          ];
          const dir = dirs[Math.floor(Math.random() * dirs.length)];
          cycle.vx = dir.vx;
          cycle.vy = dir.vy;
          cycle.history = [];
          cycle.isDead = false;
        }
        return;
      }

      cycle.x += cycle.vx;
      cycle.y += cycle.vy;
      cycle.history.push({ x: cycle.x, y: cycle.y });
      if (cycle.history.length > cycle.maxLength) cycle.history.shift();

      let died = cycle.x <= 0 || cycle.x >= maxX || cycle.y <= 0 || cycle.y >= maxY;
      if (!died) {
        for (const other of cycles) {
          if (other.isDead) continue;
          const skip = other.id === cycle.id ? SELF_COLLISION_SKIP : 0;
          const end = other.history.length - skip;
          for (let i = 0; i < end; i++) {
            const p = other.history[i];
            if (Math.abs(p.x - cycle.x) < 2 && Math.abs(p.y - cycle.y) < 2) {
              died = true;
              break;
            }
          }
          if (died) break;
        }
      }

      if (died) {
        cycle.isDead = true;
        cycle.respawnTimer = RESPAWN_FRAMES;
        cycle.history = [];
        return;
      }

      // Turns only allowed on grid intersections
      if (cycle.x % CELL_SIZE === 0 && cycle.y % CELL_SIZE === 0) {
        const possibleDirs = [
          { vx: cycle.speed, vy: 0 },
          { vx: -cycle.speed, vy: 0 },
          { vx: 0, vy: cycle.speed },
          { vx: 0, vy: -cycle.speed },
        ].filter(d => !(d.vx === -cycle.vx && d.vy === -cycle.vy));

        const scores = possibleDirs.map(dir => {
          let score = 0;
          let cx = cycle.x;
          let cy = cycle.y;
          const stepX = Math.sign(dir.vx) * CELL_SIZE;
          const stepY = Math.sign(dir.vy) * CELL_SIZE;
          while (true) {
            cx += stepX;
            cy += stepY;
            if (cx <= 0 || cx >= maxX || cy <= 0 || cy >= maxY) break;
            if (occupiedGrid.has(`${Math.floor(cx / CELL_SIZE)},${Math.floor(cy / CELL_SIZE)}`)) break;
            score++;
            if (score > MAX_LOOKAHEAD) break;
          }

          if (isHoveringRef.current && score > 0) {
            const mPos = mousePosRef.current;
            const distToMouse = Math.hypot(cycle.x - mPos.x, cycle.y - mPos.y);
            if (distToMouse < MOUSE_INFLUENCE_RADIUS) {
              const nextX = cycle.x + stepX;
              const nextY = cycle.y + stepY;
              const newDist = Math.hypot(nextX - mPos.x, nextY - mPos.y);
              if (newDist < distToMouse) score += 100;
            }
          }

          return { dir, score };
        });

        const maxScore = Math.max(...scores.map(s => s.score));
        const bestOptions = scores.filter(s => s.score === maxScore);
        const straightOption = scores.find(s => s.dir.vx === cycle.vx && s.dir.vy === cycle.vy);

        if (maxScore === 0) {
          const chosen = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
          cycle.vx = chosen.vx;
          cycle.vy = chosen.vy;
        } else if (!(straightOption && straightOption.score > 2 && Math.random() < 0.85)) {
          const chosen = bestOptions[Math.floor(Math.random() * bestOptions.length)];
          cycle.vx = chosen.dir.vx;
          cycle.vy = chosen.dir.vy;
        }
      }
    };

    const drawCycle = (cycle: Cycle) => {
      if (cycle.isDead || cycle.history.length < 2) return;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = cycle.color;

      // Single pass: draw soft outer glow for the full trail, then a thinner bright core.
      // Using a single path per pass (not per-segment) cuts draw calls from ~2N to 2.
      const len = cycle.history.length;

      // Outer glow
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cycle.history[0].x, cycle.history[0].y);
      for (let i = 1; i < len; i++) ctx.lineTo(cycle.history[i].x, cycle.history[i].y);
      ctx.stroke();

      // Inner core
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 1.5;
      ctx.stroke(); // reuses the current path

      ctx.globalAlpha = 1;

      // Head
      ctx.beginPath();
      ctx.arc(cycle.x, cycle.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.shadowColor = cycle.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, viewW(), viewH());

      const occupiedGrid = new Set<string>();
      for (const c of cycles) {
        if (c.isDead) continue;
        for (const p of c.history) {
          occupiedGrid.add(`${Math.floor(p.x / CELL_SIZE)},${Math.floor(p.y / CELL_SIZE)}`);
        }
      }

      const maxX = Math.floor(viewW() / CELL_SIZE) * CELL_SIZE;
      const maxY = Math.floor(viewH() / CELL_SIZE) * CELL_SIZE;

      for (const cycle of cycles) updateCycle(cycle, maxX, maxY, occupiedGrid);
      for (const cycle of cycles) drawCycle(cycle);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      isRunning = false;
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base faint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Tron canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 mix-blend-screen opacity-80" />

      {/* Spotlight grid (opacity + mask driven by rAF, not React state) */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Soft blue glow following cursor via transform (GPU-friendly) */}
      <div
        ref={glowRef}
        className="absolute rounded-full transition-opacity duration-500 blur-[80px]"
        style={{
          opacity: 0,
          width: '600px',
          height: '600px',
          left: 0,
          top: 0,
          transform: 'translate3d(-9999px, -9999px, 0)',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, transparent 60%)',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
