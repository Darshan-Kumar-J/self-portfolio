import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useTheme } from './ThemeContext';

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function UniverseBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999 };
    const isDark = theme === 'dark';

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const nodeCount = Math.min(38, Math.max(18, Math.floor((width * height) / 36000)));
    const nodes: NodePoint[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: 1.3 + Math.random() * 1.3,
    }));

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const parentEl = canvas.parentElement;
    parentEl?.addEventListener('pointermove', onPointerMove, { passive: true });
    parentEl?.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!shouldReduceMotion) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;
        }

        // Draw edges between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 155) {
            const alpha = (1 - dist / 155) * (isDark ? 0.18 : 0.12);
            ctx.strokeStyle = isDark
              ? `rgba(69, 109, 255, ${alpha.toFixed(3)})`
              : `rgba(52, 88, 235, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Interactive cursor tether
        const mdx = a.x - pointer.x;
        const mdy = a.y - pointer.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 180) {
          const alpha = (1 - mdist / 180) * (isDark ? 0.32 : 0.2);
          ctx.strokeStyle = isDark
            ? `rgba(139, 92, 246, ${alpha.toFixed(3)})`
            : `rgba(124, 58, 237, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        ctx.fillStyle = isDark
          ? 'rgba(160, 165, 177, 0.35)'
          : 'rgba(78, 85, 101, 0.28)';
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!shouldReduceMotion) {
        animFrame = window.requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
      parentEl?.removeEventListener('pointermove', onPointerMove);
      parentEl?.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [shouldReduceMotion, theme]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Subtle architectural dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(69,109,255,0.22) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 35%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 40%, #000 35%, transparent 100%)',
        }}
      />
      {/* Ambient directional gradients */}
      <div className="absolute -top-28 -left-24 h-[420px] w-[420px] rounded-full bg-[#456DFF]/10 dark:bg-[#456DFF]/14 blur-3xl" />
      <div className="absolute top-12 right-0 h-[440px] w-[440px] rounded-full bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/14 blur-3xl" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
