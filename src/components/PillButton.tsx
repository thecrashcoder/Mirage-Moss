import React from "react";

export interface PillButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  id?: string;
}

export default function PillButton({
  variant = "primary",
  children,
  onClick,
  className = "",
  id,
}: PillButtonProps) {
  if (variant === "primary") {
    return (
      <button
        id={id}
        onClick={onClick}
        className={`px-8 py-3.5 bg-white text-black text-sm font-medium tracking-wide rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_24px_rgba(255,255,255,0.4)] ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      id={id}
      onClick={onClick}
      className={`px-8 py-3.5 bg-transparent text-white text-sm font-medium tracking-wide rounded-full border border-white/40 cursor-pointer transition-all duration-300 hover:bg-white/5 hover:border-white/80 hover:scale-[1.03] active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}
