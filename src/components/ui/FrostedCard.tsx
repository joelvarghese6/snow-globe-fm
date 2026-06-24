import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export default function FrostedCard({ children, className = "", style, onClick }: Props) {
    return (
        <div className={`glass ${className}`} style={style} onClick={onClick}>
            {children}
        </div>
    );
}