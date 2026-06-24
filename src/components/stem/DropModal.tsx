"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stem } from "@/types";
import { STEM_POOL, TRAIT_COLORS, TRAIT_SHAPES, TRAIT_EFFECTS } from "@/lib/constants";
import StemCard from "./StemCard";
import TraitChip from "@/components/ui/TraitChip";
import FrostedCard from "@/components/ui/FrostedCard";

interface Props {
    onClose: () => void;
    onDrop: (stem: Stem, traits: string[]) => void;
}

export default function DropModal({ onClose, onDrop }: Props) {
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState<Stem | null>(null);
    const traits = [
        TRAIT_COLORS[Math.floor(Math.random() * TRAIT_COLORS.length)],
        TRAIT_SHAPES[Math.floor(Math.random() * TRAIT_SHAPES.length)],
        TRAIT_EFFECTS[Math.floor(Math.random() * TRAIT_EFFECTS.length)],
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(13,31,45,0.85)", backdropFilter: "blur(8px)" }}
            onClick={e => e.target === e.currentTarget && onClose()}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="glass w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6"
                style={{ borderRadius: 20 }}>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="font-display text-xl" style={{ color: "var(--snow)" }}>Drop a Stem</h2>
                        <p className="text-xs mt-1" style={{ color: "var(--frost)", opacity: 0.5 }}>Step {step} of 3</p>
                    </div>
                    <button onClick={onClose} className="text-2xl leading-none" style={{ color: "var(--frost)", opacity: 0.5 }}>×</button>
                </div>

                {/* Step indicators */}
                <div className="flex gap-2 mb-6">
                    {[1, 2, 3].map(s => (
                        <div key={s} className="h-1 flex-1 rounded-full transition-all"
                            style={{ background: s <= step ? "var(--ice)" : "var(--border)" }} />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 1 — Stem Selector */}
                    {step === 1 && (
                        <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--frost)", opacity: 0.5 }}>Choose your stem</p>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {STEM_POOL.map(stem => (
                                    <StemCard key={stem.id} stem={stem} selected={selected?.id === stem.id} onSelect={() => setSelected(stem)} />
                                ))}
                            </div>
                            <button className="btn-amber w-full" disabled={!selected} onClick={() => setStep(2)}
                                style={{ opacity: selected ? 1 : 0.4 }}>
                                Continue →
                            </button>
                        </motion.div>
                    )}

                    {/* Step 2 — Preview + Traits */}
                    {step === 2 && selected && (
                        <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <FrostedCard className="p-5 mb-4">
                                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--frost)", opacity: 0.5 }}>Selected Stem</p>
                                <p className="font-display text-lg mb-1" style={{ color: "var(--snow)" }}>{selected.label}</p>
                                <p className="text-xs mb-4" style={{ color: "var(--frost)", opacity: 0.5 }}>{selected.type} · {selected.bpm} BPM</p>
                                {/* Waveform preview */}
                                <div className="flex items-center gap-0.5 h-12">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <div key={i} style={{
                                            width: 2, borderRadius: 2, flex: "none",
                                            height: `${25 + Math.sin(i * 0.5) * 20 + Math.sin(i * 1.3) * 10}%`,
                                            background: "var(--ice)", opacity: 0.6,
                                        }} />
                                    ))}
                                </div>
                            </FrostedCard>

                            <FrostedCard className="p-5 mb-6">
                                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--frost)", opacity: 0.5 }}>Your Snowball Traits</p>
                                <p className="text-xs mb-3" style={{ color: "var(--frost)", opacity: 0.4 }}>Generated on-chain via Sui Randomness</p>
                                <div className="flex gap-2 flex-wrap">
                                    {traits.map(t => <TraitChip key={t} label={t} />)}
                                </div>
                            </FrostedCard>

                            <div className="flex gap-3">
                                <button className="btn-ghost flex-1" onClick={() => setStep(1)}>← Back</button>
                                <button className="btn-amber flex-1" onClick={() => setStep(3)}>Looks good →</button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3 — Confirm */}
                    {step === 3 && selected && (
                        <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <FrostedCard className="p-5 mb-6">
                                <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--frost)", opacity: 0.5 }}>Transaction Summary</p>
                                {[
                                    ["Stem", selected.label],
                                    ["Type", selected.type],
                                    ["Storage (Walrus)", "~0.001 SUI"],
                                    ["Gas estimate", "~0.002 SUI"],
                                    ["Royalty share", "12.5%"],
                                ].map(([k, v]) => (
                                    <div key={k} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                                        <span className="text-xs" style={{ color: "var(--frost)", opacity: 0.5 }}>{k}</span>
                                        <span className="text-xs" style={{ color: "var(--snow)" }}>{v}</span>
                                    </div>
                                ))}
                            </FrostedCard>

                            <button className="btn-amber w-full mb-3" style={{ padding: "14px" }}
                                onClick={() => { onDrop(selected, traits); onClose(); }}>
                                ❄️ Drop Into Globe
                            </button>
                            <p className="text-center text-xs" style={{ color: "var(--frost)", opacity: 0.4 }}>
                                Or{" "}
                                <span className="underline cursor-pointer" style={{ color: "var(--ice)" }}>drop with Twitter →</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}