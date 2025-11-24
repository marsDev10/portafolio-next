import { Volume2, VolumeOff } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const ButtonMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.3;

    const tryAutoplay = async () => {
      try {
        if(!audioRef.current) return;

        audioRef.current.muted = false;
        await audioRef.current.play();
        
        setIsPlaying(true);
      } catch (error) {
        // Autoplay bloqueado (normal en Chrome / móviles)
        console.warn("Autoplay bloqueado por el navegador", error);
      }
    };

    tryAutoplay();
  }, []);

  const handleToggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn("No se pudo reproducir el audio", error);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleToggleMusic}
        className={`
            cursor-pointer
          cyberpunk-btn
          flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-mono
          transition-all duration-300
          ${isPlaying
            ? "cyberpunk-btn--active text-emerald-200"
            : "border border-slate-700/80 bg-slate-950/80 text-slate-300 hover:border-emerald-400/70 hover:text-emerald-200 hover:shadow-[0_0_12px_rgba(16,185,129,0.5)]"
          }
        `}
      >
        <span className="relative flex items-center gap-2">
          <span
            className={`
              transition-transform duration-300
              ${isPlaying ? "scale-110" : "scale-100"}
            `}
          >
            {isPlaying ? <Volume2 size={16} /> : <VolumeOff size={16} />}
          </span>

          <span className="uppercase tracking-[0.2em]">
            {isPlaying ? "Sound: On" : "Sound: Off"}
          </span>
        </span>

        <span className="ml-2 flex h-4 items-end gap-[2px]">
          <span
            className={`
              eq-bar
              ${isPlaying ? "eq-bar-1" : "h-[3px] bg-slate-500/60"}
            `}
          />
          <span
            className={`
              eq-bar
              ${isPlaying ? "eq-bar-2" : "h-[5px] bg-slate-500/60"}
            `}
          />
          <span
            className={`
              eq-bar
              ${isPlaying ? "eq-bar-3" : "h-[2px] bg-slate-500/60"}
            `}
          />
        </span>
      </button>

      <audio ref={audioRef} loop preload="auto">
        <source src="/music/marsdev-theme.m4a" type="audio/mp4" />
      </audio>
    </>
  );
};

export default ButtonMusic;
