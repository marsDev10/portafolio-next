"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Initializing MarsDev System...",
  "Loading UI modules...",
  "Syncing cyberpunk assets...",
  "Connecting to Hacker core...",
  "Boot complete. Welcome, human.",
];

export const LoaderMarsDev = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [finished, setFinished] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    if (finished) return;

    let charIndex = 0;
    let typingTimeout: NodeJS.Timeout;
    let lineTimeout: NodeJS.Timeout;

    const typeLine = () => {
      const line = MESSAGES[currentLine];

      if (charIndex <= line.length) {
        setCurrentText(line.slice(0, charIndex));
        charIndex++;
        typingTimeout = setTimeout(typeLine, 30);
      } else {
        lineTimeout = setTimeout(() => {
          if (currentLine < MESSAGES.length - 1) {
            setCurrentLine((prev) => prev + 1);
            setCurrentText("");
          } else {
            setFinished(true);
            setTimeout(() => {
              setShowBrand(true);
              setTimeout(() => {
                setShowBrand(false);
              }, 1200);
            }, 400);
          }
        }, 500);
      }
    };

    typeLine();

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(lineTimeout);
    };
  }, [currentLine, finished]);

  if (!showBrand && finished) {
    return null;
  }

  return (
    <div
      className={`
        fixed inset-0 z-[99]
        flex flex-col items-center justify-center
        bg-black
        transition-opacity duration-700
        ${finished ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      {!finished && (
        <div className="w-full max-w-xl px-6">
          <div className="mb-4 text-xs tracking-[0.25em] text-emerald-400 uppercase">
            &gt; MarsDev Boot Sequence
          </div>

          <div className="bg-black/60 border border-emerald-500/40 rounded-lg p-4 shadow-[0_0_30px_rgba(16,185,129,0.35)]">
            {MESSAGES.slice(0, currentLine).map((line, idx) => (
              <div
                key={idx}
                className="font-mono text-sm text-emerald-300 mb-1"
              >
                <span className="text-emerald-500">&gt;</span> {line}
              </div>
            ))}

            {!finished && (
              <div className="font-mono text-sm text-emerald-300">
                <span className="text-emerald-500">&gt;</span> {currentText}
                <span className="inline-block w-[6px] h-[14px] bg-emerald-400 ml-1 animate-pulse" />
              </div>
            )}
          </div>

          <div className="mt-3 text-[11px] text-emerald-500/70 font-mono">
            SYSTEM STATUS: <span className="text-emerald-300">BOOTING</span>
          </div>
        </div>
      )}

      {showBrand && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="
              text-5xl md:text-6xl font-semibold tracking-[0.25em]
              text-emerald-400 uppercase
            "
            style={{
              textShadow:
                "0 0 10px rgba(16,185,129,0.9), 0 0 25px rgba(16,185,129,0.8), 0 0 55px rgba(56,189,248,0.75)",
            }}
          >
            MARSDEV
          </h1>
        </div>
      )}
    </div>
  );
};
