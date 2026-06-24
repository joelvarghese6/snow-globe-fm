export type StemType = "Chords" | "Drums" | "Bass" | "Melody" | "FX";

export interface Stem {
    id: string;
    type: StemType;
    bpm: number;
    label: string;
    walrusBlobId: string;
    duration: number; // seconds
}

export interface Contributor {
    address: string;
    stemType: StemType;
    traits: string[];
    royaltyShare: number; // percentage
    claimed: boolean;
}

export interface SnowGlobe {
    id: string;
    number: number;
    drops: Contributor[];
    threshold: number;
    shaken: boolean;
    trackName?: string;
    artworkBlobId?: string;
    audioBlobId?: string;
    createdAt: number;
}

export interface SnowballNFT {
    id: string;
    globeNumber: number;
    stemType: StemType;
    traits: string[];
    artworkUrl?: string;
}