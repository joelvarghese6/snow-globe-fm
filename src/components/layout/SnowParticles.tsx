"use client";
import { useEffect, useRef } from "react";

interface TrailParticle {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    opacity: number;
    decay: number;
}

export default function SnowParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener("resize", resize);

        const flakes = Array.from({ length: 90 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 0.4,
            speed: Math.random() * 0.35 + 0.08,
            drift: Math.random() * 0.25 - 0.12,
            opacity: Math.random() * 0.35 + 0.08,
        }));

        const trail: TrailParticle[] = [];
        let lastX = 0;
        let lastY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Only spawn particles if mouse moved sufficiently to keep the effect elegant
            if (dist > 4) {
                // Spawn 1-3 particles depending on speed
                const count = Math.min(Math.floor(dist / 4), 3);
                for (let i = 0; i < count; i++) {
                    trail.push({
                        x: e.clientX + (Math.random() * 6 - 3),
                        y: e.clientY + (Math.random() * 6 - 3),
                        r: Math.random() * 1.5 + 0.8,
                        // Drift speed influenced by mouse vector and gravity
                        vx: Math.random() * 0.3 - 0.15 + (dx * 0.03),
                        vy: Math.random() * 0.4 + 0.2 + (dy * 0.03),
                        opacity: Math.random() * 0.5 + 0.5, // Bright at spawn
                        decay: Math.random() * 0.02 + 0.015, // Speed of fade out
                    });
                }
                lastX = e.clientX;
                lastY = e.clientY;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        let raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Draw falling background snow
            flakes.forEach(f => {
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(184,221,232,${f.opacity})`;
                ctx.fill();
                f.y += f.speed;
                f.x += f.drift;
                if (f.y > canvas.height) { f.y = -5; f.x = Math.random() * canvas.width; }
                if (f.x > canvas.width) f.x = 0;
                if (f.x < 0) f.x = canvas.width;
            });

            // 2. Draw and update interactive cursor trail
            for (let i = trail.length - 1; i >= 0; i--) {
                const t = trail[i];
                ctx.beginPath();
                ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(240,248,252,${t.opacity})`;
                ctx.fill();

                // Update physics
                t.x += t.vx;
                t.y += t.vy;
                t.opacity -= t.decay;

                // Cleanup when invisible
                if (t.opacity <= 0) {
                    trail.splice(i, 1);
                }
            }

            raf = requestAnimationFrame(draw);
        };
        
        draw();
        
        return () => { 
            cancelAnimationFrame(raf); 
            window.removeEventListener("resize", resize); 
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}