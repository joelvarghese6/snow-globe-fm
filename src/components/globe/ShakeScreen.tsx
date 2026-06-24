"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SnowGlobe } from "@/types";
import TraitChip from "@/components/ui/TraitChip";
import FrostedCard from "@/components/ui/FrostedCard";

interface Props {
    globe: SnowGlobe;
    onClose: () => void;
}

const TRACK_NAMES = ["Midnight Drift", "Frozen Cassette", "3am Snowfall", "Blizzard Tape", "Polar Sessions"];

export default function ShakeScreen({ globe, onClose }: Props) {
    const [phase, setPhase] = useState<"shake" | "reveal">("shake");
    const trackName = TRACK_NAMES[globe.number % TRACK_NAMES.length];

    useEffect(() => {
        const t = setTimeout(() => setPhase("reveal"), 2200);
        return () => clearTimeout(t);
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "rgba(13,31,45,0.97)", backdropFilter: "blur(20px)" }}>

            {/* Exploding snowflakes */}
            <AnimatePresence>
                {phase === "shake" && Array.from({ length: 24 }).map((_, i) => (
                    <motion.div key={i}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: (Math.random() - 0.5) * 600, y: (Math.random() - 0.5) * 400, opacity: 0, scale: Math.random() * 2 + 0.5 }}
                        transition={{ duration: 1.8, ease: "easeOut", delay: i * 0.04 }}
                        className="absolute text-2xl pointer-events-none" style={{ left: "50%", top: "50%" }}>
                        ❄️
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Globe shaking */}
            <motion.div
                animate={phase === "shake" ? { x: [-8, 8, -6, 6, -4, 4, 0], rotate: [-2, 2, -2, 2, -1, 1, 0] } : {}}
                transition={{ duration: 0.6, repeat: phase === "shake" ? 3 : 0 }}
                className="text-8xl mb-6">
                🌨️
            </motion.div>

            <AnimatePresence>
                {phase === "reveal" && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }} className="flex flex-col items-center gap-6 w-full max-w-2xl px-6">

                        {/* Cassette tape */}
                        <FrostedCard className="p-6 text-center w-full">
                            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--frost)", opacity: 0.5 }}>
                                Globe #{globe.number} · Beat Tape Generated
                            </p>
                            <p className="font-display text-3xl mb-1" style={{ color: "var(--snow)" }}>{trackName}</p>
                            <p className="text-xs mb-4" style={{ color: "var(--frost)", opacity: 0.4 }}>
                                {globe.drops.length} contributors · 85 BPM · lo-fi
                            </p>

                            {/* Audio player mock */}
                            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                                <button className="btn-amber" style={{ width: 36, height: 36, padding: 0, fontSize: 14, borderRadius: "50%" }}>▶</button>
                                <div className="flex-1 flex items-center gap-0.5 h-8">
                                    {Array.from({ length: 60 }).map((_, i) => (
                                        <div key={i} style={{
                                            width: 2, flex: "none", borderRadius: 2,
                                            height: `${20 + Math.sin(i * 0.4) * 15 + Math.sin(i * 1.1) * 8}%`,
                                            background: i < 20 ? "var(--amber)" : "var(--ice)", opacity: i < 20 ? 0.9 : 0.4,
                                        }} />
                                    ))}
                                </div>
                                <span className="text-xs" style={{ color: "var(--frost)", opacity: 0.5 }}>2:47</span>
                            </div>
                        </FrostedCard>

                        {/* Contributors */}
                        <FrostedCard className="p-5 w-full">
                            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--frost)", opacity: 0.5 }}>Contributors & Royalties</p>
                            <div className="flex flex-col gap-3">
                                {globe.drops.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                                                style={{ background: "var(--deep)", border: "1px solid var(--border)" }}>
                                                {i + 1}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs truncate" style={{ color: "var(--snow)" }}>{c.address}</p>
                                                <div className="flex gap-1 mt-1 flex-wrap">
                                                    {c.traits.slice(0, 2).map(t => <TraitChip key={t} label={t} />)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className="text-xs" style={{ color: "var(--ice)" }}>{c.royaltyShare}%</span>
                                            <button className="btn-amber" style={{ padding: "4px 12px", fontSize: "10px" }}>Claim</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FrostedCard>

                        <button className="btn-ghost" onClick={onClose}>← Back to Globe</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}