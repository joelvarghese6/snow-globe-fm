"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MOCK_PAST_GLOBES } from "@/lib/constants";
import FrostedCard from "@/components/ui/FrostedCard";

export default function VaultPage() {
    const [filter, setFilter] = useState("All");

    return (
        <main className="min-h-screen pt-28 pb-16 px-6 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--ice)", opacity: 0.5 }}>Archive</p>
                <h1 className="font-display text-5xl mb-8" style={{ color: "var(--snow)" }}>The Vault</h1>
            </motion.div>

            {/* Filter bar */}
            <div className="flex gap-2 mb-8">
                {["All", "My Contributions", "Recent"].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={filter === f ? "btn-amber" : "btn-ghost"}
                        style={{ fontSize: 11, padding: "6px 16px" }}>
                        {f}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {MOCK_PAST_GLOBES.map((g, i) => (
                    <motion.div key={g.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}>
                        <FrostedCard className="overflow-hidden cursor-pointer hover:border-opacity-60 transition-all"
                            style={{ borderColor: "var(--border)" }}>
                            {/* Artwork thumbnail */}
                            <div className="h-40 relative overflow-hidden" style={{ background: g.artColor }}>
                                {/* Generative snowflake mosaic */}
                                <svg width="100%" height="100%" viewBox="0 0 200 160" style={{ opacity: 0.4 }}>
                                    {Array.from({ length: 12 }).map((_, j) => (
                                        <g key={j} transform={`translate(${(j % 4) * 50 + 25}, ${Math.floor(j / 4) * 53 + 26})`}>
                                            {Array.from({ length: 6 }).map((_, k) => (
                                                <line key={k} x1="0" y1="0" x2={`${16 * Math.cos(k * 60 * Math.PI / 180)}`}
                                                    y2={`${16 * Math.sin(k * 60 * Math.PI / 180)}`}
                                                    stroke="var(--frost)" strokeWidth="1" />
                                            ))}
                                            <circle r="2" fill="var(--ice)" />
                                        </g>
                                    ))}
                                </svg>
                                <div className="absolute top-3 left-3">
                                    <span className="text-xs px-2 py-1 rounded-full"
                                        style={{ background: "rgba(13,31,45,0.7)", color: "var(--ice)", border: "1px solid var(--border)" }}>
                                        #{String(g.number).padStart(3, "0")}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <p className="font-display text-lg mb-1" style={{ color: "var(--snow)" }}>{g.trackName}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-xs" style={{ color: "var(--frost)", opacity: 0.5 }}>{g.contributors} contributors</p>
                                    <p className="text-xs" style={{ color: "var(--amber)" }}>{g.royalties} SUI distributed</p>
                                </div>
                                <button className="btn-ghost w-full" style={{ fontSize: 11 }}>▶ Listen</button>
                            </div>
                        </FrostedCard>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}