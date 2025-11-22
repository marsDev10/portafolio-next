import Link from "next/link"



export const ButtonCV = () => {
  return (
    <Link
    download
    href={"/files/CV-MMV-ENG.pdf"}
    className="cursor-pointer rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-100 transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-400"
    >Descargar CV</Link>
  )
}
