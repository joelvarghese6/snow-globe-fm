"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SnowGlobe } from "@/types";

const STEM_COLORS: Record<string, string> = {
    Chords: "#7bbdd4", Drums: "#e8a44a", Bass: "#5abf8a", Melody: "#d47bb8", FX: "#d4c47b",
};

export default function GlobeCanvas({ globe }: { globe: SnowGlobe }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const filled = globe.drops.length;
    const total = globe.threshold;
    const pct = filled / total;

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const W = canvas.width = 340;
        const H = canvas.height = 340;
        const cx = W / 2, cy = H / 2, R = 130;

        let t = 0;
        let raf: number;

        const orbs = globe.drops.map((_, i) => ({
            angle: (i / total) * Math.PI * 2,
            r: 20 + Math.random() * 40,
            speed: 0.003 + Math.random() * 0.004,
            color: STEM_COLORS[globe.drops[i].stemType] || "#7bbdd4",
            size: 6 + Math.random() * 6,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // Globe base glow
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
            grad.addColorStop(0, "rgba(26,58,74,0.6)");
            grad.addColorStop(0.7, "rgba(13,31,45,0.4)");
            grad.addColorStop(1, "rgba(13,31,45,0)");
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            // Globe ring
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(184,221,232,0.18)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Inner glow rings
            for (let i = 1; i <= 3; i++) {
                ctx.beginPath();
                ctx.arc(cx, cy, R * (0.3 * i), 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(123,189,212,${0.04 * i})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Orbs (contributor snowballs)
            orbs.forEach(orb => {
                orb.angle += orb.speed;
                const ox = cx + Math.cos(orb.angle) * orb.r;
                const oy = cy + Math.sin(orb.angle) * orb.r;
                const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.size);
                g.addColorStop(0, orb.color + "cc");
                g.addColorStop(1, orb.color + "00");
                ctx.beginPath();
                ctx.arc(ox, oy, orb.size, 0, Math.PI * 2);
                ctx.fillStyle = g;
                ctx.fill();
            });

            // Floating snow particles inside globe
            for (let i = 0; i < 18; i++) {
                const angle = (i / 18) * Math.PI * 2 + t * 0.2;
                const r = 30 + (i % 5) * 18;
                const px = cx + Math.cos(angle) * r;
                const py = cy + Math.sin(angle) * r * 0.6 + Math.sin(t + i) * 4;
                if (Math.sqrt((px - cx) ** 2 + (py - cy) ** 2) < R - 8) {
                    ctx.beginPath();
                    ctx.arc(px, py, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(240,248,252,0.3)";
                    ctx.fill();
                }
            }

            // Water fill level
            const fillY = cy + R - (pct * R * 1.8);
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, R - 2, 0, Math.PI * 2);
            ctx.clip();
            const waveGrad = ctx.createLinearGradient(0, fillY, 0, cy + R);
            waveGrad.addColorStop(0, "rgba(26,58,74,0.3)");
            waveGrad.addColorStop(1, "rgba(13,31,45,0.5)");
            ctx.fillStyle = waveGrad;
            ctx.fillRect(0, fillY, W, H);
            ctx.restore();

            t += 0.015;
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
    }, [globe.drops.length]);

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex flex-col items-center">
            {/* Globe glow */}
            <div className="absolute rounded-full" style={{
                width: 340, height: 340,
                background: "radial-gradient(circle, rgba(123,189,212,0.08) 0%, transparent 70%)",
                filter: "blur(20px)", zIndex: 0,
            }} />
            <canvas ref={canvasRef} width={340} height={340} style={{ position: "relative", zIndex: 1 }} />
            {/* Base */}
            <div style={{ width: 100, height: 14, background: "var(--deep)", borderRadius: "50%", marginTop: -8, opacity: 0.8, border: "1px solid var(--border)" }} />
        </motion.div>
    );
}