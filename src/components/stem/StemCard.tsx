"use client";
import { motion } from "framer-motion";
import { Stem } from "@/types";

const TYPE_ICONS: Record<string, string> = {
    Chords: "♪", Drums: "◉", Bass: "∿", Melody: "♫", FX: "◈",
};

interface Props {
    stem: Stem;
    selected: boolean;
    onSelect: () => void;
}

export default function StemCard({ stem, selected, onSelect }: Props) {
    return (
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
            onClick={onSelect}
            className="glass cursor-pointer p-4 flex flex-col gap-3 transition-all"
            style={{
                border: selected ? "1px solid var(--ice)" : "1px solid var(--border)",
                boxShadow: selected ? "0 0 16px rgba(123,189,212,0.15)" : "none",
            }}>
            <div className="flex items-center justify-between">
                <span className="text-xl">{TYPE_ICONS[stem.type]}</span>
                <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(123,189,212,0.1)", color: "var(--ice)", border: "1px solid var(--border)" }}>
                    {stem.type}
                </span>
            </div>

            {/* Fake waveform */}
            <div className="flex items-center gap-0.5 h-8">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} style={{
                        width: 2, borderRadius: 2,
                        height: `${20 + Math.sin(i * 0.8) * 14 + Math.random() * 8}%`,
                        background: selected ? "var(--ice)" : "var(--frost)",
                        opacity: selected ? 0.8 : 0.3,
                        transition: "all 0.3s",
                    }} />
                ))}
            </div>

            <div>
                <p className="text-sm font-medium" style={{ color: "var(--snow)" }}>{stem.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--frost)", opacity: 0.5 }}>{stem.bpm} BPM · {stem.duration}s</p>
            </div>
        </motion.div>
    );
}