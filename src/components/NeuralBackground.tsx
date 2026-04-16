import { useEffect, useState, useRef } from 'react';

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

export default function NeuralBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  // Mouse tracking for the spotlight and AI interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!isHovering) {
        setIsHovering(true);
        isHoveringRef.current = true;
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      isHoveringRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovering]);

  // Tron Light Cycles Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const CELL_SIZE = 40;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Snap starting positions to the grid
    const snap = (val: number) => Math.floor(val / CELL_SIZE) * CELL_SIZE;

    const cycles: Cycle[] = [
      { id: 0, x: snap(canvas.width * 0.2), y: snap(canvas.height * 0.2), speed: 1, vx: 1, vy: 0, color: '#38bdf8', history: [], maxLength: 300, isDead: false, respawnTimer: 0 },
      { id: 1, x: snap(canvas.width * 0.8), y: snap(canvas.height * 0.8), speed: 1, vx: -1, vy: 0, color: '#fbbf24', history: [], maxLength: 300, isDead: false, respawnTimer: 0 },
      { id: 2, x: snap(canvas.width * 0.2), y: snap(canvas.height * 0.8), speed: 1, vx: 0, vy: -1, color: '#c084fc', history: [], maxLength: 300, isDead: false, respawnTimer: 0 },
      { id: 3, x: snap(canvas.width * 0.8), y: snap(canvas.height * 0.2), speed: 1, vx: 0, vy: 1, color: '#4ade80', history: [], maxLength: 300, isDead: false, respawnTimer: 0 }
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Build occupied grid for AI lookahead
      const occupiedGrid = new Set<string>();
      cycles.forEach(c => {
        if (c.isDead) return;
        c.history.forEach(p => {
          occupiedGrid.add(`${Math.floor(p.x / CELL_SIZE)},${Math.floor(p.y / CELL_SIZE)}`);
        });
      });

      const maxX = Math.floor(canvas.width / CELL_SIZE) * CELL_SIZE;
      const maxY = Math.floor(canvas.height / CELL_SIZE) * CELL_SIZE;

      cycles.forEach(cycle => {
        if (cycle.isDead) {
          cycle.respawnTimer--;
          if (cycle.respawnTimer <= 0) {
            // Respawn at a random grid point
            let rx = snap(Math.random() * (canvas.width - CELL_SIZE * 4) + CELL_SIZE * 2);
            let ry = snap(Math.random() * (canvas.height - CELL_SIZE * 4) + CELL_SIZE * 2);
            cycle.x = rx;
            cycle.y = ry;
            const dirs = [{vx: cycle.speed, vy: 0}, {vx: -cycle.speed, vy: 0}, {vx: 0, vy: cycle.speed}, {vx: 0, vy: -cycle.speed}];
            const dir = dirs[Math.floor(Math.random() * dirs.length)];
            cycle.vx = dir.vx;
            cycle.vy = dir.vy;
            cycle.history = [];
            cycle.isDead = false;
          }
          return;
        }

        // Move the cycle
        cycle.x += cycle.vx;
        cycle.y += cycle.vy;
        cycle.history.push({ x: cycle.x, y: cycle.y });
        
        // Keep trail at max length to prevent infinite clutter
        if (cycle.history.length > cycle.maxLength) {
          cycle.history.shift();
        }

        // Collision Check (Death)
        let died = false;
        if (cycle.x <= 0 || cycle.x >= maxX || cycle.y <= 0 || cycle.y >= maxY) {
          died = true;
        } else {
          for (const other of cycles) {
            if (other.isDead) continue;
            // If checking self, ignore the most recent history points to avoid self-collision on turns
            const skip = other.id === cycle.id ? 20 : 0;
            for (let i = 0; i < other.history.length - skip; i++) {
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
          cycle.respawnTimer = 180; // Wait 3 seconds before respawning
          cycle.history = []; // Clear trail immediately
          return;
        }

        // AI Decision Logic: Only allow turns exactly on grid intersections
        if (cycle.x % CELL_SIZE === 0 && cycle.y % CELL_SIZE === 0) {
          const possibleDirs = [
            { vx: cycle.speed, vy: 0 },
            { vx: -cycle.speed, vy: 0 },
            { vx: 0, vy: cycle.speed },
            { vx: 0, vy: -cycle.speed }
          ].filter(d => !(d.vx === -cycle.vx && d.vy === -cycle.vy)); // Don't reverse

          // Score each direction based on how far it can go safely
          const scores = possibleDirs.map(dir => {
            let score = 0;
            let cx = cycle.x;
            let cy = cycle.y;
            while (true) {
              cx += Math.sign(dir.vx) * CELL_SIZE;
              cy += Math.sign(dir.vy) * CELL_SIZE;
              if (cx <= 0 || cx >= maxX || cy <= 0 || cy >= maxY) break;
              if (occupiedGrid.has(`${Math.floor(cx / CELL_SIZE)},${Math.floor(cy / CELL_SIZE)}`)) break;
              score++;
              if (score > 15) break; // Max lookahead
            }

            // Mouse Interaction: If mouse is nearby, boost the score of the direction pointing TOWARD the mouse
            if (isHoveringRef.current && score > 0) {
              const mPos = mousePosRef.current;
              const distToMouse = Math.hypot(cycle.x - mPos.x, cycle.y - mPos.y);
              
              // If mouse is within 250px, act like a laser pointer
              if (distToMouse < 250) {
                const nextX = cycle.x + Math.sign(dir.vx) * CELL_SIZE;
                const nextY = cycle.y + Math.sign(dir.vy) * CELL_SIZE;
                const newDistToMouse = Math.hypot(nextX - mPos.x, nextY - mPos.y);
                
                // If this direction moves the cycle closer to the mouse, give it a massive score boost
                if (newDistToMouse < distToMouse) {
                  score += 100;
                }
              }
            }

            return { dir, score };
          });

          const maxScore = Math.max(...scores.map(s => s.score));
          const bestOptions = scores.filter(s => s.score === maxScore);
          const straightOption = scores.find(s => s.dir.vx === cycle.vx && s.dir.vy === cycle.vy);

          if (maxScore === 0) {
            // Trapped! Just pick a random direction and die next frame
            const chosen = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
            cycle.vx = chosen.vx;
            cycle.vy = chosen.vy;
          } else {
            // If going straight is safe enough, prefer it to avoid jittery movement
            if (straightOption && straightOption.score > 2 && Math.random() < 0.85) {
              // Keep going straight
            } else {
              // Pick a random safe direction (this naturally creates cut-offs and traps)
              const chosen = bestOptions[Math.floor(Math.random() * bestOptions.length)];
              cycle.vx = chosen.dir.vx;
              cycle.vy = chosen.dir.vy;
            }
          }
        }

        // Draw the fading trail
        if (!cycle.isDead && cycle.history.length > 1) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          // Draw segment by segment to create a fade-out effect
          for (let i = 1; i < cycle.history.length; i++) {
            ctx.beginPath();
            ctx.moveTo(cycle.history[i - 1].x, cycle.history[i - 1].y);
            ctx.lineTo(cycle.history[i].x, cycle.history[i].y);
            ctx.strokeStyle = cycle.color;
            
            const alpha = i / cycle.history.length;
            
            // Outer soft glow (simulated without shadowBlur to avoid fat overlap)
            ctx.globalAlpha = alpha * 0.4;
            ctx.lineWidth = 4;
            ctx.stroke();
            
            // Inner bright core
            ctx.globalAlpha = alpha; 
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          ctx.globalAlpha = 1.0;

          // Draw the bright "head" of the light cycle
          ctx.beginPath();
          ctx.arc(cycle.x, cycle.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 15; // Glow only on the head
          ctx.shadowColor = cycle.color;
          ctx.fill();
          ctx.shadowBlur = 0; // reset shadow so it doesn't affect other drawings
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
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
      ></div>

      {/* Tron Canvas (Draws the light cycles exactly on the grid lines) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 mix-blend-screen opacity-80"
      />

      {/* Spotlight grid (brighter, masked by mouse position) */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
        }}
      ></div>

      {/* Soft blue glow following cursor */}
      <div
        className="absolute rounded-full transition-opacity duration-500 blur-[80px]"
        style={{
          opacity: isHovering ? 0.3 : 0,
          width: '600px',
          height: '600px',
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, transparent 60%)',
          willChange: 'left, top',
        }}
      ></div>
    </div>
  );
}
