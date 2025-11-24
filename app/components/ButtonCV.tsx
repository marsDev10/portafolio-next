import Link from "next/link"

// Icons by Lucide React
import { RefreshCw } from 'lucide-react';
import { useState } from "react";

interface ButtonCVProps {
  locale?: string;
}

export const ButtonCV = ({ locale }: ButtonCVProps) => {

  const [downloading, setDownloading] = useState(false);

  const fileName = locale === "es" ? "/files/CV-MMV-ESP.pdf" : "/files/CV-MMV-ENG.pdf";

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
    }, 2000); 
  }
  
  return (
    <Link
    download
    href={fileName}
    onClick={handleDownload}
    className="cursor-pointer rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-100 transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-400"
    >
      Descargar CV
      <RefreshCw className={`inline-block ml-2 h-4 w-4 ${downloading ? "animate-spin" : ""}`} />
    </Link>
  )
}
