"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import FrostedCard from "@/components/ui/FrostedCard";
import TraitChip from "@/components/ui/TraitChip";

const MOCK_SNOWBALLS = [
    { id: "sb1", globeNumber: 6, stemType: "Chords", traits: ["Crystal Blue", "Spiral", "Shimmer"], artColor: "#1a4a5a" },
    { id: "sb2", globeNumber: 5, stemType: "Drums", traits: ["Frost White", "Hexagon", "Glow"], artColor: "#2a3a1a" },
    { id: "sb3", globeNumber: 4, stemType: "Melody", traits: ["Amber Gold", "Dendrite", "Crystalline"], artColor: "#3a1a4a" },
    { id: "sb4", globeNumber: 3, stemType: "Bass", traits: ["Deep Navy", "Star", "Matte"], artColor: "#1a3a2a" },
];

const MOCK_ROYALTIES = [
    { globeNumber: 5, trackName: "Polar Sessions", amount: "0.69", claimed: false },
    { globeNumber: 4, trackName: "Blizzard Tape", amount: "1.00", claimed: false },
    { globeNumber: 3, trackName: "3am Snowfall", amount: "0.48", claimed: true },
];

export default function ProfilePage() {
    const [tab, setTab] = useState<"snowballs" | "royalties">("snowballs");

    return (
        <main className="min-h-screen pt-28 pb-16 px-6 max-w-4xl mx-auto">
            {/* Profile header */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
                <FrostedCard className="p-6 mb-8">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                            style={{ background: "var(--deep)", border: "1px solid var(--border)" }}>
                            ❄️
                        </div>
                        <div className="flex-1">
                            <p className="font-display text-xl mb-1" style={{ color: "var(--snow)" }}>0x1a2b...3c4d</p>
                            <p className="text-xs" style={{ color: "var(--frost)", opacity: 0.5 }}>Sui Devnet</p>
                        </div>
                        <div className="grid grid-cols-3 gap-6 text-center">
                            {[["4", "Total Drops"], ["2.17 SUI", "Earned"], ["1.69 SUI", "Claimable"]].map(([val, label]) => (
                                <div key={label}>
                                    <p className="font-display text-xl" style={{ color: "var(--amber)", fontFamily: "'DM Mono', monospace" }}>{val}</p>
                                    <p className="text-xs mt-1" style={{ color: "var(--frost)", opacity: 0.4 }}>{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </FrostedCard>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {[["snowballs", "My Snowballs"], ["royalties", "Claimable Royalties"]].map(([key, label]) => (
                    <button key={key} onClick={() => setTab(key as typeof tab)}
                        className={tab === key ? "btn-amber" : "btn-ghost"}
                        style={{ fontSize: 12, padding: "8px 20px" }}>
                        {label}
                    </button>
                ))}
            </div>

            {/* Snowballs grid */}
            {tab === "snowballs" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {MOCK_SNOWBALLS.map((sb, i) => (
                        <motion.div key={sb.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.06 }}>
                            <FrostedCard className="overflow-hidden">
                                {/* Snowflake artwork */}
                                <div className="h-28 relative" style={{ background: sb.artColor }}>
                                    <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ opacity: 0.5 }}>
                                        {Array.from({ length: 6 }).map((_, k) => (
                                            <line key={k} x1="50" y1="50"
                                                x2={50 + 35 * Math.cos(k * 60 * Math.PI / 180)}
                                                y2={50 + 35 * Math.sin(k * 60 * Math.PI / 180)}
                                                stroke="var(--frost)" strokeWidth="1.5" />
                                        ))}
                                        <circle cx="50" cy="50" r="4" fill="var(--ice)" />
                                    </svg>
                                    <div className="absolute top-2 right-2">
                                        <span className="text-xs" style={{ color: "var(--ice)", opacity: 0.7 }}>#{sb.globeNumber}</span>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className="text-xs mb-2" style={{ color: "var(--snow)" }}>{sb.stemType}</p>
                                    <div className="flex flex-col gap-1">
                                        {sb.traits.map(t => <TraitChip key={t} label={t} />)}
                                    </div>
                                </div>
                            </FrostedCard>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Royalties list */}
            {tab === "royalties" && (
                <div className="flex flex-col gap-3">
                    {MOCK_ROYALTIES.map((r, i) => (
                        <motion.div key={r.globeNumber} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}>
                            <FrostedCard className="p-5 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                                        style={{ background: "var(--deep)", border: "1px solid var(--border)", color: "var(--ice)" }}>
                                        #{r.globeNumber}
                                    </div>
                                    <div>
                                        <p className="text-sm mb-0.5" style={{ color: "var(--snow)" }}>{r.trackName}</p>
                                        <p className="text-xs" style={{ color: "var(--frost)", opacity: 0.5 }}>Globe #{r.globeNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="font-display text-lg" style={{ color: "var(--amber)", fontFamily: "'DM Mono', monospace" }}>
                                        {r.amount} SUI
                                    </p>
                                    {r.claimed ? (
                                        <span className="text-xs px-3 py-1 rounded-full"
                                            style={{ background: "rgba(90,191,138,0.1)", color: "#5abf8a", border: "1px solid rgba(90,191,138,0.2)" }}>
                                            Claimed
                                        </span>
                                    ) : (
                                        <button className="btn-amber" style={{ fontSize: 11, padding: "6px 16px" }}>Claim</button>
                                    )}
                                </div>
                            </FrostedCard>
                        </motion.div>
                    ))}
                </div>
            )}
        </main>
    );
}