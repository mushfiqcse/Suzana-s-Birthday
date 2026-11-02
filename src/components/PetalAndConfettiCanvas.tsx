import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flower2, Heart } from 'lucide-react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  swingAngle: number;
  swingSpeed: number;
}

export const triggerBirthdayConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#f472b6', '#fb7185', '#fda4af', '#fbcfe8', '#e9d5ff', '#fed7aa', '#fef08a'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 30,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const PetalAndConfettiCanvas: React.FC<{
  enabled?: boolean;
}> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize petals
    const petalColors = [
      'rgba(244, 114, 182, 0.75)', // Soft Rose
      'rgba(251, 113, 133, 0.65)', // Blush
      'rgba(249, 168, 212, 0.70)', // Light blossom pink
      'rgba(236, 72, 153, 0.60)',  // Vibrant pink
      'rgba(253, 164, 175, 0.80)', // Pastel petal
      'rgba(243, 232, 255, 0.60)', // Soft lavender petal
      'rgba(254, 215, 170, 0.70)', // Peach accent
    ];

    const petalCount = window.innerWidth < 768 ? 24 : 45;
    petalsRef.current = Array.from({ length: petalCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 9,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: Math.random() * 0.4 + 0.6,
      swingAngle: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.01,
    }));

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      // Curved organic petal silhouette
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size / 1.5, p.size / 2, 0, p.size);
      ctx.bezierCurveTo(p.size / 1.5, p.size / 2, p.size / 2, -p.size / 2, 0, 0);
      ctx.fill();

      // Delicate inner vein highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.lineTo(0, p.size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petalsRef.current.length; i++) {
        const p = petalsRef.current[i];
        p.swingAngle += p.swingSpeed;
        p.x += p.speedX + Math.sin(p.swingAngle) * 0.8;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = canvas.width + 20;
        }

        drawPetal(ctx, p);
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ opacity: 0.92 }}
    />
  );
};
