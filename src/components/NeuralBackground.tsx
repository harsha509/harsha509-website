import { useEffect, useState, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Cycle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  color: string;
  history: Point[];
  maxLength: number;
}

export default function NeuralBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking for the spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovering) setIsHovering(true);
    };
    
    const handleMouseLeave = () => setIsHovering(false);

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
      {
        x: snap(canvas.width * 0.2),
        y: snap(canvas.height * 0.2),
        speed: 1,
        vx: 1,
        vy: 0,
        color: '#38bdf8', // Cyan
        history: [],
        maxLength: 300,
      },
      {
        x: snap(canvas.width * 0.8),
        y: snap(canvas.height * 0.8),
        speed: 1,
        vx: -1,
        vy: 0,
        color: '#fbbf24', // Golden
        history: [],
        maxLength: 300,
      },
      {
        x: snap(canvas.width * 0.2),
        y: snap(canvas.height * 0.8),
        speed: 1,
        vx: 0,
        vy: -1,
        color: '#c084fc', // Magenta
        history: [],
        maxLength: 300,
      },
      {
        x: snap(canvas.width * 0.8),
        y: snap(canvas.height * 0.2),
        speed: 1,
        vx: 0,
        vy: 1,
        color: '#4ade80', // Green
        history: [],
        maxLength: 300,
      }
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cycles.forEach(cycle => {
        // Move the cycle
        cycle.x += cycle.vx;
        cycle.y += cycle.vy;
        cycle.history.push({ x: cycle.x, y: cycle.y });
        
        // Keep trail at max length
        if (cycle.history.length > cycle.maxLength) {
          cycle.history.shift();
        }

        // Turning logic: Only allow turns exactly on grid intersections
        if (cycle.x % CELL_SIZE === 0 && cycle.y % CELL_SIZE === 0) {
          const wantsToTurn = Math.random() < 0.10; // 10% chance to turn at any intersection (reduced so they go straight longer)
          
          let possibleDirs: number[] = [];
          if (cycle.vx !== 0) {
            // Moving horizontally, check if we can go up or down
            if (cycle.y > 0) possibleDirs.push(-cycle.speed); // Up
            if (cycle.y < canvas.height - CELL_SIZE) possibleDirs.push(cycle.speed); // Down
          } else {
            // Moving vertically, check if we can go left or right
            if (cycle.x > 0) possibleDirs.push(-cycle.speed); // Left
            if (cycle.x < canvas.width - CELL_SIZE) possibleDirs.push(cycle.speed); // Right
          }

          // Force a turn if we are about to hit the edge of the screen
          const hittingEdge = 
            (cycle.vx > 0 && cycle.x >= canvas.width - CELL_SIZE) ||
            (cycle.vx < 0 && cycle.x <= 0) ||
            (cycle.vy > 0 && cycle.y >= canvas.height - CELL_SIZE) ||
            (cycle.vy < 0 && cycle.y <= 0);

          if (hittingEdge || wantsToTurn) {
            if (possibleDirs.length > 0) {
              // Pick a random valid orthogonal direction
              const newDir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
              if (cycle.vx !== 0) {
                cycle.vx = 0;
                cycle.vy = newDir;
              } else {
                cycle.vy = 0;
                cycle.vx = newDir;
              }
            } else {
              // Dead end (corner), turn around
              cycle.vx *= -1;
              cycle.vy *= -1;
            }
          }
        }

        // Draw the fading trail
        if (cycle.history.length > 1) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = 2;
          ctx.shadowBlur = 0; // No shadow blur on the tail to keep it thin and clean

          // Draw segment by segment to create a fade-out effect
          for (let i = 1; i < cycle.history.length; i++) {
            ctx.beginPath();
            ctx.moveTo(cycle.history[i - 1].x, cycle.history[i - 1].y);
            ctx.lineTo(cycle.history[i].x, cycle.history[i].y);
            ctx.strokeStyle = cycle.color;
            // Non-linear fade so the head stays bright and the tail fades smoothly
            ctx.globalAlpha = Math.pow(i / cycle.history.length, 1.5); 
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
        className="absolute inset-0"
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
