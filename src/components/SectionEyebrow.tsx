import React from "react";

export interface SectionEyebrowProps {
  children: React.ReactNode;
  id?: string;
}

export default function SectionEyebrow({ children, id }: SectionEyebrowProps) {
  return (
    <div
      id={id}
      className="text-[12px] md:text-[13px] uppercase tracking-[0.25em] text-gold font-semibold select-none mb-4 text-center mt-2"
    >
      {children}
    </div>
  );
}
