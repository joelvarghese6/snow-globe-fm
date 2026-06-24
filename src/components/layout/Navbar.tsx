"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const path = usePathname();
    const [connected, setConnected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="relative w-full z-50">
            {/* Main Navbar */}
            <nav className="flex items-center justify-between px-6 md:px-8 py-4 relative z-50"
                style={{ background: "rgba(13,31,45,0.75)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
                
                <Link href="/" className="flex items-center gap-2 font-display text-lg" style={{ color: "var(--snow)" }} onClick={() => setIsOpen(false)}>
                    <span>❄️</span>
                    <span>Snow Globe FM</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    {[["How it Works", "/"], ["The Vault", "/vault"], ["My Drops", "/profile"]].map(([label, href]) => (
                        <Link key={href} href={href}
                            className="text-xs tracking-widest uppercase transition-colors"
                            style={{ color: path === href ? "var(--ice)" : "var(--frost)", opacity: path === href ? 1 : 0.6 }}>
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Connect Button */}
                <div className="hidden md:block">
                    <button
                        className={connected ? "btn-ghost" : "btn-amber"}
                        onClick={() => setConnected(!connected)}
                        style={{ fontSize: "11px", padding: "8px 18px" }}>
                        {connected ? "0x1a2b...3c4d" : "Connect Wallet"}
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="flex md:hidden flex-col justify-center items-center gap-1.5 w-8 h-8 rounded-full border transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                    style={{ 
                        background: "rgba(255, 255, 255, 0.05)",
                        borderColor: "var(--border)"
                    }}
                >
                    <span 
                        className={`w-3.5 h-0.5 bg-[var(--snow)] transition-all duration-300 ${isOpen ? "transform rotate-45 translate-y-2" : ""}`} 
                    />
                    <span 
                        className={`w-3.5 h-0.5 bg-[var(--snow)] transition-all duration-300 ${isOpen ? "opacity-0 scale-0" : ""}`} 
                    />
                    <span 
                        className={`w-3.5 h-0.5 bg-[var(--snow)] transition-all duration-300 ${isOpen ? "transform -rotate-45 -translate-y-2" : ""}`} 
                    />
                </button>
            </nav>

            {/* Mobile Drawer (Slide down from Navbar top) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-full left-0 right-0 z-40 flex flex-col items-center gap-6 py-8 md:hidden border-b"
                        style={{ 
                            background: "rgba(13,31,45,0.96)", 
                            backdropFilter: "blur(20px)",
                            borderColor: "var(--border)" 
                        }}
                    >
                        {[["How it Works", "/"], ["The Vault", "/vault"], ["My Drops", "/profile"]].map(([label, href]) => (
                            <Link key={href} href={href}
                                onClick={() => setIsOpen(false)}
                                className="text-sm tracking-widest uppercase transition-colors"
                                style={{ color: path === href ? "var(--ice)" : "var(--frost)", opacity: path === href ? 1 : 0.6 }}>
                                {label}
                            </Link>
                        ))}
                        <button
                            className={connected ? "btn-ghost" : "btn-amber"}
                            onClick={() => {
                                setConnected(!connected);
                                setIsOpen(false);
                            }}
                            style={{ fontSize: "12px", padding: "10px 24px", marginTop: "4px" }}>
                            {connected ? "0x1a2b...3c4d" : "Connect Wallet"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}