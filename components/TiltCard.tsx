"use client";
import { useRef } from "react";

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <div ref={ref} className="tilt-card h-full"  onMouseMove={move} onMouseLeave={leave}>
      {children}
    </div>
  );
}