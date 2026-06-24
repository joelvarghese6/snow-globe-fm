import { Stem } from "@/types";

export const PACKAGE_ID = "0xYOUR_PACKAGE_ID";
export const GLOBE_OBJECT_ID = "0xYOUR_GLOBE_OBJECT_ID";
export const NETWORK = "devnet" as const;
export const WALRUS_BASE = "https://aggregator.walrus-testnet.walrus.space/v1";

export const TRAIT_COLORS = ["Crystal Blue", "Frost White", "Deep Navy", "Amber Gold", "Ice Pink"];
export const TRAIT_SHAPES = ["Spiral", "Hexagon", "Star", "Dendrite", "Plate"];
export const TRAIT_EFFECTS = ["Shimmer", "Glow", "Matte", "Crystalline", "Iridescent"];

export const STEM_POOL: Stem[] = [
    { id: "s1", type: "Chords", bpm: 85, label: "Midnight Chords", walrusBlobId: "blob1", duration: 8 },
    { id: "s2", type: "Drums", bpm: 85, label: "Brushed Kit", walrusBlobId: "blob2", duration: 8 },
    { id: "s3", type: "Bass", bpm: 85, label: "Sub Warmth", walrusBlobId: "blob3", duration: 8 },
    { id: "s4", type: "Melody", bpm: 85, label: "Ivory Keys", walrusBlobId: "blob4", duration: 8 },
    { id: "s5", type: "FX", bpm: 85, label: "Vinyl Crackle", walrusBlobId: "blob5", duration: 8 },
    { id: "s6", type: "Chords", bpm: 90, label: "Late Night Rhodes", walrusBlobId: "blob6", duration: 8 },
    { id: "s7", type: "Drums", bpm: 90, label: "Tape Drums", walrusBlobId: "blob7", duration: 8 },
    { id: "s8", type: "Melody", bpm: 90, label: "Glass Bell", walrusBlobId: "blob8", duration: 8 },
    { id: "s9", type: "Bass", bpm: 80, label: "Fretless Drift", walrusBlobId: "blob9", duration: 8 },
    { id: "s10", type: "FX", bpm: 80, label: "Rain on Glass", walrusBlobId: "blob10", duration: 8 },
];

// Mock past globes for Vault screen
export const MOCK_PAST_GLOBES = [
    { id: "g1", number: 1, trackName: "Midnight Drift", contributors: 8, royalties: "4.20", artColor: "#2a5470" },
    { id: "g2", number: 2, trackName: "Frozen Cassette", contributors: 8, royalties: "6.10", artColor: "#1a4a3a" },
    { id: "g3", number: 3, trackName: "3am Snowfall", contributors: 8, royalties: "3.80", artColor: "#4a2a50" },
    { id: "g4", number: 4, trackName: "Blizzard Tape", contributors: 8, royalties: "8.00", artColor: "#3a3a1a" },
    { id: "g5", number: 5, trackName: "Polar Sessions", contributors: 8, royalties: "5.50", artColor: "#1a2a5a" },
    { id: "g6", number: 6, trackName: "Ice Frequency", contributors: 8, royalties: "7.20", artColor: "#4a1a2a" },
];