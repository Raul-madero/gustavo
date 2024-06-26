import Link from "next/link"

interface Props {
    texto: string;
    navegar: string;
}

const BotonAcento = ({ texto, navegar }: Props) => {
    return (
        <Link href={navegar} type="button" className="text-white bg-gradient-to-br dark:from-slate-700 dark:to-slate-700 from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:bg-slate-700 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{texto}</Link>
    )
}

export default BotonAcento