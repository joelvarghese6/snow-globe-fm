import { useState, useEffect } from "react";
import { SnowGlobe, Contributor } from "@/types";

// Mock hook — replace internals with real suiClient.getObject() calls
// after contract is deployed
export function useGlobeState() {
    const [globe, setGlobe] = useState<SnowGlobe>({
        id: "0xmockglobe",
        number: 7,
        threshold: 8,
        shaken: false,
        createdAt: Date.now(),
        drops: [
            { address: "0x1a2b...3c4d", stemType: "Chords", traits: ["Crystal Blue", "Spiral", "Shimmer"], royaltyShare: 12.5, claimed: false },
            { address: "0x5e6f...7a8b", stemType: "Drums", traits: ["Frost White", "Hexagon", "Glow"], royaltyShare: 12.5, claimed: false },
            { address: "0x9c0d...1e2f", stemType: "Bass", traits: ["Deep Navy", "Star", "Matte"], royaltyShare: 12.5, claimed: true },
            { address: "0x3a4b...5c6d", stemType: "Melody", traits: ["Amber Gold", "Dendrite", "Crystalline"], royaltyShare: 12.5, claimed: false },
            { address: "0x7e8f...9a0b", stemType: "FX", traits: ["Ice Pink", "Plate", "Iridescent"], royaltyShare: 12.5, claimed: false },
            { address: "0x1c2d...3e4f", stemType: "Chords", traits: ["Crystal Blue", "Hexagon", "Shimmer"], royaltyShare: 12.5, claimed: false },
        ],
    });

    // Poll every 3s — swap for real query after deploy
    useEffect(() => {
        const interval = setInterval(() => {
            // suiClient.getObject({ id: GLOBE_OBJECT_ID, options: { showContent: true } })
            //   .then(res => setGlobe(parseGlobe(res)))
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const addMockDrop = (contributor: Contributor) => {
        setGlobe(prev => ({ ...prev, drops: [...prev.drops, contributor] }));
    };

    return { globe, addMockDrop };
}