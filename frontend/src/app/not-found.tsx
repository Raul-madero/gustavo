import scarecrow from "@/assets/img/Scarecrow.png"
import Image from "next/image"
import Link from "next/link"

const NotFound = () => {
    return (
        <main className="md:flex md:justify-center md:items-center dark:bg-slate-600">
        <section className="flex flex-col p-5 md:m-12">
            <p className="dark:text-slate-100 font-Inconsolata font-bold text-bold text-2xl self-start mb-12 align-top">404 NOT FOUND</p>
            <Image className="w-8/9 md:self-center" src={scarecrow} alt="scarecrow" />
        </section>
        <section className="pl-5 my-3 md:self-center justify-center md:my-18">
            <h1 className="dark:text-slate-100 text-black font-bold text-5xl my-8 md:my-16 md:mx-12">Malas noticias</h1>
            <p className="dark:text-slate-100 text-2xl text-dark-text my-3 md:my-16 md:mx-12">La página que consultaste se encuentra temporalmente fuera de servicio</p>
            <Link href="/" className="w-56 h-16 bg-black-title font-bold text-white my-3 md:my-16 md:mx-12">VOLVER A INICIO</Link>
        </section>
    </main>
    )
}

export default NotFound