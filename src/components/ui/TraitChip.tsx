export default function TraitChip({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs"
            style={{ background: "rgba(123,189,212,0.12)", color: "var(--ice)", border: "1px solid rgba(123,189,212,0.2)", fontFamily: "'DM Mono', monospace" }}>
            {label}
        </span>
    );
}