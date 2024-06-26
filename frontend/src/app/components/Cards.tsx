import Image from "next/image";

interface Props {
    imagen: string;
    titulo: string;
}

const Cards = ({imagen, titulo}: Props) => {
    return (
        <div className="rounded-lg w-full h-content p-4 bg-cyan-500 dark:bg-slate-700 block z-40">
            <Image className="mx-auto rounded-lg my-4" src={imagen} alt={titulo} width={200} height={100} />
            <h2 className="text-center dark:text-slate-100 font-semibold text-2xl">{titulo}</h2>
        </div>
    )
}

export default Cards;