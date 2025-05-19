import React from "react";

export default function RealisticSpinningTire() {
  const size = 150;

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .tire {
          animation: spin 3s linear infinite;
          transform-origin: 50% 50%;
          cursor: pointer;
        }
        .tread {
          fill: #222;
          stroke: #111;
          stroke-width: 2;
        }
        .rim {
          fill: #bbb;
          stroke: #666;
          stroke-width: 2;
        }
        .spoke {
          stroke: #666;
          stroke-width: 3;
          stroke-linecap: round;
        }
        .hub {
          fill: #888;
          stroke: #555;
          stroke-width: 1;
        }
      `}</style>

      <svg
        className="tire"
        width={size}
        height={size}
        viewBox="0 0 200 200"
        role="img"
        aria-label="Spinning tire animation"
      >
        {/* Tire outer tread */}
        <circle className="tread" cx="100" cy="100" r="90" />

        {/* Tire tread pattern (simplified lines around the tire) */}
        {[...Array(36)].map((_, i) => {
          const angle = (i * 10) * (Math.PI / 180);
          const x1 = 100 + 85 * Math.cos(angle);
          const y1 = 100 + 85 * Math.sin(angle);
          const x2 = 100 + 90 * Math.cos(angle);
          const y2 = 100 + 90 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#111"
              strokeWidth="4"
            />
          );
        })}

        {/* Rim */}
        <circle className="rim" cx="100" cy="100" r="60" />

        {/* Spokes */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const x1 = 100 + 10 * Math.cos(angle);
          const y1 = 100 + 10 * Math.sin(angle);
          const x2 = 100 + 55 * Math.cos(angle);
          const y2 = 100 + 55 * Math.sin(angle);
          return (
            <line
              key={i}
              className="spoke"
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
          );
        })}

        {/* Hub */}
        <circle className="hub" cx="100" cy="100" r="15" />
      </svg>
    </>
  );
}