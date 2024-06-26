import Link from "next/link"
import Titles from "../ui/Titles"
import BotonAcento from "../ui/BottonAcento"
import BotonSimple from "../ui/BotonSimple"

const Jumbotron = () => {
    return (
        <div className="bg-[url('../assets/img/calc.jpg')] bg-cover bg-center bg-no-repeat w-full h-svh relative">
            <div className="bg-gray-900 w-full h-screen absolute opacity-70"></div>
            <div className="flex flex-col justify-center items-center gap-8 w-full h-screen z-30 absolute">
                <Titles title="Servicios de contabilidad general." />
                <div className="flex space-x-9">
                    <BotonAcento texto="Hazte Cliente" navegar="/contacto" />
                    <BotonSimple texto="¿Ya eres cliente?" navegar="/login" />
                </div>
            </div>
        </div>
    )
}

export default Jumbotron