"use client";
import { motion } from "framer-motion";
import { SnowGlobe } from "@/types";

const STEM_COLORS: Record<string, string> = {
    Chords: "#7bbdd4", Drums: "#e8a44a", Bass: "#5abf8a", Melody: "#d47bb8", FX: "#d4c47b",
};

export default function GlobeProgress({ globe }: { globe: SnowGlobe }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <p className="text-xs tracking-widest uppercase" style={{ color: "var(--frost)", opacity: 0.6 }}>
                {globe.drops.length} / {globe.threshold} drops
                {globe.drops.length >= globe.threshold && " — ready to shake"}
            </p>
            <div className="flex gap-2">
                {Array.from({ length: globe.threshold }).map((_, i) => (
                    <motion.div key={i}
                        initial={{ scale: 0.8, opacity: 0.3 }}
                        animate={{ scale: i < globe.drops.length ? 1 : 0.8, opacity: i < globe.drops.length ? 1 : 0.25 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                            width: 28, height: 28, borderRadius: "50%",
                            background: i < globe.drops.length
                                ? `radial-gradient(circle, ${STEM_COLORS[globe.drops[i]?.stemType] || "var(--ice)"}, transparent)`
                                : "transparent",
                            border: i < globe.drops.length ? `1px solid ${STEM_COLORS[globe.drops[i]?.stemType] || "var(--ice)"}44` : "1px solid var(--border)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 12,
                        }}>
                        {i < globe.drops.length ? "❄️" : ""}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}