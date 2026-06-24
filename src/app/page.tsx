"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobeState } from "@/hooks/useGlobalState";
import { Stem } from "@/types";
import { TRAIT_COLORS, TRAIT_SHAPES, TRAIT_EFFECTS } from "@/lib/constants";
import GlobeCanvas from "@/components/globe/GlobeCanvas";
import GlobeProgress from "@/components/globe/GlobeProgress";
import DropModal from "@/components/stem/DropModal";
import ShakeScreen from "@/components/globe/ShakeScreen";

export default function HomePage() {
  const { globe, addMockDrop } = useGlobeState();
  const [showDrop, setShowDrop] = useState(false);
  const [showShake, setShowShake] = useState(false);
  const ready = globe.drops.length >= globe.threshold;

  const handleDrop = (stem: Stem, traits: string[]) => {
    addMockDrop({
      address: "0xYou...r",
      stemType: stem.type,
      traits,
      royaltyShare: 12.5,
      claimed: false,
    });
  };

  return (
    <main className="relative min-h-[calc(100vh-76px)] md:h-[calc(100vh-76px)] flex flex-col items-center justify-center pt-12 pb-8 px-4 md:py-4 overflow-y-auto md:overflow-hidden">
      {/* Hero text */}
      {/* <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="text-center mb-10">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--ice)", opacity: 0.6 }}>
          Collaborative · Generative · On-chain
        </p>
        <h1 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "var(--snow)", lineHeight: 1.1 }}>
          Drop a stem.<br />
          <em>Shake the globe.</em>
        </h1>
        <p className="text-lg max-w-md mx-auto leading-relaxed" style={{ color: "var(--frost)", opacity: 0.55 }}>
          8 contributors. 1 beat tape. Royalties split on-chain, automatically.
          No labels. No lawyers. Just Sui.
        </p>
      </motion.div> */}

      {/* Globe */}
      <GlobeCanvas globe={globe} />

      {/* Progress */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="mt-4 mb-6">
        <GlobeProgress globe={globe} />
      </motion.div>

      {/* CTAs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="flex gap-3 flex-wrap justify-center">
        {ready ? (
          <button className="btn-amber" style={{ fontSize: 14, padding: "12px 32px" }}
            onClick={() => setShowShake(true)}>
            🌨️ Shake the Globe
          </button>
        ) : (
          <button className="btn-amber" style={{ fontSize: 14, padding: "12px 32px" }}
            onClick={() => setShowDrop(true)}>
            ❄️ Drop a Stem
          </button>
        )}
        <button className="btn-ghost" style={{ fontSize: 14, padding: "12px 32px" }}
          onClick={() => setShowDrop(true)}>
          Connect Wallet
        </button>
      </motion.div>

      {/* How it works */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
        {[
          { icon: "🎵", title: "Drop a Stem", desc: "Pick a lo-fi audio loop and drop it into the shared globe. Your Snowball NFT is minted on Sui with randomised traits." },
          { icon: "🌨️", title: "Shake at 8", desc: "When the 8th contributor drops, anyone can shake the globe. A unique beat tape is generated from all stems." },
          { icon: "💰", title: "Claim Royalties", desc: "Every contributor gets an equal royalty share, stored on-chain. Claim your SUI any time, no trust required." },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="glass p-5">
            <div className="text-2xl mb-3">{icon}</div>
            <p className="font-display text-base mb-2" style={{ color: "var(--snow)" }}>{title}</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--frost)", opacity: 0.5 }}>{desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showDrop && <DropModal onClose={() => setShowDrop(false)} onDrop={handleDrop} />}
        {showShake && <ShakeScreen globe={globe} onClose={() => setShowShake(false)} />}
      </AnimatePresence>
    </main>
  );
}