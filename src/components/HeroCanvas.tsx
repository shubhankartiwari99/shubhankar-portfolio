"use client";

import { useEffect, useRef } from "react";

interface FlowPoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  phase: number;
  speed: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const mouse = {
      x: width * 0.5,
      y: height * 0.4,
      targetX: width * 0.5,
      targetY: height * 0.4,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Flow particles (ambient glowing orbs)
    const particleCount = Math.min(Math.floor(width / 35), 36);
    const particles: FlowPoint[] = [];

    const colors = [
      "rgba(0, 255, 157,",   // emerald
      "rgba(99, 102, 241,",  // indigo
      "rgba(56, 189, 248,",  // cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      particles.push({
        x: px,
        y: py,
        baseX: px,
        baseY: py,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.3,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[i % colors.length],
        alpha: Math.random() * 0.35 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.012,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      time += 0.01;

      // Draw faint cybernetic crosshairs grid
      const gridSize = 80;
      const startX = 0;
      const startY = 0;

      ctx.save();
      for (let x = startX; x < width; x += gridSize) {
        for (let y = startY; y < height; y += gridSize) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 240;

          if (dist < maxDist) {
            const intensity = (1 - dist / maxDist) * 0.22;
            ctx.fillStyle = `rgba(0, 255, 157, ${intensity})`;
            ctx.fillRect(x - 1, y - 1, 2, 2);

            // Subtle crosshair lines
            if (dist < 140) {
              const lineAlpha = (1 - dist / 140) * 0.15;
              ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(x - 6, y);
              ctx.lineTo(x + 6, y);
              ctx.moveTo(x, y - 6);
              ctx.lineTo(x, y + 6);
              ctx.stroke();
            }
          }
        }
      }
      ctx.restore();

      // Ambient radial bloom around mouse
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        gradient.addColorStop(0, "rgba(0, 255, 157, 0.07)");
        gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.04)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 260, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw dynamic flow particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.phase += p.speed;
        p.x += Math.sin(p.phase) * 0.4 + p.vx;
        p.y += p.vy;

        // Wrap around boundaries smoothly
        if (p.y < -20) p.y = height + 20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Interaction with mouse
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const force = (1 - dist / 160) * 1.8;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        // Particle halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha * 0.25})`;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.75 }}
    />
  );
}
